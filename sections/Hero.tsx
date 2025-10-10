"use client";

import Link from "next/link";
import { motion } from "framer-motion";

import { AnimatedSection } from "@/components/AnimatedSection";
import { ThreeBackground } from "@/components/ThreeBackground";
import { Button } from "@/components/ui/button";
import { SplitText } from "@/utils/splitText";
import { ANIMATION_CONFIG } from "@/utils/motionPresets";

const HIGHLIGHTS = [
  {
    title: "Пиксельная точность",
    description: "Компоненты, готовые к масштабированию и дизайн-системам.",
  },
  {
    title: "Глубокий сторителлинг",
    description: "Секции раскрывают продукт последовательно и без перегруза.",
  },
  {
    title: "Живая типографика",
    description: "Split-text анимации подчёркивают ключевые смыслы.",
  },
];

export function Hero() {
  return (
    <section id="hero" className="relative overflow-hidden pb-24 pt-32 sm:pt-28">
      <div className="pointer-events-none absolute inset-0 -z-20 bg-gradient-to-br from-brand-50 via-transparent to-white" />
      <ThreeBackground />

      <div className="container relative mx-auto flex max-w-6xl flex-col gap-10 px-6">
        <AnimatedSection motion="fade" once className="max-w-fit rounded-full border border-white/30 bg-white/60 px-4 py-1 text-sm font-medium text-brand-700 shadow-soft backdrop-blur">
          <span>Флоу из дизайн-системы и анимированного кода</span>
        </AnimatedSection>

        <AnimatedSection motion="fade-slide" direction="up" once>
          <h1 className="text-4xl font-semibold tracking-tight text-neutral-900 sm:text-5xl lg:text-6xl">
            <SplitText text="Продакшн-лендинг с Figma-like плавностью" stagger={ANIMATION_CONFIG.stagger.fast} />
          </h1>
        </AnimatedSection>

        <AnimatedSection motion="fade-slide" direction="up" once className="max-w-2xl text-lg text-neutral-600 sm:text-xl">
          <p>
            Комбинируем framer-motion, GSAP и Three.js для глубины, но держим перфоманс под контролем: плавный скролл на Lenis,
            умные параллаксы и отключение эффектов при prefers-reduced-motion.
          </p>
        </AnimatedSection>

        <AnimatedSection motion="fade" once className="flex flex-wrap items-center gap-4">
          <motion.div
            className="flex flex-wrap items-center gap-4"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: {
                transition: { staggerChildren: ANIMATION_CONFIG.stagger.default },
              },
            }}
          >
            <motion.div
              variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } }}
              transition={{ duration: ANIMATION_CONFIG.durations.default, ease: ANIMATION_CONFIG.ease }}
            >
              <Button asChild className="rounded-full px-6 py-3 text-base">
                <Link href="#features">Смотреть эффекты</Link>
              </Button>
            </motion.div>
            <motion.div
              variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } }}
              transition={{ duration: ANIMATION_CONFIG.durations.default, ease: ANIMATION_CONFIG.ease, delay: 0.05 }}
            >
              <Button
                asChild
                variant="ghost"
                className="rounded-full border border-brand-200 bg-white/70 px-6 py-3 text-base text-brand-600 shadow-soft backdrop-blur transition hover:border-brand-300 hover:text-brand-700"
              >
                <Link href="#cta">Обсудить проект</Link>
              </Button>
            </motion.div>
          </motion.div>
        </AnimatedSection>

        <AnimatedSection motion="fade" once className="grid gap-4 sm:grid-cols-3">
          {HIGHLIGHTS.map((item, index) => (
            <article
              key={item.title}
              className="group relative overflow-hidden rounded-2xl border border-white/40 bg-white/70 p-6 shadow-soft backdrop-blur-sm"
            >
              <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{ background: "radial-gradient(circle at top, rgba(14,165,233,0.16), transparent 70%)" }}
              />
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.7, ease: ANIMATION_CONFIG.ease, delay: index * 0.05 }}
                className="relative z-10"
              >
                <h3 className="text-lg font-semibold text-neutral-900">{item.title}</h3>
                <p className="mt-2 text-sm text-neutral-600">{item.description}</p>
              </motion.div>
            </article>
          ))}
        </AnimatedSection>
      </div>
    </section>
  );
}