"use client";

import { useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, OrbitControls, useScroll } from "@react-three/drei";
import * as THREE from "three";

// ------------------------------------------------------------------------
// 1. Компонент 3D-модели и логика анимации
// ------------------------------------------------------------------------

interface ModelProps {
  scrollSpeed: number;
}

const MascotModel: React.FC<ModelProps> = ({ scrollSpeed }) => {
  // Загружаем модель из папки public. Путь должен быть относительно корня public/.
  // 'model.glb' – это путь public/model.glb
  const { scene } = useGLTF("/model.glb"); 
  const modelRef = useRef<THREE.Group>(null!);
  
  // Хук для отслеживания скролла
  const scroll = useScroll();
  
  // Состояние для отслеживания положения курсора (для вращения)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Эффект для обновления положения мыши
  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      // Нормализуем координаты от -1 до 1
      const x = (event.clientX / window.innerWidth) * 2 - 1;
      const y = -(event.clientY / window.innerHeight) * 2 + 1;
      setMousePosition({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Хук, вызываемый перед каждым кадром рендеринга
  useFrame((state, delta) => {
    // 1. Плавное Вертикальное Смещение (Параллакс Скролла)
    
    // scroll.offset - это значение от 0 до 1, показывающее, насколько прокручена страница
    const offset = scroll.offset; 
    
    // Смещаем модель по оси Y. Умножение на большой коэффициент (20)
    // создает контрастное движение относительно самой прокрутки.
    const scrollYPosition = offset * scrollSpeed;
    
    // Используем LERP (Linear Interpolation) для плавного перехода
    modelRef.current.position.y = THREE.MathUtils.lerp(
      modelRef.current.position.y,
      scrollYPosition,
      0.05 // Коэффициент плавности. Чем меньше, тем плавнее.
    );


    // 2. Вращение от Мыши (Объемный эффект)
    
    // Рассчитываем целевое вращение, слегка поворачивая модель
    // в зависимости от положения мыши (mousePosition.y, mousePosition.x).
    const targetRotationX = -mousePosition.y * 0.15; // Небольшой поворот по X
    const targetRotationY = -mousePosition.x * 0.15; // Небольшой поворот по Y
    
    // Снова используем LERP для плавного вращения
    modelRef.current.rotation.x = THREE.MathUtils.lerp(
      modelRef.current.rotation.x,
      targetRotationX,
      0.05
    );
    modelRef.current.rotation.y = THREE.MathUtils.lerp(
      modelRef.current.rotation.y,
      targetRotationY,
      0.05
    );
  });

  // Клонируем сцену, чтобы избежать проблем с рендерингом
  return <primitive object={scene.clone()} ref={modelRef} scale={1} />;
};

// ------------------------------------------------------------------------
// 2. Обертка с Canvas и Светом
// ------------------------------------------------------------------------

interface InteractiveModelSectionProps {
  className?: string;
}

// Контейнер, который будет использоваться в Hero-секции
export const InteractiveModelSection: React.FC<InteractiveModelSectionProps> = ({ className }) => {
  // Параметры для настройки
  const CAMERA_FOV = 50; // Угол обзора камеры
  const SCROLL_SPEED = 20; // Чем больше, тем сильнее смещается модель при скролле (Параллакс)
  
  return (
    <div className={className} style={{ position: 'absolute', top: 0, right: 0, width: '40%', height: '100%', pointerEvents: 'auto' }}>
      <Canvas 
        camera={{ fov: CAMERA_FOV, position: [0, 0, 5] }} 
        // Если фон Canvas должен быть прозрачным
        // style={{ background: 'transparent' }} 
      >
        {/* Освещение */}
        <ambientLight intensity={1.5} />
        <spotLight 
            position={[10, 10, 10]} 
            angle={0.3} 
            penumbra={1} 
            intensity={100} 
            castShadow 
        />
        
        {/* Модель с логикой параллакса */}
        <MascotModel scrollSpeed={SCROLL_SPEED} />
        
        {/* Вспомогательный элемент для отладки: позволяет вращать модель мышью (можно удалить) */}
        {/* <OrbitControls enableDamping={true} dampingFactor={0.05} /> */}
      </Canvas>
    </div>
  );
};

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
// Если вы используете Tailwind/CSS Modules, вы должны задать классы, 
// обеспечивающие абсолютное позиционирование справа, как в инлайновых стилях выше.
*/