"use client";

import { clsx } from "clsx";
import {
  useEffect,
  useRef,
  useState,
  type HTMLAttributes,
} from "react";

import styles from "./galaxy.module.css";

type WebGLContext = WebGLRenderingContext | WebGL2RenderingContext;

const DEFAULT_FOCAL = [0.5, 0.5] as const;
const DEFAULT_ROTATION = [1, 0] as const;

const vertexShaderSource = `
attribute vec2 uv;
attribute vec2 position;

varying vec2 vUv;

void main() {
  vUv = uv;
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

const fragmentShaderSource = `
precision highp float;

uniform float uTime;
uniform vec3 uResolution;
uniform vec2 uFocal;
uniform vec2 uRotation;
uniform float uStarSpeed;
uniform float uDensity;
uniform float uHueShift;
uniform float uSpeed;
uniform vec2 uMouse;
uniform float uGlowIntensity;
uniform float uSaturation;
uniform bool uMouseRepulsion;
uniform float uTwinkleIntensity;
uniform float uRotationSpeed;
uniform float uRepulsionStrength;
uniform float uMouseActiveFactor;
uniform float uAutoCenterRepulsion;
uniform bool uTransparent;

varying vec2 vUv;

#define NUM_LAYER 4.0
#define STAR_COLOR_CUTOFF 0.2
#define MAT45 mat2(0.7071, -0.7071, 0.7071, 0.7071)
#define PERIOD 3.0

float Hash21(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

float tri(float x) {
  return abs(fract(x) * 2.0 - 1.0);
}

float tris(float x) {
  float t = fract(x);
  return 1.0 - smoothstep(0.0, 1.0, abs(2.0 * t - 1.0));
}

float trisn(float x) {
  float t = fract(x);
  return 2.0 * (1.0 - smoothstep(0.0, 1.0, abs(2.0 * t - 1.0))) - 1.0;
}

vec3 hsv2rgb(vec3 c) {
  vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
  vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
  return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
}

float Star(vec2 uv, float flare) {
  float d = length(uv);
  float m = (0.05 * uGlowIntensity) / d;
  float rays = smoothstep(0.0, 1.0, 1.0 - abs(uv.x * uv.y * 1000.0));
  m += rays * flare * uGlowIntensity;
  uv *= MAT45;
  rays = smoothstep(0.0, 1.0, 1.0 - abs(uv.x * uv.y * 1000.0));
  m += rays * 0.3 * flare * uGlowIntensity;
  m *= smoothstep(1.0, 0.2, d);
  return m;
}

vec3 StarLayer(vec2 uv) {
  vec3 col = vec3(0.0);

  vec2 gv = fract(uv) - 0.5;
  vec2 id = floor(uv);

  for (int y = -1; y <= 1; y++) {
    for (int x = -1; x <= 1; x++) {
      vec2 offset = vec2(float(x), float(y));
      vec2 si = id + vec2(float(x), float(y));
      float seed = Hash21(si);
      float size = fract(seed * 345.32);
      float glossLocal = tri(uStarSpeed / (PERIOD * seed + 1.0));
      float flareSize = smoothstep(0.9, 1.0, size) * glossLocal;

      float red = smoothstep(STAR_COLOR_CUTOFF, 1.0, Hash21(si + 1.0)) + STAR_COLOR_CUTOFF;
      float blu = smoothstep(STAR_COLOR_CUTOFF, 1.0, Hash21(si + 3.0)) + STAR_COLOR_CUTOFF;
      float grn = min(red, blu) * seed;
      vec3 base = vec3(red, grn, blu);

      float hue = atan(base.g - base.r, base.b - base.r) / (2.0 * 3.14159) + 0.5;
      hue = fract(hue + uHueShift / 360.0);
      float sat = length(base - vec3(dot(base, vec3(0.299, 0.587, 0.114)))) * uSaturation;
      float val = max(max(base.r, base.g), base.b);
      base = hsv2rgb(vec3(hue, sat, val));

      vec2 pad = vec2(tris(seed * 34.0 + uTime * uSpeed / 10.0), tris(seed * 38.0 + uTime * uSpeed / 30.0)) - 0.5;

      float star = Star(gv - offset - pad, flareSize);
      vec3 color = base;

      float twinkle = trisn(uTime * uSpeed + seed * 6.2831) * 0.5 + 1.0;
      twinkle = mix(1.0, twinkle, uTwinkleIntensity);
      star *= twinkle;

      col += star * size * color;
    }
  }

  return col;
}

void main() {
  vec2 focalPx = uFocal * uResolution.xy;
  vec2 uv = (vUv * uResolution.xy - focalPx) / uResolution.y;

  vec2 mouseNorm = uMouse - vec2(0.5);

  if (uAutoCenterRepulsion > 0.0) {
    vec2 centerUV = vec2(0.0, 0.0);
    float centerDist = length(uv - centerUV);
    vec2 repulsion = normalize(uv - centerUV) * (uAutoCenterRepulsion / (centerDist + 0.1));
    uv += repulsion * 0.05;
  } else if (uMouseRepulsion) {
    vec2 mousePosUV = (uMouse * uResolution.xy - focalPx) / uResolution.y;
    float mouseDist = length(uv - mousePosUV);
    vec2 repulsion = normalize(uv - mousePosUV) * (uRepulsionStrength / (mouseDist + 0.1));
    uv += repulsion * 0.05 * uMouseActiveFactor;
  } else {
    vec2 mouseOffset = mouseNorm * 0.1 * uMouseActiveFactor;
    uv += mouseOffset;
  }

  float autoRotAngle = uTime * uRotationSpeed;
  mat2 autoRot = mat2(cos(autoRotAngle), -sin(autoRotAngle), sin(autoRotAngle), cos(autoRotAngle));
  uv = autoRot * uv;

  uv = mat2(uRotation.x, -uRotation.y, uRotation.y, uRotation.x) * uv;

  vec3 col = vec3(0.0);

  for (float i = 0.0; i < 1.0; i += 1.0 / NUM_LAYER) {
    float depth = fract(i + uStarSpeed * uSpeed);
    float scale = mix(20.0 * uDensity, 0.5 * uDensity, depth);
    float fade = depth * smoothstep(1.0, 0.9, depth);
    col += StarLayer(uv * scale + i * 453.32) * fade;
  }

  if (uTransparent) {
    float alpha = length(col);
    alpha = smoothstep(0.0, 0.3, alpha);
    alpha = min(alpha, 1.0);
    gl_FragColor = vec4(col, alpha);
  } else {
    gl_FragColor = vec4(col, 1.0);
  }
}
`;

export interface GalaxyProps extends HTMLAttributes<HTMLDivElement> {
  focal?: readonly [number, number];
  rotation?: readonly [number, number];
  starSpeed?: number;
  density?: number;
  hueShift?: number;
  disableAnimation?: boolean;
  speed?: number;
  mouseInteraction?: boolean;
  glowIntensity?: number;
  saturation?: number;
  mouseRepulsion?: boolean;
  twinkleIntensity?: number;
  rotationSpeed?: number;
  repulsionStrength?: number;
  autoCenterRepulsion?: number;
  transparent?: boolean;
}

interface ProgramUniformLocations {
  uTime: WebGLUniformLocation | null;
  uResolution: WebGLUniformLocation | null;
  uFocal: WebGLUniformLocation | null;
  uRotation: WebGLUniformLocation | null;
  uStarSpeed: WebGLUniformLocation | null;
  uDensity: WebGLUniformLocation | null;
  uHueShift: WebGLUniformLocation | null;
  uSpeed: WebGLUniformLocation | null;
  uMouse: WebGLUniformLocation | null;
  uGlowIntensity: WebGLUniformLocation | null;
  uSaturation: WebGLUniformLocation | null;
  uMouseRepulsion: WebGLUniformLocation | null;
  uTwinkleIntensity: WebGLUniformLocation | null;
  uRotationSpeed: WebGLUniformLocation | null;
  uRepulsionStrength: WebGLUniformLocation | null;
  uMouseActiveFactor: WebGLUniformLocation | null;
  uAutoCenterRepulsion: WebGLUniformLocation | null;
  uTransparent: WebGLUniformLocation | null;
}

function createShader(gl: WebGLContext, type: number, source: string) {
  const shader = gl.createShader(type);
  if (!shader) {
    return null;
  }

  gl.shaderSource(shader, source);
  gl.compileShader(shader);

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error("Galaxy shader compile error:", gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }

  return shader;
}

function createProgram(gl: WebGLContext, vertex: string, fragment: string) {
  const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertex);
  const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragment);

  if (!vertexShader || !fragmentShader) {
    return null;
  }

  const program = gl.createProgram();
  if (!program) {
    return null;
  }

  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.error("Galaxy program link error:", gl.getProgramInfoLog(program));
    gl.deleteProgram(program);
    gl.deleteShader(vertexShader);
    gl.deleteShader(fragmentShader);
    return null;
  }

  gl.deleteShader(vertexShader);
  gl.deleteShader(fragmentShader);

  return program;
}

export default function Galaxy({
  focal = DEFAULT_FOCAL,
  rotation = DEFAULT_ROTATION,
  starSpeed = 0.5,
  density = 1,
  hueShift = 140,
  disableAnimation = false,
  speed = 1.0,
  mouseInteraction = true,
  glowIntensity = 0.3,
  saturation = 0.0,
  mouseRepulsion = true,
  repulsionStrength = 2,
  twinkleIntensity = 0.3,
  rotationSpeed = 0.1,
  autoCenterRepulsion = 0,
  transparent = true,
  className,
  ...rest
}: GalaxyProps) {
  const [focalX, focalY] = focal;
  const [rotationX, rotationY] = rotation;
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const targetMousePos = useRef({ x: 0.5, y: 0.5 });
  const smoothMousePos = useRef({ x: 0.5, y: 0.5 });
  const targetMouseActive = useRef(0);
  const smoothMouseActive = useRef(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") {
      return undefined;
    }

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setPrefersReducedMotion(mediaQuery.matches);
    updatePreference();

    mediaQuery.addEventListener("change", updatePreference);

    return () => {
      mediaQuery.removeEventListener("change", updatePreference);
    };
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) {
      return;
    }

    targetMousePos.current = { x: 0.5, y: 0.5 };
    smoothMousePos.current = { x: 0.5, y: 0.5 };
    targetMouseActive.current = 0;
    smoothMouseActive.current = 0;

    const contextOptions: WebGLContextAttributes = {
      alpha: transparent,
      premultipliedAlpha: false,
      antialias: true,
    };

    const gl =
      (canvas.getContext("webgl2", contextOptions) as WebGLContext | null) ??
      (canvas.getContext("webgl", contextOptions) as WebGLContext | null) ??
      (canvas.getContext("experimental-webgl", contextOptions) as WebGLContext | null);

    if (!gl) {
      console.error("Galaxy: WebGL context is not available in this environment.");
      return;
    }

    if (transparent) {
      gl.enable(gl.BLEND);
      gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
      gl.clearColor(0, 0, 0, 0);
    } else {
      gl.disable(gl.BLEND);
      gl.clearColor(0, 0, 0, 1);
    }

    const program = createProgram(gl, vertexShaderSource, fragmentShaderSource);
    if (!program) {
      return;
    }

    gl.useProgram(program);

    const vertices = new Float32Array([
      -1, -1, 0, 0,
      3, -1, 2, 0,
      -1, 3, 0, 2,
    ]);

    const buffer = gl.createBuffer();
    if (!buffer) {
      gl.deleteProgram(program);
      return;
    }

    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    const stride = 4 * Float32Array.BYTES_PER_ELEMENT;

    const positionLocation = gl.getAttribLocation(program, "position");
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, stride, 0);

    const uvLocation = gl.getAttribLocation(program, "uv");
    gl.enableVertexAttribArray(uvLocation);
    gl.vertexAttribPointer(
      uvLocation,
      2,
      gl.FLOAT,
      false,
      stride,
      2 * Float32Array.BYTES_PER_ELEMENT,
    );

    const uniforms: ProgramUniformLocations = {
      uTime: gl.getUniformLocation(program, "uTime"),
      uResolution: gl.getUniformLocation(program, "uResolution"),
      uFocal: gl.getUniformLocation(program, "uFocal"),
      uRotation: gl.getUniformLocation(program, "uRotation"),
      uStarSpeed: gl.getUniformLocation(program, "uStarSpeed"),
      uDensity: gl.getUniformLocation(program, "uDensity"),
      uHueShift: gl.getUniformLocation(program, "uHueShift"),
      uSpeed: gl.getUniformLocation(program, "uSpeed"),
      uMouse: gl.getUniformLocation(program, "uMouse"),
      uGlowIntensity: gl.getUniformLocation(program, "uGlowIntensity"),
      uSaturation: gl.getUniformLocation(program, "uSaturation"),
      uMouseRepulsion: gl.getUniformLocation(program, "uMouseRepulsion"),
      uTwinkleIntensity: gl.getUniformLocation(program, "uTwinkleIntensity"),
      uRotationSpeed: gl.getUniformLocation(program, "uRotationSpeed"),
      uRepulsionStrength: gl.getUniformLocation(program, "uRepulsionStrength"),
      uMouseActiveFactor: gl.getUniformLocation(program, "uMouseActiveFactor"),
      uAutoCenterRepulsion: gl.getUniformLocation(program, "uAutoCenterRepulsion"),
      uTransparent: gl.getUniformLocation(program, "uTransparent"),
    };

    const setStaticUniforms = () => {
      if (uniforms.uFocal) {
        gl.uniform2f(uniforms.uFocal, focalX, focalY);
      }
      if (uniforms.uRotation) {
        gl.uniform2f(uniforms.uRotation, rotationX, rotationY);
      }
      if (uniforms.uDensity) {
        gl.uniform1f(uniforms.uDensity, density);
      }
      if (uniforms.uHueShift) {
        gl.uniform1f(uniforms.uHueShift, hueShift);
      }
      if (uniforms.uSpeed) {
        gl.uniform1f(uniforms.uSpeed, speed);
      }
      if (uniforms.uGlowIntensity) {
        gl.uniform1f(uniforms.uGlowIntensity, glowIntensity);
      }
      if (uniforms.uSaturation) {
        gl.uniform1f(uniforms.uSaturation, saturation);
      }
      if (uniforms.uMouseRepulsion) {
        gl.uniform1i(uniforms.uMouseRepulsion, mouseRepulsion ? 1 : 0);
      }
      if (uniforms.uTwinkleIntensity) {
        gl.uniform1f(uniforms.uTwinkleIntensity, twinkleIntensity);
      }
      if (uniforms.uRotationSpeed) {
        gl.uniform1f(uniforms.uRotationSpeed, rotationSpeed);
      }
      if (uniforms.uRepulsionStrength) {
        gl.uniform1f(uniforms.uRepulsionStrength, repulsionStrength);
      }
      if (uniforms.uAutoCenterRepulsion) {
        gl.uniform1f(uniforms.uAutoCenterRepulsion, autoCenterRepulsion);
      }
      if (uniforms.uTransparent) {
        gl.uniform1i(uniforms.uTransparent, transparent ? 1 : 0);
      }
    };

    setStaticUniforms();

    const resize = () => {
      const width = container.clientWidth;
      const height = container.clientHeight;
      const dpr = window.devicePixelRatio || 1;
      const displayWidth = Math.max(Math.floor(width * dpr), 1);
      const displayHeight = Math.max(Math.floor(height * dpr), 1);

      if (canvas.width !== displayWidth || canvas.height !== displayHeight) {
        canvas.width = displayWidth;
        canvas.height = displayHeight;
        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;
      }

      gl.viewport(0, 0, canvas.width, canvas.height);
      if (uniforms.uResolution) {
        gl.uniform3f(
          uniforms.uResolution,
          canvas.width,
          canvas.height,
          canvas.width / Math.max(canvas.height, 1),
        );
      }
    };

    resize();

    let resizeCleanup: (() => void) | undefined;
    if (typeof ResizeObserver !== "undefined") {
      const resizeObserver = new ResizeObserver(resize);
      resizeObserver.observe(container);
      resizeCleanup = () => resizeObserver.disconnect();
    } else {
      window.addEventListener("resize", resize);
      resizeCleanup = () => window.removeEventListener("resize", resize);
    }

    let animationFrame = 0;
    const shouldDisableAnimation = disableAnimation || prefersReducedMotion;

    const render = (time: number) => {
      animationFrame = requestAnimationFrame(render);

      const elapsed = time * 0.001;
      const timeValue = shouldDisableAnimation ? 0 : elapsed;
      const starSpeedValue = shouldDisableAnimation ? 0 : (elapsed * starSpeed) / 10;

      const lerpFactor = 0.05;
      smoothMousePos.current.x += (targetMousePos.current.x - smoothMousePos.current.x) * lerpFactor;
      smoothMousePos.current.y += (targetMousePos.current.y - smoothMousePos.current.y) * lerpFactor;
      smoothMouseActive.current +=
        (targetMouseActive.current - smoothMouseActive.current) * lerpFactor;

      gl.useProgram(program);

      if (uniforms.uTime) {
        gl.uniform1f(uniforms.uTime, timeValue);
      }
      if (uniforms.uStarSpeed) {
        gl.uniform1f(uniforms.uStarSpeed, starSpeedValue);
      }
      if (uniforms.uMouse) {
        gl.uniform2f(uniforms.uMouse, smoothMousePos.current.x, smoothMousePos.current.y);
      }
      if (uniforms.uMouseActiveFactor) {
        gl.uniform1f(uniforms.uMouseActiveFactor, smoothMouseActive.current);
      }

      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };

    animationFrame = requestAnimationFrame(render);

    const handleMouseMove = (event: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width;
      const y = 1 - (event.clientY - rect.top) / rect.height;
      targetMousePos.current = { x, y };
      targetMouseActive.current = 1;
    };

    const handleMouseLeave = () => {
      targetMouseActive.current = 0;
    };

    if (mouseInteraction) {
      canvas.addEventListener("mousemove", handleMouseMove);
      canvas.addEventListener("mouseleave", handleMouseLeave);
    }

    return () => {
      cancelAnimationFrame(animationFrame);
      resizeCleanup?.();
      if (mouseInteraction) {
        canvas.removeEventListener("mousemove", handleMouseMove);
        canvas.removeEventListener("mouseleave", handleMouseLeave);
      }
      const loseContext = gl.getExtension("WEBGL_lose_context") as
        | { loseContext: () => void }
        | null;
      loseContext?.loseContext();
      gl.bindBuffer(gl.ARRAY_BUFFER, null);
      gl.deleteBuffer(buffer);
      gl.useProgram(null);
      gl.deleteProgram(program);
    };
  }, [
    autoCenterRepulsion,
    density,
    disableAnimation,
    focalX,
    focalY,
    glowIntensity,
    hueShift,
    mouseInteraction,
    mouseRepulsion,
    prefersReducedMotion,
    repulsionStrength,
    rotationX,
    rotationY,
    rotationSpeed,
    saturation,
    speed,
    starSpeed,
    transparent,
    twinkleIntensity,
  ]);

  return (
    <div
      ref={containerRef}
      className={clsx(styles.container, "relative h-full w-full", className)}
      {...rest}
    >
      <canvas ref={canvasRef} className="h-full w-full" />
    </div>
  );
}