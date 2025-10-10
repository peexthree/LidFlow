"use client";

import { motion } from "framer-motion";
import { clsx } from "clsx";

import { AnimatedSection } from "@/components/AnimatedSection";

const FEATURES = [
  {
    title: "Компонентный подход",
    description: "Каждый блок — отдельный модуль с настраиваемыми пропсами и анимационными пресетами.",
    badge: "01",
  },
  {
    title: "Реактивные параллаксы",
    description: "GSAP ScrollTrigger синхронизирует слои и иллюзии глубины без рывков и подтормаживаний.",
    badge: "02",
  },
  {
    title: "Контроль перфоманса",
    description: "Отключаем Three.js и heavy motion на мобильных и при prefers-reduced-motion автоматически.",
    badge: "03",
  },
  {
    title: "Семантика и доступность",
    description: "ARIA, фокус-состояния и контраст подобраны для продакшена и Lighthouse 90+.",
    badge: "04",
  },
  {
    title: "Tailwind дизайн-токены",
    description: "Вынесенные константы для цветов, теней и отступов — редактируйте палитру в одном месте.",
    badge: "05",
  },
  {
    title: "Интеграция аналитики",
    description: "Подключение событий, пикселей и серверных действий Next.js без ручного переписывания кода.",
    badge: "06",
  },
] as const;

export function Features() {
  return (
    <section id="features" className="container mx-auto max-w-6xl px-6 py-24">
      <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
        <div className="space-y-6">
          <AnimatedSection motion="fade-slide" direction="up" once>
            <span className="text-sm font-semibold uppercase tracking-[0.3em] text-brand-500">Технологии</span>
          </AnimatedSection>
          <AnimatedSection motion="fade-slide" direction="up" once>
            <h2 className="text-3xl font-semibold text-neutral-900 sm:text-4xl">
              Ключевые фичи и практики, которые включены из коробки
            </h2>
          </AnimatedSection>
          <AnimatedSection motion="fade" once className="max-w-xl text-base text-neutral-600 sm:text-lg">
            <p>
              Каждый компонент аккуратно обёрнут в AnimatedSection — меняйте направление и тип анимации через пропсы.
              Настройки вынесены в motionPresets.ts, поэтому вы управляете длительностью и easing централизованно.
            </p>
          </AnimatedSection>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          {FEATURES.map((feature, index) => (
            <AnimatedSection
              key={feature.title}
              motion="blur"
              direction="up"
              delay={index * 0.05}
              className="h-full"
            >
              <motion.article
                whileHover={{ rotateX: 6, rotateY: -6, translateY: -6 }}
                transition={{ type: "spring", stiffness: 120, damping: 14 }}
                className={clsx(
                  "group flex h-full flex-col gap-4 overflow-hidden rounded-2xl border border-white/40 bg-white/80 p-6 shadow-soft",
                  "backdrop-blur-sm will-change-transform",
                )}
              >
                <div className="flex items-center gap-3 text-sm font-semibold text-brand-500">
                  <span className="rounded-full border border-brand-200 bg-brand-50 px-3 py-1 text-xs tracking-[0.2em]">
                    {feature.badge}
                  </span>
                  <span className="text-neutral-500">Фичи</span>
                </div>
                <h3 className="text-lg font-semibold text-neutral-900">{feature.title}</h3>
                <p className="text-sm text-neutral-600">{feature.description}</p>
              </motion.article>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}