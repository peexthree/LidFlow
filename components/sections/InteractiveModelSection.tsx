"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import { clsx } from "clsx";
import * as THREE from "three";

// ------------------------------------------------------------------------
// 1. Компонент 3D-модели и логика анимации
// ------------------------------------------------------------------------

interface ModelProps {
  scrollSpeed: number;
}

const MascotModel: React.FC<ModelProps> = ({ scrollSpeed }) => {
  const { scene } = useGLTF("/model.glb");
  const modelRef = useRef<THREE.Group | null>(null);

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const x = (event.clientX / window.innerWidth) * 2 - 1;
      const y = -(event.clientY / window.innerHeight) * 2 + 1;
      setMousePosition({ x, y });
    };

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
      const maxScroll = Math.max(scrollHeight - clientHeight, 1);
      setScrollProgress(scrollTop / maxScroll);
    };

    handleScroll();

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useFrame(() => {
    if (!modelRef.current) {
      return;
    }

    const targetY = scrollProgress * scrollSpeed;
    modelRef.current.position.y = THREE.MathUtils.lerp(
      modelRef.current.position.y,
      targetY,
      0.075
    );

    const targetRotationX = -mousePosition.y * 0.18;
    const targetRotationY = -mousePosition.x * 0.18;

    modelRef.current.rotation.x = THREE.MathUtils.lerp(
      modelRef.current.rotation.x,
      targetRotationX,
      0.06
    );
    modelRef.current.rotation.y = THREE.MathUtils.lerp(
      modelRef.current.rotation.y,
      targetRotationY,
      0.06
    );
  });

  return <primitive object={scene.clone()} ref={modelRef} scale={1.1} />;
};

// ------------------------------------------------------------------------
// 2. Обертка с Canvas и Светом
// ------------------------------------------------------------------------

interface InteractiveModelSectionProps {
  className?: string;
}

// Контейнер, который будет использоваться в Hero-секции
export const InteractiveModelSection: React.FC<InteractiveModelSectionProps> = ({ className }) => {
  const CAMERA_FOV = 48;
  const SCROLL_SPEED = 18;

  return (
    <section
      id="technology"
      className={clsx(
        "container relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 px-6 py-12 shadow-[0_40px_120px_rgba(14,116,144,0.45)] backdrop-blur-2xl",
        "before:pointer-events-none before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_top,_rgba(34,211,238,0.28),_transparent_60%)] before:opacity-90",
        className
      )}
      aria-labelledby="interactive-model-heading"
    >
      <div className="relative z-10 mx-auto flex flex-col items-center gap-8">
        <div className="space-y-3 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-1 text-xs uppercase tracking-[0.28em] text-white/70">
            3D-предпросмотр
          </span>
          <h2 id="interactive-model-heading" className="text-3xl font-semibold text-white md:text-4xl">
            Маскот реагирует на движение и скролл
          </h2>
          <p className="max-w-2xl text-balance text-base text-slate-300 md:text-lg">
            Наведите курсор или прокрутите страницу — мы подключили лёгкую WebGL-сцену на <strong>React Three Fiber</strong>, чтобы показать живую динамику будущего интерфейса.
          </p>
        </div>
        <div className="relative w-full max-w-4xl">
          <div className="pointer-events-none absolute inset-0 rounded-[2.5rem] border border-cyan-400/40 bg-gradient-to-br from-cyan-400/30 via-transparent to-fuchsia-500/20 blur-[90px]" />
          <div className="relative overflow-hidden rounded-[2.5rem] border border-white/15 bg-slate-950/60 p-2 backdrop-blur-xl">
            <Canvas className="h-[420px] w-full" camera={{ fov: CAMERA_FOV, position: [0, 0, 5] }}>
              <ambientLight intensity={1.2} />
              <directionalLight position={[4, 6, 6]} intensity={1.6} castShadow />
              <Suspense fallback={null}>
                <MascotModel scrollSpeed={SCROLL_SPEED} />
              </Suspense>
            </Canvas>
          </div>
        </div>
      </div>
    </section>
  );
};

useGLTF.preload("/model.glb");

// ------------------------------------------------------------------------
// 3. ПРИМЕЧАНИЕ ПО CSS
// ------------------------------------------------------------------------

/*
Для стилизации в вашем .module.css:

.heroSection {
  position: relative; // ЭТО ВАЖНО, чтобы InteractiveModelSection позиционировался абсолютно
  // ...
}

// Для контейнера в InteractiveModelSection.tsx
// При использовании Tailwind/CSS Modules достаточно повторить композицию классов
// из контейнера <section>, чтобы обеспечить фон и скругления.
*/