"use client";

import Link from "next/link";
import { motion } from "framer-motion";

import { AnimatedSection } from "@/components/AnimatedSection";
import { Button } from "@/components/ui/button";
import { ANIMATION_CONFIG } from "@/utils/motionPresets";

export function CTA() {
  return (
    <section id="cta" className="container mx-auto max-w-5xl px-6 py-26">
      <AnimatedSection motion="lift" once className="relative overflow-hidden rounded-[2rem] border border-brand-200/60 bg-gradient-to-r from-brand-500 via-brand-400 to-brand-600 p-[1px] shadow-floating">
        <motion.div
          className="relative h-full rounded-[calc(theme(borderRadius.3xl))] bg-white/95 p-10 text-center text-neutral-900 shadow-[0_25px_60px_rgba(31,140,255,0.25)]"
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.85, ease: ANIMATION_CONFIG.ease }}
        >
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.22),transparent_60%)]" aria-hidden />
          <div className="pointer-events-none absolute inset-0 opacity-70 [background:radial-gradient(circle_at_bottom,rgba(31,140,255,0.18),transparent_65%)]" aria-hidden />
          <div className="relative mx-auto flex max-w-2xl flex-col gap-6">
            <h2 className="font-display text-display-md text-neutral-900">Готовы ускорить запуск нового лендинга?</h2>
            <p className="text-body-md text-neutral-600">
              Подготовим скролл-анимации, параллаксы и трёхмерный фон, чтобы продукт чувствовался премиальным. Код легко поддерживать:
              все настройки вынесены в пропсы и константы.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild className="rounded-full px-6 py-3 text-base">
                <Link href="mailto:linderop@yandex.ru">Написать на почту</Link>
              </Button>
              <Button
                asChild
                variant="ghost"
                className="rounded-full border border-white/70 bg-white/85 px-6 py-3 text-base text-brand-600 hover:border-white"
              >
                <Link href="https://t.me/peexthree" target="_blank" rel="noreferrer">
                  Связаться в Telegram
                </Link>
              </Button>
            </div>
          </div>
        </motion.div>
      </AnimatedSection>
    </section>
  );
}