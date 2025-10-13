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
        speed: -18,
        className:
          "bg-[radial-gradient(circle_at_20%_20%,rgba(31,140,255,0.2),transparent_65%)]",
      },
      {
        speed: 22,
        className:
          "bg-[radial-gradient(circle_at_80%_60%,rgba(168,85,247,0.16),transparent_65%)]",
      },
      {
        speed: -10,
        content: (
          <div className="h-full w-full bg-gradient-to-b from-white/60 via-white/30 to-transparent" aria-hidden />
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