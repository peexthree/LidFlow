"use client";

import { motion } from "framer-motion";
import { clsx } from "clsx";

import { AnimatedSection } from "@/components/AnimatedSection";
import { ANIMATION_CONFIG } from "@/utils/motionPresets";

const FEATURES = [
  {
    title: "Компонентный подход",
    description: "Каждый блок — модуль с настраиваемыми пропсами и анимационными пресетами.",
    badge: "01",
  },
  {
    title: "Реактивные параллаксы",
    description: "GSAP ScrollTrigger синхронизирует слои и глубину без рывков и подтормаживаний.",
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
    description: "Цвета, тени и отступы — редактируйте палитру в одном месте.",
    badge: "05",
  },
  {
    title: "Интеграция аналитики",
    description: "События, пиксели и серверные действия Next.js без ручного переписывания кода.",
    badge: "06",
  },
] as const;

export function Features() {
  return (
    <section id="features" className="container mx-auto max-w-6xl px-6 py-26">
      <div className="grid gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
        <div className="space-y-6">
          <AnimatedSection motion="lift" once>
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-500">Технологии</span>
          </AnimatedSection>
          <AnimatedSection motion="fade-slide" direction="up" once>
            <h2 className="font-display text-display-lg text-neutral-900">
              Ключевые фичи и практики, которые включены из коробки
            </h2>
          </AnimatedSection>
          <AnimatedSection motion="blur" direction="up" once className="max-w-measure text-body-md text-neutral-600">
            <p>
              Каждый компонент обёрнут в AnimatedSection — меняйте направление и тип анимации через пропсы. Настройки вынесены в
              motionPresets.ts, поэтому вы управляете длительностью и easing централизованно.
            </p>
          </AnimatedSection>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          {FEATURES.map((feature, index) => (
            <AnimatedSection key={feature.title} motion="tilt" direction="up" delay={index * 0.05} className="h-full">
              <motion.article
                whileHover={{
                  scale: 1.02,
                  rotateX: -2,
                  rotateY: 2,
                }}
                transition={{ type: "spring", ...ANIMATION_CONFIG.spring }}
                className={clsx(
                  "group flex h-full flex-col gap-4 overflow-hidden rounded-3xl border border-white/50 bg-white/80 p-6 shadow-soft",
                  "backdrop-blur will-change-transform",
                )}
              >
                <div className="flex items-center gap-3 text-body-xs font-semibold uppercase tracking-[0.22em] text-brand-500">
                  <span className="rounded-full border border-brand-200 bg-brand-50 px-3 py-1 text-[0.68rem] tracking-[0.3em]">
                    {feature.badge}
                  </span>
                  <span className="text-charcoal-400">Фичи</span>
                </div>
                <h3 className="text-lg font-semibold text-neutral-900">{feature.title}</h3>
                <p className="text-body-sm text-neutral-600">{feature.description}</p>
              </motion.article>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}