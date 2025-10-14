"use client";

import { forwardRef, useMemo } from "react";
import { useGLTF } from "@react-three/drei";
import type { Group } from "three";

type MascotProps = {
  initialPosition?: [number, number, number];
  initialScale?: number | [number, number, number];
};

/**
 * 3D-талисман, загружаемый из GLB-модели. Возвращает ref на корневую группу сцены,
 * чтобы родитель мог анимировать объект (например, изменять вращение через useFrame).
 */
const Mascot = forwardRef<Group, MascotProps>(
  ({ initialPosition = [0, 0, 0], initialScale = 1 }, ref) => {
    const { scene } = useGLTF("/model.glb");
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

Mascot.displayName = "Mascot";

useGLTF.preload("/model.glb");

export default Mascot;