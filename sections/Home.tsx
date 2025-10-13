"use client";

import { useMemo } from "react";
import { SpeedInsights } from "@vercel/speed-insights/next";

import { ScrollProgress } from "@/components/ScrollProgress";
import { useLenis } from "@/components/useLenis";
import { ParallaxSection } from "@/components/ParallaxSection";
import { AnimatedSection } from "@/components/AnimatedSection";
import { Hero } from "@/sections/Hero";
import { Features } from "@/sections/Features";
import { Gallery } from "@/sections/Gallery";
import { CTA } from "@/sections/CTA";

export function HomePage() {
  useLenis();

  const parallaxLayers = useMemo(
    () => [
      {
        speed: -48,
        content: (
          <div
            aria-hidden
            className="pointer-events-none h-full w-full bg-[radial-gradient(circle_at_18%_20%,rgba(37,99,235,0.6),transparent_70%)] blur-3xl opacity-90"
          />
        ),
      },
      {
        speed: 36,
        content: (
          <div
            aria-hidden
            className="pointer-events-none h-full w-full bg-[radial-gradient(circle_at_82%_65%,rgba(192,38,211,0.5),transparent_65%)] blur-3xl opacity-85"
          />
        ),
      },
      {
        speed: -24,
        content: (
          <div
            aria-hidden
            className="pointer-events-none h-full w-full bg-[radial-gradient(circle_at_50%_110%,rgba(14,165,233,0.35),transparent_70%)] blur-[100px] opacity-75"
          />
        ),
      },
      {
        speed: 18,
        content: (
          <div
            aria-hidden
            className="pointer-events-none mx-auto h-full w-[120%] max-w-5xl bg-gradient-to-b from-white/70 via-white/20 to-transparent blur-[72px]"
          />
        ),
      },
    ],
    [],
  );

  return (
    <div className="relative flex flex-col gap-0">
      <ScrollProgress />
      <Hero />
      <Features />
      <ParallaxSection layers={parallaxLayers} className="py-26">
        <div className="container mx-auto flex max-w-4xl flex-col gap-8 px-6 text-center text-neutral-900">
          <AnimatedSection motion="lift" once>
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-500">
              Съёмка внимания пользователя
            </span>
          </AnimatedSection>
          <AnimatedSection motion="fade-slide" direction="up" once>
            <h2 className="font-display text-display-md">Параллакс-композиция усиливает ощущение глубины</h2>
          </AnimatedSection>
          <AnimatedSection motion="blur" direction="up" once className="text-body-md text-neutral-600">
            <p>
              Добавляйте слои через пропсы <code>layers</code> и задавайте скорость движения. ScrollTrigger синхронизирует анимации
              относительно секции, а для мобильных скорость автоматически снижается.
            </p>
          </AnimatedSection>
        </div>
      </ParallaxSection>
      <Gallery />
      <CTA />
      <SpeedInsights />
    </div>
  );
}