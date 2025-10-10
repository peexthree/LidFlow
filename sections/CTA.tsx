"use client";

import Link from "next/link";

import { AnimatedSection } from "@/components/AnimatedSection";
import { Button } from "@/components/ui/button";

export function CTA() {
  return (
    <section id="cta" className="container mx-auto max-w-5xl px-6 py-24">
      <AnimatedSection motion="scale" once className="relative overflow-hidden rounded-3xl border border-brand-200 bg-gradient-to-r from-brand-500 via-brand-400 to-brand-600 p-[1px] shadow-soft">
        <div className="relative h-full rounded-[calc(theme(borderRadius.3xl))] bg-white/95 p-10 text-center text-neutral-900 shadow-[0_25px_60px_rgba(14,165,233,0.25)]">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.2),transparent_60%)]" aria-hidden />
          <div className="mx-auto flex max-w-2xl flex-col gap-6">
            <h2 className="text-3xl font-semibold sm:text-4xl">Готовы ускорить запуск нового лендинга?</h2>
            <p className="text-base text-neutral-600 sm:text-lg">
              Подготовим скролл-анимации, параллаксы и трёхмерный фон, чтобы продукт чувствовался премиальным. Код легко
              поддерживать: все настройки вынесены в пропсы и константы.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild className="rounded-full px-6 py-3 text-base">
                <Link href="mailto:linderop@yandex.ru">Написать на почту</Link>
              </Button>
              <Button
                asChild
                variant="ghost"
                className="rounded-full border border-white/60 bg-white/80 px-6 py-3 text-base text-brand-600 hover:border-white"
              >
                <Link href="https://t.me/peexthree" target="_blank" rel="noreferrer">
                  Связаться в Telegram
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </AnimatedSection>
    </section>
  );
}