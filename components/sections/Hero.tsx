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
      <div className="absolute inset-0 z-0 bg-[#e8eaf0]">
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
          className="rounded-none border border-[#66FCF1]/30 bg-[#e8eaf0]/80 px-5 py-2 text-xs font-semibold uppercase tracking-[0.15em] text-brand-600   font-mono"
        >
          <span>Технологическая Архитектура & Лор</span>
        </AnimatedSection>

        <AnimatedSection motion="fade-slide" direction="up" once>
          <h1 className="font-display text-display-xl font-bold uppercase tracking-tight text-slate-900 drop-shadow-2xl md:text-[4rem] lg:text-[5rem] leading-[1.2]">
            <SplitText
              text="ЦИФРОВАЯ ЭВОЛЮЦИЯ"
              stagger={ANIMATION_CONFIG.stagger.fast}
            />
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#66FCF1] to-blue-500 drop-shadow-none">
              <SplitText
                text="ВАШЕГО БИЗНЕСА"
                stagger={ANIMATION_CONFIG.stagger.fast}
              />
            </span>
          </h1>
        </AnimatedSection>

        <AnimatedSection
          motion="blur"
          direction="up"
          once
          className="max-w-3xl text-body-lg text-slate-600 md:text-xl font-mono uppercase tracking-widest"
        >
          <p>
            От архитектуры систем продаж до создания глубокого лора.
            Мы не просто пишем код, мы строим вселенные.
          </p>
        </AnimatedSection>

        <AnimatedSection
          motion="lift"
          once
          className="mt-8 flex flex-wrap items-center justify-center gap-6 w-full max-w-lg"
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
            className="flex flex-col sm:flex-row w-full justify-center gap-4"
          >
            <motion.div
              className="w-full sm:w-1/2"
              variants={{
                hidden: { opacity: 0, y: 24 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{
                duration: ANIMATION_CONFIG.durations.default,
                ease: ANIMATION_CONFIG.ease,
              }}
            >
              <Button asChild className="w-full rounded-none bg-brand-400 px-8 py-6 font-mono text-sm font-bold text-black transition-transform hover:scale-105 hover:bg-brand-400/80 ">
                <Link href="https://t.me/LIDflowDemoBOT" target="_blank" rel="noopener noreferrer">ИНИЦИИРОВАТЬ ПРОЕКТ</Link>
              </Button>
            </motion.div>
            <motion.div
              className="w-full sm:w-1/2"
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
                className="w-full rounded-none border-purple-500/50 bg-[#090209]/80 px-8 py-6 font-mono text-sm font-bold text-purple-400  transition-all hover:bg-purple-600/20 hover:text-slate-900 "
              >
                <Link href="https://t.me/Eidos_Interface_bot" target="_blank" rel="noopener noreferrer">ПОГРУЗИТЬСЯ В ЛОР</Link>
              </Button>
            </motion.div>
          </motion.div>
        </AnimatedSection>
      </div>

      {/* Декоративные элементы */}
      <div className="absolute bottom-10 left-10 pointer-events-none hidden md:block">
         <div className="text-brand-600/50 font-mono text-[10px] tracking-[0.2em] uppercase">
            Система активна<br/>
            Сборка v2.0.4<br/>
            Шифрование [OK]
         </div>
      </div>

    </section>
  );
}
