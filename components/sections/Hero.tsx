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

const metrics: ReadonlyArray<{ readonly value: string; readonly label: string }> = [
  { value: "280 ms", label: "Среднее время отклика моделей" },
  { value: "98%", label: "Точность решений на проде" },
  { value: "24/7", label: "Сопровождение и мониторинг" },
];

export function Hero({ highlights }: HeroProps) {
  return (
    <section className="container relative isolate overflow-hidden rounded-3xl border border-cyan-400/20 bg-slate-950 px-6 py-20 shadow-[0_45px_140px_rgba(12,74,110,0.55)] sm:px-12">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(34,211,238,0.18),_transparent_55%),radial-gradient(circle_at_bottom,_rgba(59,130,246,0.25),_transparent_65%)]" />
        <div
          className="absolute inset-0 opacity-30 mix-blend-screen"
          style={{
            backgroundImage:
              "url('data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' width=\'160\' height=\'160\' fill=\'none\'><path d=\'M0 80h160M80 0v160\' stroke=\'rgba(148,163,184,0.15)\' stroke-width=\'1\' stroke-dasharray=\'8 12\'/></svg>')",
            backgroundSize: "120px 120px",
          }}
        />
        <div className="absolute -top-32 left-1/2 h-[460px] w-[460px] -translate-x-1/2 rounded-full bg-cyan-400/35 blur-[160px]" />
        <div className="absolute bottom-[-140px] right-[-100px] h-[380px] w-[380px] rounded-full bg-indigo-500/25 blur-[140px]" />
      </div>

      <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_420px] lg:items-center">
        <div className="relative z-10 space-y-10 text-slate-100">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-4 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-xs uppercase tracking-[0.28em] text-white/70 shadow-[0_18px_45px_rgba(12,74,110,0.45)]">
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
            </div>
            <span className="inline-flex items-center gap-2 rounded-full border border-cyan-400/40 bg-cyan-400/10 px-4 py-1 text-[13px] font-medium uppercase tracking-[0.2em] text-cyan-200">
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-300" />
              Интеллектуальные интерфейсы под ключ
            </span>
            <h1 className="text-4xl font-semibold leading-tight text-white sm:text-5xl md:text-6xl md:leading-[1.05]">
              Создаём иммерсивные AI-платформы, готовые к продакшену с первого дня
            </h1>
            <p className="max-w-xl text-lg text-slate-300">
              Команда LidFlow проектирует стратегию, визуал и взаимодействия, а затем разворачивает их в Next.js с продвинутой анимацией, аналитикой и безопасностью данных.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <Button
              asChild
              className="group relative overflow-hidden rounded-xl border border-transparent bg-cyan-400 px-6 py-3 text-base font-semibold text-slate-950 shadow-[0_25px_70px_rgba(34,211,238,0.45)] transition-all duration-300 ease-out hover:-translate-y-0.5 hover:bg-cyan-300 hover:shadow-[0_30px_80px_rgba(34,211,238,0.55)]"
            >
              <Link href="#technology">
                <span className="relative z-10 inline-flex items-center gap-2">
                  Исследовать решения
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </Link>
            </Button>
            <Button
              asChild
              variant="ghost"
              className="border-white/30 bg-white/5 px-6 py-3 text-base text-white transition hover:bg-white/10 hover:text-white"
            >
              <Link href="#portfolio">Смотреть кейсы</Link>
            </Button>
          </div>

          <dl className="grid gap-6 sm:grid-cols-3">
            {metrics.map((metric) => (
              <div
                key={metric.label}
                className="rounded-2xl border border-white/10 bg-white/5 p-4 text-left shadow-[0_18px_40px_rgba(12,74,110,0.35)] backdrop-blur"
              >
                <dt className="text-sm font-medium text-cyan-100">{metric.label}</dt>
                <dd className="mt-2 text-2xl font-semibold text-white">{metric.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="relative z-10 flex flex-col items-center gap-8">
          <div className="relative aspect-square w-full max-w-[22rem] overflow-hidden rounded-full border border-cyan-400/30 bg-[radial-gradient(circle_at_25%_25%,_rgba(34,211,238,0.35),_transparent_55%),radial-gradient(circle_at_75%_75%,_rgba(129,140,248,0.35),_transparent_65%)] p-6 shadow-[0_45px_120px_rgba(12,74,110,0.55)]">
            <div className="absolute inset-4 rounded-full border border-white/20 bg-gradient-to-br from-white/10 via-transparent to-white/5" />
            <div className="absolute inset-0 animate-[spin_18s_linear_infinite] bg-[conic-gradient(from_90deg,_rgba(34,211,238,0.35),_transparent_35%,_rgba(129,140,248,0.35),_transparent_75%)]" />
            <div className="absolute inset-10 rounded-full border border-white/20 bg-slate-900/40 backdrop-blur" />
            <div className="relative z-10 flex h-full items-center justify-center">
              <Image src="/logo.webp" alt="LidFlow orb" width={96} height={96} className="h-24 w-24 opacity-90" priority />
            </div>
            <div className="absolute -top-6 right-6 flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs uppercase tracking-[0.28em] text-white/70 backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-300" />AI Core
            </div>
            <div className="absolute -bottom-6 left-8 flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs uppercase tracking-[0.28em] text-white/70 backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-sky-300" />Realtime
            </div>
          </div>

          <ul className="grid w-full gap-4 rounded-3xl border border-white/10 bg-white/5 p-6 text-left text-slate-100 shadow-[0_35px_110px_rgba(12,74,110,0.5)] backdrop-blur">
            {highlights.map((item) => (
              <li key={item.title} className="group relative flex flex-col gap-2 rounded-2xl border border-white/10 bg-white/5 p-4 transition-colors duration-300 hover:border-cyan-300/60 hover:bg-cyan-400/10">
                <span className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-100/80">{item.title}</span>
                <p className="text-sm text-slate-200">{item.description}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}