"use client";

import { forwardRef, useMemo, Suspense } from "react";
// Добавляем Html для отображения текста ошибки прямо в 3D-сцене
import { useGLTF, Html } from "@react-three/drei";
import type { Group } from "three";

type MascotProps = {
  initialPosition?: [number, number, number];
  initialScale?: number | [number, number, number];
};

/**
 * 3D-талисман, загружаемый из GLB-модели. Возвращает ref на корневую группу сцены,
 * чтобы родитель мог анимировать объект (например, изменять вращение через useFrame).
 *
 * Модель должна лежать в папке /public/model.glb
 */
const MascotContent = forwardRef<Group, MascotProps>(
  ({ initialPosition = [0, 0, 0], initialScale = 1 }, ref) => {
    try {
      // ПРОВЕРЬТЕ: model.glb ДОЛЖЕН лежать в папке public/
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
    } catch (error) {
      // Выводим ошибку, если загрузка модели не удалась
      console.error("Ошибка загрузки 3D-модели (model.glb):", error);
      return (
        <Html center>
          <div className="p-4 bg-red-600/80 backdrop-blur-sm rounded-lg text-white font-bold max-w-xs text-center">
            Ошибка! Модель 3D не найдена или не загружена. <br />
            Проверьте, что файл 'model.glb' находится в папке 'public/'.
          </div>
        </Html>
      );
    }
  },
);

MascotContent.displayName = "MascotContent";

// Preload модели для лучшей производительности
useGLTF.preload("/model.glb");

// Оборачиваем компонент в Suspense для корректной асинхронной загрузки
const Mascot = forwardRef<Group, MascotProps>((props, ref) => (
  <Suspense
    fallback={
      <Html center>
        <div className="p-4 bg-gray-800/80 backdrop-blur-sm rounded-lg text-white">
          Загрузка 3D-модели...
        </div>
      </Html>
    }
  >
    <MascotContent ref={ref} {...props} />
  </Suspense>
));

Mascot.displayName = "Mascot";

export default Mascot;