"use client";

import Image from "next/image";
import Link from "next/link";
import { clsx } from "clsx";
import { Suspense, useRef } from "react";

import { Canvas, useFrame } from "@react-three/fiber";
import type { Group } from "three";

import Mascot from "@/components/Mascot";
import { ContactForm } from "@/components/ContactForm";
import { useScrollRotation } from "@/components/useScrollRotation";
import { Hero, type HeroHighlight } from "@/components/sections/Hero";
import { InteractiveModelSection } from "@/components/sections/InteractiveModelSection";
import { PortfolioShowcase, type ProjectShowcaseItem } from "@/components/sections/PortfolioShowcase";

import { Button } from "@/components/ui/button";
import { Html } from "@react-three/drei";


// --- ОПРЕДЕЛЕНИЯ ВСЕХ КОНСТАНТ ---
const heroHighlights: ReadonlyArray<HeroHighlight> = [
  {
    title: "Современные технологии",
    description:
      "Адаптивный Next.js 15, оптимизация Core Web Vitals и мгновенные обновления.",
  },
  {
    title: "Высокая конверсия",
    description:
      "Структура блоков проверена на реальных кейсах и усилена A/B-паттернами.",
  },
  {
    title: "Быстрый запуск",
    description:
      "Настраиваем домен, деплой на Vercel и подключаем аналитику за 1 день.",
  },
];

const projects: ReadonlyArray<ProjectShowcaseItem> = [
  {
    title: "LidFlow App",
    description: "Многостраничный корпоративный сайт с анимацией на базе React.",
    tags: ["React", "Next.js", "Three.js", "Tailwind"],
    imageSrc: "/images/project-1.jpg", // Замените на реальное изображение
    link: "#",
  },
  {
    title: "CRM Dashboard",
    description: "Интерактивная дашборд-панель для финансового мониторинга.",
    tags: ["Next.js", "Zustand", "Recharts", "Tailwind"],
    imageSrc: "/images/project-2.jpg", // Замените на реальное изображение
    link: "#",
  },
  {
    title: "E-commerce Redesign",
    description: "Полный редизайн интернет-магазина с фокусом на мобильные устройства.",
    tags: ["Vue", "Nuxt.js", "TypeScript", "Tailwind"],
    imageSrc: "/images/project-3.jpg", // Замените на реальное изображение
    link: "#",
  },
];


/**
 * Компонент, который принимает угол вращения и применяет его в каждом кадре R3F.
 */
function RotatingMascot({ rotationY }: { rotationY: number }) {
  const mascotRef = useRef<Group>(null);

  useFrame(() => {
    if (mascotRef.current) {
      // Применяем вращение, рассчитанное на основе скролла
      mascotRef.current.rotation.y = rotationY;
      
      // Добавляем небольшое автоматическое вращение для живости
      mascotRef.current.rotation.x = Math.sin(Date.now() * 0.0001) * 0.1; 
    }
  });

  // Передаем ref в Mascot для доступа к объекту в useFrame
  return (
    <Mascot
      ref={mascotRef}
      initialPosition={[0, -0.6, 0]} // Слегка опускаем модель
      initialScale={1.3} // Увеличиваем размер
    />
  );
}


/**
 * Обертка для R3F Canvas и 3D-талисмана.
 */
function MascotCanvas() {
  // Хук для расчета вращения на основе прокрутки
  const rotationY = useScrollRotation({ maxScroll: 1400, maxRotationDeg: 15 });

  return (
    <Canvas
      // 🛑 КРИТИЧНЫЕ СТИЛИ: фиксированное позиционирование и z-index=0 для фона
      className="fixed top-0 left-0 w-full h-full z-0 pointer-events-none"
      camera={{ position: [1.2, 1.25, 4.4], fov: 42 }}
      shadows={false}
    >
      {/* Освещение для сцены */}
      <ambientLight intensity={0.85} color="#c8e4ff" />
      <directionalLight position={[4, 5, 3]} intensity={1.15} color="#ffffff" />
      <directionalLight position={[-4, -2, -5]} intensity={0.5} color="#9090ff" />

      {/* Suspense обязателен для асинхронной загрузки useGLTF */}
      <Suspense 
        fallback={
          <Html center>
            <div className="p-4 bg-gray-800/80 backdrop-blur-sm rounded-lg text-white text-sm">
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


export default function Home() {
  return (
    <>
      {/* 3D-модель, закрепленная на фоне */}
      <MascotCanvas />
      
      {/* Основной контент страницы, который должен быть поверх Canvas */}
      <main className="relative z-10 pt-20">
        <Hero highlights={heroHighlights} />

        <PortfolioShowcase projects={projects} />

        <InteractiveModelSection />

        {/* Секция Контактов */}
        <section className="relative overflow-hidden pt-32 pb-32">
          <div className="container">
            <div className="mx-auto max-w-4xl rounded-[2.5rem] bg-[#050816] p-8 md:p-14 shadow-[0_50px_90px_-20px_rgba(20,126,255,0.4)] border border-primary/20">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1 text-xs uppercase tracking-[0.28em] text-white/60">
                Контакты
              </span>
              <h2 className="mt-4 text-3xl font-semibold text-white md:text-4xl">
                Заполните заявку — и обсудим проект
              </h2>
              <p className="mt-4 text-base text-slate-300 md:text-lg">
                Отвечаю в течение рабочего дня. Подготовлю структуру, бюджет и таймлайн, а также варианты апсейлов.
              </p>
              
              <ContactForm className="mt-8" />
              
              <div className="mt-12 space-y-2 text-sm text-slate-300 md:text-base">
                <p>
                  • Telegram:
                  <a
                    className="ml-1 inline-flex items-center gap-1 text-cyan-300 underline decoration-dotted underline-offset-4 transition hover:text-cyan-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#050816]"
                    href="[https://t.me/peexthree](https://t.me/peexthree)"
                    target="_blank"
                    rel="noreferrer"
                  >
                    @peexthree
                  </a>
                </p>
                <p>• Email: linderop@yandex.ru</p>
                <p>• Время ответа: до 1 часа в рабочие дни</p>
              </div>
            </div>
          </div>
        </section>

        {/* Футер */}
        <footer className="py-8 text-center text-sm text-muted-foreground">
          <p>
            © {new Date().getFullYear()} LidFlow. Все права защищены. 
            <Link href="#" className="ml-2 text-primary/80 hover:text-primary">Политика конфиденциальности</Link>
          </p>
        </footer>
      </main>
    </>
  );
}