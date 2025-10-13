"use client";

import Image from "next/image";
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
  return (
    <section
      id="hero"
      className="relative overflow-hidden pb-30 pt-32 sm:pt-28"
    >
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-20 bg-radial-fade"
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-30 bg-radial-fade-strong"
        style={{ opacity: 0.85 }}
      />
      <ThreeBackground />

      <div className="container relative mx-auto flex max-w-6xl flex-col gap-12 px-6">
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(320px,0.9fr)]">
          <div className="flex flex-col gap-10">
            <AnimatedSection
              motion="lift"
              once
              className="max-w-fit rounded-full border border-white/40 bg-white/70 px-4 py-1 text-xs font-semibold uppercase tracking-[0.32em] text-brand-600 shadow-soft backdrop-blur"
            >
              <span>Флоу из дизайн-системы и анимированного кода</span>
            </AnimatedSection>

            <AnimatedSection motion="fade-slide" direction="up" once>
              <h1 className="font-display text-display-xl text-neutral-900">
                <SplitText
                  text="Продакшн-лендинг с Figma-like плавностью"
                  stagger={ANIMATION_CONFIG.stagger.fast}
                />
              </h1>
            </AnimatedSection>

            <AnimatedSection
              motion="blur"
              direction="up"
              once
              className="max-w-measure text-body-lg text-charcoal-600"
            >
              <p>
                Комбинируем framer-motion, GSAP и Three.js для глубины, но
                держим перфоманс под контролем: плавный скролл на Lenis, умные
                параллаксы и отключение эффектов при prefers-reduced-motion.
              </p>
            </AnimatedSection>

            <AnimatedSection
              motion="lift"
              once
              className="flex flex-wrap items-center gap-4"
            >
              <motion.div
                className="flex flex-wrap items-center gap-4"
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
                  <Button asChild className="rounded-full px-6 py-3 text-base">
                    <Link href="#features">Смотреть эффекты</Link>
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
                    delay: 0.05,
                  }}
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
          </div>

          <AnimatedSection
            motion="tilt"
            once
            className="relative overflow-visible rounded-[44px]"
          >
            <motion.div
              className="relative isolate flex items-center justify-center"

            >
              <div className="absolute inset-0 -z-10 rounded-[44px] border border-white/30 bg-white/60 shadow-[0_40px_120px_rgba(15,23,42,0.18)] backdrop-blur-xl" />
              <div
                className="absolute -inset-16 -z-20 opacity-80 blur-3xl"
                style={{
                  background:
                    "linear-gradient(140deg, rgba(59,130,246,0.45), rgba(17,24,39,0.25))",
                }}
              />
              <div className="absolute -right-28 top-1/2 -z-10 hidden h-64 w-64 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,_rgba(59,130,246,0.35)_0%,_rgba(59,130,246,0)_70%)] blur-2xl lg:block" />

              {/* Showcase frame intentionally keeps overflow visible so тал-герой выходит за границы обрамления. */}
              <div className="relative overflow-visible rounded-[32px] bg-gradient-to-br from-white/80 via-white/60 to-white/30 p-6 backdrop-blur-lg">
                <div className="pointer-events-none absolute inset-0 -z-10 rounded-[28px] border border-white/50" />
                <Image
                  src="/tal.webp"
                  alt="Футуристичный талисман LidFlow"
                  width={760}
                  height={760}
                  priority
                  sizes="(min-width: 1280px) 620px, (min-width: 1024px) 540px, (min-width: 768px) 460px, 340px"
                  className="relative z-20 w-full max-w-[620px] -translate-y-6 translate-x-4 drop-shadow-[0_40px_90px_rgba(59,130,246,0.45)]"
                />

                <div
                  aria-hidden
                  className="pointer-events-none absolute -right-24 -top-24 z-30 hidden h-72 w-72 rounded-full bg-[radial-gradient(circle,_rgba(59,130,246,0.35)_0%,_rgba(59,130,246,0)_70%)] blur-2xl lg:block"
                />
                <Image
                  src="/tal2.webp"
                  alt="Лазурный талисман LidFlow"
                  width={520}
                  height={520}
                  sizes="(min-width: 1280px) 440px, (min-width: 768px) 360px, 260px"
                  className="absolute -right-16 -top-10 z-40 w-[260px] -rotate-6 sm:w-[320px] lg:-right-20 lg:-top-16 lg:w-[360px] xl:-right-24 xl:-top-20 xl:w-[420px] drop-shadow-[0_28px_90px_rgba(37,99,235,0.38)]"
                />
              </div>
            </motion.div>
          </AnimatedSection>
        </div>

        <AnimatedSection
          motion="tilt"
          once
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
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
              transition={{
                duration: 0.8,
                ease: ANIMATION_CONFIG.ease,
                delay: index * 0.04,
              }}
              whileHover={{ scale: 1.02 }}
            >
              <div
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{
                  background:
                    "radial-gradient(circle at top, rgba(31,140,255,0.18), transparent 70%)",
                }}
              />
              <div className="relative z-10 space-y-2">
                <h3 className="font-semibold text-neutral-900">{item.title}</h3>
                <p className="text-body-sm text-neutral-600">
                  {item.description}
                </p>
              </div>
            </motion.article>
          ))}
        </AnimatedSection>
      </div>
    </section>
  );
}