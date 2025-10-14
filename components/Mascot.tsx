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
```eof

### 🚀 Что делать дальше

1.  **Замените `components/Mascot.tsx`** на код выше (он возвращает функциональность загрузки модели, устраняя ошибки ESLint/TypeScript).
2.  Запустите **компиляцию** еще раз.

Если компиляция пройдет успешно (а она должна), и вы снова не увидите модель, **не паникуйте!** Это означает, что проблема **не в коде**, а в runtime-ошибке загрузки модели.

В этом случае:

1.  **Откройте консоль браузера (F12).**
2.  Проверьте вкладку **Network (Сеть)**. Ищите запрос на файл **`model.glb`**.
    * Если статус **404 (Not Found)**: Файл лежит не в папке `public/`.
    * Если статус **200 (OK)**: Файл загружен, но **не отображается** (слишком маленький, находится вне поля зрения камеры или имеет ошибки при экспорте).

Сообщите мне, прошла ли компиляция и что показывает консоль, если модель не видна.