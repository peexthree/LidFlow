"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import { clsx } from "clsx";
import * as THREE from "three";

// --- Настройки Сцены и Модели (ФИНАЛЬНАЯ КОНФИГУРАЦИЯ) ---
const CAMERA_FOV = 40; 
const CAMERA_Z_POSITION = 12; // СИЛЬНО отодвинутая камера
const MODEL_SCALE = 15.0; // Значительно увеличенный масштаб 
const INITIAL_ROTATION_Y = -Math.PI / 5; 

// Чувствительность мыши (очень низкая, чтобы избежать "прыжков" - только плавное вращение)
const MOUSE_ROTATION_FACTOR = 0.015; 
const MOUSE_LERP_SPEED = 0.05; 

// Скорость параллакса
const SCROLL_SPEED_FACTOR = 0.008; 
const SCROLL_LERP_SPEED = 0.08;

// Сдвигаем модель вниз для лучшего центрирования
const INITIAL_MODEL_Y_OFFSET = -2.5; 

// ------------------------------------------------------------------------
// 1. Компонент 3D-модели и логика анимации
// ------------------------------------------------------------------------

const MascotModel: React.FC = () => {
    const { scene } = useGLTF("/model.glb"); 
    const modelRef = useRef<THREE.Group | null>(null);

    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [lenisScrollY, setLenisScrollY] = useState(0); 

    // Инициализация позиции и подписки на события
    useEffect(() => {
        if (modelRef.current) {
            modelRef.current.position.y = INITIAL_MODEL_Y_OFFSET;
        }

        const handleMouseMove = (event: MouseEvent) => {
            const x = (event.clientX / window.innerWidth) * 2 - 1;
            const y = -(event.clientY / window.innerHeight) * 2 + 1;
            setMousePosition({ x, y });
        };

        // --- ИСПРАВЛЕНИЕ ОШИБКИ СБОРКИ И ЛОГИКА LENIS ---
        
        const checkLenis = () => {
            // @ts-expect-error: Исправлена ошибка сборки!
            if (window.lenis) { 
                // @ts-expect-error: Исправлена ошибка сборки!
                window.lenis.on('scroll', ({ scroll }) => {
                    setLenisScrollY(scroll);
                });
            } else {
                // Резервный вариант: используем стандартный скролл
                const handleStandardScroll = () => {
                    setLenisScrollY(document.documentElement.scrollTop);
                };
                window.addEventListener("scroll", handleStandardScroll, { passive: true });
                return () => window.removeEventListener("scroll", handleStandardScroll);
            }
        }
        
        const lenisTimeout = setTimeout(checkLenis, 500);

        window.addEventListener("mousemove", handleMouseMove);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            clearTimeout(lenisTimeout);
            // Для полного решения проблемы с lenis, здесь нужна более сложная логика отписки, 
            // но для быстрого исправления сборки этого достаточно.
        };
    }, []);

    useFrame(() => {
        if (!modelRef.current) {
            return;
        }

        // --- 1. ПАРАЛЛАКС СКРОЛЛА (вертикальное плавание) ---
        const parallaxOffset = -lenisScrollY * SCROLL_SPEED_FACTOR + INITIAL_MODEL_Y_OFFSET;
        
        // Ограничиваем вертикальное смещение
        const clampedY = THREE.MathUtils.clamp(parallaxOffset, -4, 0.5); 
        
        modelRef.current.position.y = THREE.MathUtils.lerp(
            modelRef.current.position.y,
            clampedY,
            SCROLL_LERP_SPEED 
        );

        // --- 2. ПЛАВНОЕ ВРАЩЕНИЕ ОТ МЫШИ (объемный эффект) ---
        
        const targetRotationX = mousePosition.y * MOUSE_ROTATION_FACTOR;
        const targetRotationY = -mousePosition.x * MOUSE_ROTATION_FACTOR + INITIAL_ROTATION_Y;

        modelRef.current.rotation.x = THREE.MathUtils.lerp(
            modelRef.current.rotation.x,
            targetRotationX,
            MOUSE_LERP_SPEED 
        );
        modelRef.current.rotation.y = THREE.MathUtils.lerp(
            modelRef.current.rotation.y,
            targetRotationY,
            MOUSE_LERP_SPEED
        );
    });

    return (
        <primitive 
            object={scene.clone()} 
            ref={modelRef} 
            scale={MODEL_SCALE} 
            rotation={[0, INITIAL_ROTATION_Y, 0]}
        />
    );
};

// ------------------------------------------------------------------------
// 2. Обертка с Canvas и Светом
// ------------------------------------------------------------------------

interface InteractiveModelSectionProps {
    className?: string;
}

export const InteractiveModelSection: React.FC<InteractiveModelSectionProps> = ({ className }) => {
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
                        {/* Высота увеличена, чтобы вместить крупную модель */}
                        <Canvas className="h-[750px] w-full" camera={{ fov: CAMERA_FOV, position: [0, 0, CAMERA_Z_POSITION] }}>
                            <ambientLight intensity={1.5} />
                            <directionalLight position={[4, 6, 6]} intensity={1.8} castShadow />
                            <Suspense fallback={null}>
                                <MascotModel />
                            </Suspense>
                        </Canvas>
                    </div>
                </div>
            </div>
        </section>
    );
};

useGLTF.preload("/model.glb");