"use client";


import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "@/components/ui/icons";



export interface HeroHighlight {
  title: string;
  description: string;
}

interface HeroProps {
  highlights: ReadonlyArray<HeroHighlight>;
}

export function Hero({ highlights }: HeroProps) {
  return (
    <section className="container relative overflow-hidden rounded-2xl border border-white/20 bg-neutral-950 px-6 py-20 shadow-[0_35px_120px_rgba(8,47,73,0.45)] sm:px-12">
      <Galaxy
        className="absolute inset-0 -z-10"
        transparent
        mouseInteraction
        starSpeed={0.6}
        density={1.1}
        hueShift={180}
        glowIntensity={0.45}
        twinkleIntensity={0.35}
        speed={1}
      />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.25),_transparent_65%)]" />
      <div className="grid gap-12 md:grid-cols-[minmax(0,1fr)_360px] md:items-center">
        <div className="space-y-10 text-neutral-200">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-4 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-white/80 backdrop-blur">
              <Image
                src="/logo.webp"
                alt="Логотип LidFlow"
                width={44}
                height={44}
                className="h-11 w-11 rounded-2xl border border-white/40 bg-white/20 p-1"
                sizes="44px"
                priority
              />
              <div className="flex flex-col text-left">
                <span className="text-xs uppercase tracking-[0.32em] text-white/60">LidFlow</span>
                <span className="text-sm font-medium text-white">Digital Studio</span>
              </div>
            </div>
            <span className="inline-flex items-center rounded-full border border-white/20 bg-white/5 px-4 py-1 text-xs uppercase tracking-[0.2em] text-white/70">
              Полный цикл создания лендинга
            </span>
            <h1 className="text-4xl font-semibold leading-tight text-white sm:text-5xl md:text-6xl md:leading-[1.08]">
              Дизайн «как в Figma» — но сразу в продакшн коде
            </h1>
            <p className="max-w-xl text-lg text-neutral-300">
              Лидогенерация, понятная аналитика и кастомные анимации. Собираем, запускаем и оптимизируем сайт без бюрократии.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <Button
              asChild
              className="group relative overflow-hidden rounded-xl2 border-transparent bg-brand-500 px-6 py-3 text-base font-semibold text-white shadow-[0_20px_60px_rgba(14,165,233,0.45)] transition-transform duration-300 ease-out hover:-translate-y-0.5 hover:bg-brand-400 hover:shadow-[0_24px_70px_rgba(14,165,233,0.55)]"
            >
              <Link href="/designer">
                <span className="relative z-10 inline-flex items-center gap-2">
                  Начни с прямо сейчас
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </Link>
            </Button>
            <Button
              asChild
              variant="ghost"

              className="border-white/30 bg-white/10 px-6 py-3 text-base text-neutral-100 transition hover:bg-white/20"
            >
              <Link href="#portfolio">Портфолио</Link>
            </Button>
          </div>
          <ul className="grid gap-3 sm:grid-cols-2">
            {highlights.map((item) => (
              <li
                key={item.title}
                className="group relative overflow-hidden rounded-xl border border-white/20 bg-white/5 p-4 text-sm text-neutral-200 transition hover:bg-white/10"
              >
                <div
                  className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  style={{ background: "radial-gradient(circle at top, rgba(255,255,255,0.25), transparent 70%)" }}
                />
                <div className="relative z-10 font-semibold text-white/80">{item.title}</div>
                <p className="relative z-10 mt-1 text-sm text-neutral-300">{item.description}</p>
              </li>
            ))}
          </ul>
        </div>
        <div className="group relative flex h-full flex-col rounded-2xl border border-white/20 bg-white/5 p-5 backdrop-blur-sm">
          <div
            className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            style={{ background: "radial-gradient(circle at center, rgba(255,255,255,0.25), transparent 75%)" }}
          />
          <div className="relative aspect-video overflow-hidden rounded-xl border border-white/10">
            <video
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              className="h-full w-full object-cover"
            >
              <source
                src="https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4"
                type="video/mp4"
              />
            </video>
          </div>
          <p className="relative mt-3 text-center text-sm text-neutral-300">
            Реальное превью анимаций и взаимодействий
          </p>
        </div>
      </div>
    </section>
  );
}