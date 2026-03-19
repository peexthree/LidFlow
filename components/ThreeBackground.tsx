'use client';

import React, { useRef, useState, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { PerformanceMonitor, Preload } from '@react-three/drei';
import * as THREE from 'three';
import { EffectComposer, ChromaticAberration, Noise, Glitch } from '@react-three/postprocessing';
import { GlitchMode } from 'postprocessing';
import { useLenis } from 'lenis/react';

// Хук для частиц
function Particles({ count = 2000, scrollVelocity = 0 }) {
  const mesh = useRef<THREE.InstancedMesh>(null);
    const dummy = useMemo(() => new THREE.Object3D(), []);

  // Генерация позиций
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 20;
      const y = (Math.random() - 0.5) * 20;
      const z = (Math.random() - 0.5) * 10 - 5;
      const speed = 0.01 + Math.random() * 0.02;
      const factor = Math.random() * 100;
      const xFactor = Math.random() * 2 - 1;
      const yFactor = Math.random() * 2 - 1;
      const zFactor = Math.random() * 2 - 1;
      temp.push({ x, y, z, speed, factor, xFactor, yFactor, zFactor });
    }
    return temp;
  }, [count]);

  useFrame((state) => {
    if (!mesh.current) return;

    // Анимация частиц
    particles.forEach((particle, i) => {
      const { x, y, z, speed, factor, xFactor, yFactor, zFactor } = particle;

      // Применяем scroll velocity к движению частиц (киберпанк эффект ускорения)
      const currentSpeed = speed + (scrollVelocity * 0.005);

      const t = (factor + state.clock.elapsedTime) * currentSpeed;

      dummy.position.set(
        x + Math.cos((t / 10) * xFactor) + (Math.sin(t * 1) * xFactor) / 10,
        y + Math.sin((t / 10) * yFactor) + (Math.cos(t * 2) * yFactor) / 10,
        z + Math.cos((t / 10) * zFactor) + (Math.sin(t * 3) * zFactor) / 10
      );

      const s = Math.cos(t);
      dummy.scale.set(s, s, s);
      dummy.rotation.set(s * 5, s * 5, s * 5);
      dummy.updateMatrix();

      if (mesh.current) mesh.current.setMatrixAt(i, dummy.matrix);
    });
    if (mesh.current) mesh.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, count]}>
      <dodecahedronGeometry args={[0.02, 0]} />
      <meshBasicMaterial color="#66FCF1" transparent opacity={0.6} />
    </instancedMesh>
  );
}

// Компонент постобработки
function PostProcessingEffects({ scrollVelocity = 0 }) {
    // Чем быстрее скролл, тем сильнее искажения
    const intensity = Math.min(Math.abs(scrollVelocity) * 0.05, 1);

    return (
        <EffectComposer >
            <ChromaticAberration
                offset={new THREE.Vector2(0.002 * intensity, 0.002 * intensity)}
                radialModulation={false}
                modulationOffset={0}
            />
            <Noise opacity={0.03 + intensity * 0.1} />
            <Glitch active={intensity > 0.5}
                    delay={new THREE.Vector2(1.5, 3.5)} // min and max glitch delay
                    duration={new THREE.Vector2(0.6, 1.0)} // min and max glitch duration
                    strength={new THREE.Vector2(0.3, 1.0)} // min and max glitch strength
                    mode={GlitchMode.SPORADIC} // glitch mode
                    ratio={0.85}
                />
        </EffectComposer>
    );
}

// Главный компонент
export default function ThreeBackground() {
  const [dpr, setDpr] = useState(1);
  const [particleCount, setParticleCount] = useState(1500);
  const [scrollVelocity, setScrollVelocity] = useState(0);

  // Получаем velocity скролла
  useLenis(({ velocity }) => {
    setScrollVelocity(velocity);
  });

  return (
    <div className="fixed inset-0 z-[-1] pointer-events-none bg-[#020304]">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        dpr={dpr}
        gl={{ antialias: false, powerPreference: "high-performance", alpha: false }}
      >
        <PerformanceMonitor
          onIncline={() => {
              setDpr(2);
              setParticleCount(2500);
          }}
          onDecline={() => {
              setDpr(1);
              setParticleCount(500);
          }}
        >
            <color attach="background" args={['#020304']} />
            <fog attach="fog" args={['#020304', 3, 10]} />
            <Particles count={particleCount} scrollVelocity={scrollVelocity} />
            <PostProcessingEffects scrollVelocity={scrollVelocity} />
            <Preload all />
        </PerformanceMonitor>
      </Canvas>
    </div>
  );
}
