"use client";

import Link from "next/link";
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { useMemo, useRef } from "react";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "@/components/ui/icons";
import { ANIMATION_CONFIG } from "@/utils/motionPresets";



const metrics: ReadonlyArray<{ readonly value: string; readonly label: string }> = [
  { value: "0 ms", label: "Задержка UI" },
  { value: "100", label: "Баллов Lighthouse" },
  { value: "24/7", label: "Техподдержка" },
];

const ease = ANIMATION_CONFIG.ease;

export function Hero() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end center"] });

  const backgroundShiftRange = useMemo(() => (shouldReduceMotion ? [0, 0] : [0, -120]), [shouldReduceMotion]);
  const glowOpacityRange = useMemo(() => (shouldReduceMotion ? [0.5, 0.5] : [0.7, 0.2]), [shouldReduceMotion]);

  const backgroundShift = useTransform(scrollYProgress, [0, 1], backgroundShiftRange);
  const glowOpacity = useTransform(scrollYProgress, [0, 1], glowOpacityRange);
  const easedGlowOpacity = useSpring(glowOpacity, { stiffness: 110, damping: 26, mass: 0.5 });

  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease },
    },
  };

  return (
    <motion.section
      ref={sectionRef}
      className="container relative isolate mt-24 overflow-hidden rounded-[2.5rem] border border-white/5 bg-white/[0.02] px-6 py-20 backdrop-blur-3xl sm:px-12 lg:py-28"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={containerVariants}
    >
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{ y: backgroundShift, opacity: easedGlowOpacity }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(34,211,238,0.08),_transparent_55%),radial-gradient(circle_at_bottom_left,_rgba(147,51,234,0.05),_transparent_65%)]" />
        <div
          className="absolute inset-0 opacity-[0.15] mix-blend-screen"
          style={{
            backgroundImage:
              "url('data:image/svg+xml;utf8,<svg xmlns=\\'http://www.w3.org/2000/svg\\' width=\\'40\\' height=\\'40\\' fill=\\'none\\'><path d=\\'M0 20h40M20 0v40\\' stroke=\\'rgba(255,255,255,0.2)\\' stroke-width=\\'1\\' stroke-dasharray=\\'2 6\\'/></svg>')",
            backgroundSize: "40px 40px",
          }}
        />
      </motion.div>

      <div className="grid gap-16 lg:grid-cols-[1fr_420px] lg:items-center">
        {/* Left Content Area */}
        <motion.div className="relative z-10 space-y-12" variants={itemVariants}>
          <div className="space-y-6">
            <motion.div
              className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-mono uppercase tracking-widest text-slate-300 backdrop-blur-md"
              variants={itemVariants}
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-500"></span>
              </span>
              LidFlow Web Solutions
            </motion.div>

            <motion.h1
              className="text-display-lg font-semibold tracking-tight text-slate-50 md:leading-[1.1]"
              variants={itemVariants}
            >
              Продающие сайты <br className="hidden sm:block" /> с технологичным подходом
            </motion.h1>

            <motion.p className="max-w-xl text-body-lg text-slate-400 leading-relaxed" variants={itemVariants}>
              Разрабатываем лендинги на React и Next.js 15. Фокус на
              скорости загрузки, современном UI и высокой конверсии. Никаких шаблонов — только чистый код.
            </motion.p>
          </div>

          <motion.div
            className="flex flex-wrap items-center gap-4"
            variants={itemVariants}
          >
            <Button asChild>
              <Link href="#contact">
                <span className="flex items-center gap-2">
                  Обсудить проект
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            </Button>
            <Button asChild variant="ghost">
              <Link href="#services">Смотреть услуги</Link>
            </Button>
          </motion.div>

          {/* Metric Bento */}
          <motion.div className="grid grid-cols-3 gap-4 border-t border-white/5 pt-8" variants={itemVariants}>
            {metrics.map((metric) => (
              <div key={metric.label}>
                <div className="font-mono text-2xl font-bold text-slate-100">{metric.value}</div>
                <div className="mt-1 text-xs text-slate-500 uppercase tracking-wider">{metric.label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Right Mascot Area */}
        <motion.div className="relative z-10 flex flex-col items-center" variants={itemVariants}>
          <motion.figure
            className="relative w-full aspect-[4/5] max-w-[400px]"
            whileHover={{ scale: shouldReduceMotion ? 1 : 1.02 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
          >
            <div className="absolute inset-0 rounded-[2.5rem] border border-white/10 bg-gradient-to-br from-white/5 to-transparent backdrop-blur-2xl shadow-[0_0_80px_rgba(255,255,255,0.03)] overflow-hidden">
               <div className="absolute inset-0 bg-[url('/tal.webp')] bg-cover bg-center bg-no-repeat opacity-80 mix-blend-luminosity hover:mix-blend-normal transition-all duration-700" />
            </div>

            <motion.div
              className="absolute left-6 top-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/40 px-3 py-1 text-xs font-mono uppercase tracking-wider text-slate-300 backdrop-blur-md"
            >
              System Online
            </motion.div>
          </motion.figure>
        </motion.div>
      </div>
    </motion.section>
  );
}
