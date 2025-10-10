"use client";

import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import { useReducedMotion } from "framer-motion";
import * as THREE from "three";

import { useMediaQuery } from "@/utils/useMediaQuery";

interface ParticleFieldProps {
  count?: number;
}

function ParticleField({ count = 600 }: ParticleFieldProps) {
  const positions = useMemo(() => {
    const positionArray = new Float32Array(count * 3);
    for (let i = 0; i < count; i += 1) {
      const index = i * 3;
      positionArray[index] = (Math.random() - 0.5) * 20;
      positionArray[index + 1] = (Math.random() - 0.5) * 20;
      positionArray[index + 2] = (Math.random() - 0.5) * 20;
    }
    return positionArray;
  }, [count]);

  const ref = useRef<THREE.Points>(null);

  useFrame((state) => {
    if (!ref.current) {
      return;
    }
    ref.current.rotation.y += 0.0008;
    ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.12;
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled>
      <PointMaterial
        transparent
        color="#38bdf8"
        size={0.08}
        sizeAttenuation
        depthWrite={false}
        opacity={0.5}
      />
    </Points>
  );
}

export function ThreeBackground() {
  const prefersReducedMotion = useReducedMotion();
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const coarsePointer = window.matchMedia("(pointer: coarse)");
    const shouldEnable = !prefersReducedMotion && !isMobile && !coarsePointer.matches;
    setEnabled(shouldEnable);

    const handleChange = () => {
      setEnabled(!prefersReducedMotion && !isMobile && !coarsePointer.matches);
    };

    if (typeof coarsePointer.addEventListener === "function") {
      coarsePointer.addEventListener("change", handleChange);
      return () => {
        coarsePointer.removeEventListener("change", handleChange);
      };
    }

    coarsePointer.addListener(handleChange);
    return () => {
      coarsePointer.removeListener(handleChange);
    };
  }, [isMobile, prefersReducedMotion]);

  if (!enabled) {
    return null;
  }

  return (
    <div className="pointer-events-none absolute inset-0 -z-10 opacity-80">
      <Canvas
        camera={{ position: [0, 0, 14], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{
          antialias: false,
          alpha: true,
          powerPreference: "low-power",
        }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.4} />
          <pointLight position={[6, 4, 8]} intensity={1.4} color="#0ea5e9" />
          <ParticleField count={isMobile ? 320 : 600} />
        </Suspense>
      </Canvas>
    </div>
  );
}