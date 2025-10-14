"use client";

import { forwardRef, useMemo } from "react";
// Для этого теста нам не нужен useGLTF
import { Html } from "@react-three/drei";
import type { Group } from "three";

type MascotProps = {
  initialPosition?: [number, number, number];
  initialScale?: number | [number, number, number];
};

/**
 * ВРЕМЕННАЯ ВЕРСИЯ: Отображает простую красную сферу для проверки,
 * работает ли Canvas, освещение и камера.
 */
const MascotContent = forwardRef<Group, MascotProps>(
  ({ initialPosition = [0, 0, 0], initialScale = 1 }, ref) => {
    const scale = Array.isArray(initialScale) ? initialScale : [initialScale, initialScale, initialScale];
    
    // Используем простую геометрию MeshStandardMaterial, который реагирует на свет
    return (
      <mesh 
        ref={ref as any} // Приводим тип, так как mesh ref не совсем Group, но для теста пойдет
        position={initialPosition} 
        scale={scale}
      >
        {/* Геометрия сферы с большим радиусом (1.2) */}
        <sphereGeometry args={[1.2, 32, 32]} /> 
        {/* Яркий материал, чтобы было хорошо видно */}
        <meshStandardMaterial color="#f87171" metalness={0.5} roughness={0.3} />
        {/* Сообщение прямо в 3D-сцене */}
        <Html center>
          <div className="text-white p-2 bg-red-600/70 rounded font-semibold text-xs">
            🛑 СФЕРА ВИДНА! (Тест Canvas пройден)
          </div>
        </Html>
      </mesh>
    );
  },
);

MascotContent.displayName = "MascotContent";

// Внешний компонент Mascot, который используется в page.tsx
const Mascot = forwardRef<Group, MascotProps>((props, ref) => (
  <MascotContent ref={ref} {...props} />
));

Mascot.displayName = "Mascot";

export default Mascot;
