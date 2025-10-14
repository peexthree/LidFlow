"use client";

import { forwardRef, useMemo } from "react";
// 🛑 Импортируем useGLTF и Html (для Suspense fallback)
import { useGLTF, Html } from "@react-three/drei";
import type { Group } from "three";

type MascotProps = {
  initialPosition?: [number, number, number];
  initialScale?: number | [number, number, number];
};

/**
 * Рабочая версия, которая загружает модель.
 */
const MascotContent = forwardRef<Group, MascotProps>(
  ({ initialPosition = [0, 0, 0], initialScale = 1 }, ref) => {
    // 🛑 Хуки useGLTF и useMemo возвращены
    // Файл 'model.glb' должен лежать в папке 'public/'.
    const { scene } = useGLTF("/model.glb");
    
    // Клонирование сцены
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

// Preload модели
useGLTF.preload("/model.glb");

// Внешний компонент Mascot
const Mascot = forwardRef<Group, MascotProps>((props, ref) => (
  // 🛑 Компонент, использующий MascotContent, не должен быть обернут Suspense
  <MascotContent ref={ref} {...props} />
));

Mascot.displayName = "Mascot";

export default Mascot;

