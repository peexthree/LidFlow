"use client";

import Link from "next/link";
import { motion } from "framer-motion";

import { AnimatedSection } from "@/components/AnimatedSection";
import { Button } from "@/components/ui/button";
import { SplitText } from "@/utils/splitText";
import { ANIMATION_CONFIG } from "@/utils/motionPresets";

export function Hero() {
  return (
    <section
      id="hero"
      className="relative flex h-[100svh] min-h-[600px] w-full items-center justify-center overflow-hidden"
    >
      {/* Video Background */}
      <div className="absolute inset-0 z-0 bg-[#020304]">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="h-full w-full object-cover opacity-80"
        >
          <source src="/Man.mp4" type="video/mp4" />
        </video>
        {/* Overlay to ensure text readability */}
        <div className="absolute inset-0 bg-black/60" />
      </div>

      <div className="container relative z-10 mx-auto flex max-w-6xl flex-col items-center justify-center gap-8 px-6 text-center">
        <AnimatedSection
          motion="lift"
          once
          className="rounded-full border border-white/10 bg-black/30 px-5 py-2 text-xs font-semibold uppercase tracking-[0.15em] text-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.2)] backdrop-blur-md"
        >
          <span>Telegram Web Apps & Bots</span>
        </AnimatedSection>

        <AnimatedSection motion="fade-slide" direction="up" once>
          <h1 className="font-display text-display-xl font-bold uppercase tracking-tight text-white drop-shadow-2xl md:text-[5.5rem] lg:text-[7rem] leading-[1.2]">
            <SplitText
              text="Автоматизация"
              stagger={ANIMATION_CONFIG.stagger.fast}
            />
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 drop-shadow-none">
              <SplitText
                text="Продаж"
                stagger={ANIMATION_CONFIG.stagger.fast}
              />
            </span>
          </h1>
        </AnimatedSection>

        <AnimatedSection
          motion="blur"
          direction="up"
          once
          className="max-w-3xl text-body-lg text-slate-300 md:text-xl font-light"
        >
          <p>
            Увеличиваем конверсию, снижаем нагрузку на менеджеров.
            Разрабатываем инструменты, которые продают 24/7.
          </p>
        </AnimatedSection>

        <AnimatedSection
          motion="lift"
          once
          className="mt-4 flex flex-wrap items-center justify-center gap-6"
        >
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: ANIMATION_CONFIG.stagger.default,
                },
              },
            }}
            className="flex flex-wrap justify-center gap-4"
          >
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 24 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{
                duration: ANIMATION_CONFIG.durations.default,
                ease: ANIMATION_CONFIG.ease,
              }}
            >
              <Button asChild className="rounded-full bg-white px-8 py-6 text-lg font-bold text-black transition-transform hover:scale-105 hover:bg-slate-200">
                <Link href="https://t.me/LIDflowDemoBOT" target="_blank" rel="noopener noreferrer">Запустить Демо-Бота</Link>
              </Button>
            </motion.div>
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 24 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{
                duration: ANIMATION_CONFIG.durations.default,
                ease: ANIMATION_CONFIG.ease,
                delay: 0.1,
              }}
            >
              <Button
                asChild
                variant="outline"
                className="rounded-full border-white/20 bg-white/5 px-8 py-6 text-lg font-bold text-white backdrop-blur-md transition-colors hover:bg-white/10 hover:text-white"
              >
                <Link href="#pricing">Посмотреть тарифы</Link>
              </Button>
            </motion.div>
          </motion.div>
        </AnimatedSection>
      </div>

    </section>
  );
}
