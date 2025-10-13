"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { useMemo, useRef } from "react";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "@/components/ui/icons";
import { ANIMATION_CONFIG } from "@/utils/motionPresets";

export interface HeroHighlight {
  title: string;
  description: string;
}

interface HeroProps {
  highlights: ReadonlyArray<HeroHighlight>;
}

const metrics: ReadonlyArray<{ readonly value: string; readonly label: string }> = [
  { value: "280 ms", label: "Среднее время отклика моделей" },
  { value: "98%", label: "Точность решений на проде" },
  { value: "24/7", label: "Сопровождение и мониторинг" },
];

const ease = ANIMATION_CONFIG.ease;

export function Hero({ highlights }: HeroProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end center"] });

  const backgroundShiftRange = useMemo(() => (shouldReduceMotion ? [0, 0] : [0, -120]), [shouldReduceMotion]);
  const orbShiftRange = useMemo(() => (shouldReduceMotion ? [0, 0] : [0, 90]), [shouldReduceMotion]);
  const glowOpacityRange = useMemo(() => (shouldReduceMotion ? [0.78, 0.78] : [0.92, 0.4]), [shouldReduceMotion]);

  const backgroundShift = useTransform(scrollYProgress, [0, 1], backgroundShiftRange);
  const orbShift = useTransform(scrollYProgress, [0, 1], orbShiftRange);
  const glowOpacity = useTransform(scrollYProgress, [0, 1], glowOpacityRange);
  const easedGlowOpacity = useSpring(glowOpacity, { stiffness: 110, damping: 26, mass: 0.5 });

  const containerVariants = {
    hidden: { opacity: 0, y: 64 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: ANIMATION_CONFIG.durations.default,
        ease,
        staggerChildren: ANIMATION_CONFIG.stagger.default,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 34 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.85, ease },
    },
  };

  const metricVariants = {
    hidden: { opacity: 0, y: 28, filter: "blur(12px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.9, ease },
    },
  };

  const highlightVariants = {
    hidden: { opacity: 0, y: 26, scale: 0.96 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.85, ease },
    },
  };

  return (
    <motion.section
      ref={sectionRef}
      className="container relative isolate overflow-hidden rounded-3xl border border-cyan-400/20 bg-slate-950 px-6 py-20 shadow-[0_45px_140px_rgba(12,74,110,0.55)] sm:px-12"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.55 }}
      variants={containerVariants}
    >
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{ y: backgroundShift, opacity: easedGlowOpacity }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(34,211,238,0.18),_transparent_55%),radial-gradient(circle_at_bottom,_rgba(59,130,246,0.25),_transparent_65%)]" />
        <div
          className="absolute inset-0 opacity-35 mix-blend-screen"
          style={{
            backgroundImage:
              "url('data:image/svg+xml;utf8,<svg xmlns=\\'http://www.w3.org/2000/svg\\' width=\\'160\\' height=\\'160\\' fill=\\'none\\'><path d=\\'M0 80h160M80 0v160\\' stroke=\\'rgba(148,163,184,0.15)\\' stroke-width=\\'1\\' stroke-dasharray=\\'8 12\\'/></svg>')",
            backgroundSize: "120px 120px",
          }}
        />
      </motion.div>

      <motion.div
        aria-hidden
        className="pointer-events-none absolute -top-32 left-1/2 h-[460px] w-[460px] -translate-x-1/2 rounded-full bg-cyan-400/35 blur-[160px]"
        style={{ y: orbShift }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute bottom-[-140px] right-[-100px] h-[380px] w-[380px] rounded-full bg-indigo-500/25 blur-[140px]"
        style={{ y: orbShift }}
      />

      <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_420px] lg:items-center">
        <motion.div className="relative z-10 space-y-10 text-slate-100" variants={itemVariants}>
          <motion.div className="space-y-6" variants={itemVariants}>
            <motion.div
              className="inline-flex items-center gap-4 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-xs uppercase tracking-[0.28em] text-white/70 shadow-[0_18px_45px_rgba(12,74,110,0.45)]"
              variants={itemVariants}
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/40 bg-white/20 backdrop-blur">
                <Image
                  src="/logo.webp"
                  alt="Логотип LidFlow"
                  width={24}
                  height={24}
                  className="h-6 w-6"
                  sizes="24px"
                  priority
                />
              </span>
              LidFlow · AI Experience Studio
            </motion.div>
            <motion.span
              className="inline-flex items-center gap-2 rounded-full border border-cyan-400/40 bg-cyan-400/10 px-4 py-1 text-[13px] font-medium uppercase tracking-[0.2em] text-cyan-200"
              variants={itemVariants}
            >
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-300" />
              Интеллектуальные интерфейсы под ключ
            </motion.span>
            <motion.h1
              className="text-display-lg font-semibold leading-tight text-white md:leading-[1.05]"
              variants={itemVariants}
            >
              Создаём иммерсивные AI-платформы, готовые к продакшену с первого дня
            </motion.h1>
            <motion.p className="max-w-xl text-body-md text-slate-300" variants={itemVariants}>
              Команда LidFlow проектирует стратегию, визуал и взаимодействия, а затем разворачивает их в Next.js с продвинутой
              анимацией, аналитикой и безопасностью данных.
            </motion.p>
          </motion.div>

          <motion.div
            className="flex flex-wrap items-center gap-4"
            variants={itemVariants}
            transition={{ staggerChildren: ANIMATION_CONFIG.stagger.fast }}
          >
            <motion.div variants={itemVariants} whileHover={{ y: shouldReduceMotion ? 0 : -4, scale: shouldReduceMotion ? 1 : 1.01 }}>
              <Button
                asChild
                className="group relative overflow-hidden rounded-xl border border-transparent bg-cyan-400 px-6 py-3 text-base font-semibold text-slate-950 shadow-[0_25px_70px_rgba(34,211,238,0.45)] transition-colors duration-300 ease-figma-smooth"
              >
                <Link href="#technology">
                  <span className="relative z-10 inline-flex items-center gap-2">
                    Исследовать решения
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </Link>
              </Button>
            </motion.div>
            <motion.div variants={itemVariants} whileHover={{ y: shouldReduceMotion ? 0 : -4 }}>
              <Button
                asChild
                variant="ghost"
                className="border-white/30 bg-white/5 px-6 py-3 text-base text-white transition hover:bg-white/10 hover:text-white"
              >
                <Link href="#portfolio">Смотреть кейсы</Link>
              </Button>
            </motion.div>
          </motion.div>

          <motion.dl className="grid gap-6 sm:grid-cols-3" variants={itemVariants}>
            {metrics.map((metric) => (
              <motion.div
                key={metric.label}
                className="rounded-2xl border border-white/10 bg-white/5 p-4 text-left shadow-[0_18px_40px_rgba(12,74,110,0.35)] backdrop-blur"
                variants={metricVariants}
                whileHover={{ scale: shouldReduceMotion ? 1 : 1.02 }}
              >
                <dt className="text-sm font-medium text-cyan-100">{metric.label}</dt>
                <dd className="mt-2 text-2xl font-semibold text-white">{metric.value}</dd>
              </motion.div>
            ))}
          </motion.dl>
        </motion.div>

        <motion.div className="relative z-10 flex flex-col items-center gap-8" variants={itemVariants}>
          <motion.div
            className="relative aspect-square w-full max-w-[22rem] overflow-hidden rounded-full border border-cyan-400/30 bg-[radial-gradient(circle_at_25%_25%,_rgba(34,211,238,0.35),_transparent_55%),radial-gradient(circle_at_75%_75%,_rgba(129,140,248,0.35),_transparent_65%)] p-6 shadow-[0_45px_120px_rgba(12,74,110,0.55)]"
            variants={highlightVariants}
            whileHover={{ rotateX: shouldReduceMotion ? 0 : -2, rotateY: shouldReduceMotion ? 0 : 2 }}
            transition={{ type: "spring", stiffness: 120, damping: 18, mass: 0.5 }}
          >
            <motion.div
              aria-hidden
              className="absolute inset-4 rounded-full border border-white/20 bg-gradient-to-br from-white/10 via-transparent to-white/5"
              style={{ opacity: easedGlowOpacity }}
            />
            <motion.div
              className="absolute inset-0"
              initial={{ rotate: 12 }}
              animate={{ rotate: 0 }}
              transition={{ duration: 1.2, ease }}
              style={{ opacity: easedGlowOpacity }}
            >
              <div className="h-full w-full animate-[spin_18s_linear_infinite] bg-[conic-gradient(from_90deg,_rgba(34,211,238,0.35),_transparent_35%,_rgba(129,140,248,0.35),_transparent_75%)]" />
            </motion.div>
            <div className="absolute inset-10 rounded-full border border-white/20 bg-slate-900/40 backdrop-blur" />
            <div className="relative z-10 flex h-full items-center justify-center">
              <Image src="/logo.webp" alt="LidFlow orb" width={96} height={96} className="h-24 w-24 opacity-90" priority />
            </div>
            <motion.div
              className="absolute -top-6 right-6 flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs uppercase tracking-[0.28em] text-white/70 backdrop-blur"
              style={{ y: orbShift }}
            >
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-300" />AI Core
            </motion.div>
            <motion.div
              className="absolute -bottom-6 left-8 flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs uppercase tracking-[0.28em] text-white/70 backdrop-blur"
              style={{ y: orbShift }}
            >
              <span className="h-1.5 w-1.5 rounded-full bg-sky-300" />Realtime
            </motion.div>
          </motion.div>

          <motion.ul className="grid w-full gap-4 rounded-3xl border border-white/10 bg-white/5 p-6 text-left text-slate-100 shadow-[0_35px_110px_rgba(12,74,110,0.5)] backdrop-blur" variants={itemVariants}>
            {highlights.map((item) => (
              <motion.li
                key={item.title}
                className="group relative flex flex-col gap-2 rounded-2xl border border-white/10 bg-white/5 p-4 transition-colors duration-300 hover:border-cyan-300/60 hover:bg-cyan-400/10"
                variants={highlightVariants}
                whileHover={{ y: shouldReduceMotion ? 0 : -6, scale: shouldReduceMotion ? 1 : 1.01 }}
                whileFocus={{ scale: shouldReduceMotion ? 1 : 1.01 }}
              >
                <span className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-100/80">{item.title}</span>
                <p className="text-sm text-slate-200">{item.description}</p>
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>
      </div>
    </motion.section>
  );
}