"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

import { AnimatedSection } from "@/components/AnimatedSection";
import { ThreeBackground } from "@/components/ThreeBackground";
import { Button } from "@/components/ui/button";
import { SplitText } from "@/utils/splitText";
import { ANIMATION_CONFIG } from "@/utils/motionPresets";

const HIGHLIGHTS = [
  {
    title: "Пиксельная точность",
    description: "Компоненты готовы к масштабированию и дизайн-системам.",
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
  const sectionRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // 🧩 Motion Layer: создаём cinematic эффект blur-to-sharp при скролле
  const blurBackdrop = useTransform(scrollYProgress, [0, 1], ["blur(24px)", "blur(0px)"]);
  const heroLift = useTransform(scrollYProgress, [0, 1], [0, -64]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1.02, 1]);

  return (
    <section ref={sectionRef} id="hero" className="relative overflow-hidden pb-30 pt-32 sm:pt-28">
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-20 bg-radial-fade"
        style={{ filter: blurBackdrop, scale: heroScale }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-30 bg-radial-fade-strong"
        style={{ y: heroLift, opacity: 0.85 }}
      />
      <ThreeBackground />

      <div className="container relative mx-auto flex max-w-6xl flex-col gap-10 px-6">
        <AnimatedSection motion="lift" once className="max-w-fit rounded-full border border-white/40 bg-white/70 px-4 py-1 text-xs font-semibold uppercase tracking-[0.32em] text-brand-600 shadow-soft backdrop-blur">
          <span>Флоу из дизайн-системы и анимированного кода</span>
        </AnimatedSection>

        <AnimatedSection motion="fade-slide" direction="up" once>
          <h1 className="font-display text-display-xl text-neutral-900">
            <SplitText text="Продакшн-лендинг с Figma-like плавностью" stagger={ANIMATION_CONFIG.stagger.fast} />
          </h1>
        </AnimatedSection>

        <AnimatedSection motion="blur" direction="up" once className="max-w-measure text-body-lg text-charcoal-600">
          <p>
            Комбинируем framer-motion, GSAP и Three.js для глубины, но держим перфоманс под контролем: плавный скролл на Lenis,
            умные параллаксы и отключение эффектов при prefers-reduced-motion.
          </p>
        </AnimatedSection>

        <AnimatedSection motion="lift" once className="flex flex-wrap items-center gap-4">
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
                className="rounded-full border border-brand-100 bg-white/80 px-6 py-3 text-base text-brand-600 hover:border-brand-200"
              >
                <Link href="#cta">Обсудить проект</Link>
              </Button>
            </motion.div>
          </motion.div>
        </AnimatedSection>

        <AnimatedSection motion="tilt" once className="grid gap-6 sm:grid-cols-3">
          {HIGHLIGHTS.map((item, index) => (
            <motion.article
              key={item.title}
              className="group relative overflow-hidden rounded-3xl border border-white/40 bg-white/70 p-6 shadow-soft backdrop-blur-sm"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.45 }}
              variants={{
                hidden: { opacity: 0, y: 24, filter: "blur(10px)" },
                visible: { opacity: 1, y: 0, filter: "blur(0px)" },
              }}
              transition={{ duration: 0.8, ease: ANIMATION_CONFIG.ease, delay: index * 0.04 }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{ background: "radial-gradient(circle at top, rgba(31,140,255,0.18), transparent 70%)" }}
              />
              <div className="relative z-10 space-y-2">
                <h3 className="font-semibold text-neutral-900">{item.title}</h3>
                <p className="text-body-sm text-neutral-600">{item.description}</p>
              </div>
            </motion.article>
          ))}
        </AnimatedSection>
      </div>
    </section>
  );
}