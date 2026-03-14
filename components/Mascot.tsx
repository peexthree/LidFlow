"use client";

import { forwardRef, useMemo } from "react";
import { useGLTF } from "@react-three/drei";

import type { Group } from "three";

type MascotProps = {
  initialPosition?: [number, number, number];
  initialScale?: number | [number, number, number];
};

/**
 * Внутренний компонент, который загружает 3D-модель.
 * Хуки useGLTF и useMemo вызываются безусловно на верхнем уровне.
 */
const MascotContent = forwardRef<Group, MascotProps>(
  ({ initialPosition = [0, 0, 0], initialScale = 1 }, ref) => {
    // 🛑 Хуки вызываются на верхнем уровне, чтобы соответствовать правилам React.
    // Файл 'model.glb' ДОЛЖЕН лежать в папке 'public/'.
    const { scene } = useGLTF("/model.glb");

    // Клонирование сцены предотвращает проблемы с реактивностью R3F
    const mascotScene = useMemo(() => scene.clone(), [scene]);

    return (
      <primitive
        ref={ref}
        object={mascotScene}
        position={initialPosition}
        scale={initialScale}
      />
    );
  },
);

MascotContent.displayName = "MascotContent";

// Preload модели для лучшей производительности
useGLTF.preload("/model.glb");

// Внешний компонент Mascot, который используется в page.tsx
const Mascot = forwardRef<Group, MascotProps>((props, ref) => (
  <MascotContent ref={ref} {...props} />
));

Mascot.displayName = "Mascot";

export default Mascot;
