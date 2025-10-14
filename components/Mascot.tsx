"use client";

import { forwardRef, useMemo, Suspense } from "react";
// Добавляем Html для отображения текста ошибки прямо в 3D-сцене
// ВАЖНО: 'Html' необходимо импортировать из '@react-three/drei'
import { useGLTF, Html } from "@react-three/drei";
import type { Group } from "three";

type MascotProps = {
  initialPosition?: [number, number, number];
  initialScale?: number | [number, number, number];
};

/**
 * Внутренний компонент для загрузки и отображения 3D-модели.
 * Хуки useGLTF и useMemo вызываются безусловно на верхнем уровне.
 */
const MascotContent = forwardRef<Group, MascotProps>(
  ({ initialPosition = [0, 0, 0], initialScale = 1 }, ref) => {
    // 🛑 ИСПРАВЛЕНО: Хуки теперь вызываются БЕЗУСЛОВНО на верхнем уровне.
    const { scene } = useGLTF("/model.glb"); 
    const mascotScene = useMemo(() => scene.clone(), [scene]);

    // Вместо try/catch используем Suspense, который ловит ошибки загрузки useGLTF.
    // Если useGLTF не сможет загрузить модель, ошибку поймает <Canvas> или <Suspense>.
    
    // Если модель загрузилась, отображаем ее.
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

// Обертывающий компонент, который использует Suspense для обработки загрузки
const Mascot = forwardRef<Group, MascotProps>((props, ref) => (
  // 🛑 ИСПРАВЛЕНО: Мы полагаемся на <Suspense> в page.tsx для обработки загрузки
  // и только на fallback в <MascotCanvas> для отображения UI
  <MascotContent ref={ref} {...props} />
));

Mascot.displayName = "Mascot";

export default Mascot;
```eof

---

## 2. Фикс: `page.tsx` (Обработка ошибок и загрузки)

Поскольку мы удалили `try/catch` из `Mascot.tsx`, нам нужно убедиться, что **обработчик ошибок** теперь находится в `page.tsx` вокруг `<MascotCanvas>`. Также нам нужно убедиться, что `Suspense` корректно обрабатывает загрузку.

Ваш `page.tsx` уже использовал `<Suspense>`, но я внесу корректировки в **`MascotCanvas`** для лучшей обработки ошибок, используя стандартный Next.js механизм Error Boundary или просто полагаясь на уже существующий `Suspense` и его `fallback`.

Мы должны удалить внутренний `<Suspense>` из `MascotCanvas`, так как он был там ранее, и оставить только внешний, который использует `RotatingMascot`.

```typescript:Главная страница Landing Page:page.tsx (обновленный MascotCanvas)
// ... (imports remain the same)

// ... (RotatingMascot component remains the same)

/**
 * Обертка для R3F Canvas и 3D-талисмана.
 */
function MascotCanvas() {
  // Хук для расчета вращения на основе прокрутки
  const rotationY = useScrollRotation({ maxScroll: 1400, maxRotationDeg: 15 });

  return (
    // 🛑 Canvas должен быть вне Suspense, чтобы загружаться немедленно.
    <Canvas
      className="mascot-canvas"
      camera={{ position: [1.2, 1.25, 4.4], fov: 42 }}
      shadows={false}
    >
      <ambientLight intensity={0.85} />
      <directionalLight position={[4, 5, 3]} intensity={1.15} />
      {/* 🛑 Suspense должен оборачивать ТОЛЬКО асинхронные компоненты (Mascot) */}
      <Suspense 
        fallback={
          <Html center>
            <div className="p-4 bg-gray-800/80 backdrop-blur-sm rounded-lg text-white">
              Загрузка 3D-модели...
            </div>
          </Html>
        }
      >
        <RotatingMascot rotationY={rotationY} />
      </Suspense>
    </Canvas>
  );
}

// ... (rest of the Home component remains the same)
```eof

### 🚀 Следующий шаг

Замените код в **`components/Mascot.tsx`** на предложенный выше, чтобы исправить ошибки, связанные с хуками. Если вы используете React 18+, **`Suspense`** и **Error Boundary** в Next.js App Router (или соответствующий механизм в Page Router) автоматически отловят ошибку загрузки модели, и вы увидите сообщение "Загрузка 3D-модели...".

После этого, пожалуйста, попробуйте скомпилировать снова.