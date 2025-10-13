"use client";

import { useEffect, type ReactNode } from "react";
import { useReducedMotion } from "framer-motion";

import { ScrollProgress } from "@/components/ScrollProgress";
import { useLenis } from "@/components/useLenis";

interface SmoothScrollerProps {
  children: ReactNode;
}

export function SmoothScroller({ children }: SmoothScrollerProps) {
  useLenis();
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const root = document.documentElement;

    if (shouldReduceMotion) {
      // 🧩 Accessibility: возвращаем стандартный скролл при снижении анимации
      const previousBehavior = root.style.scrollBehavior;
      root.style.scrollBehavior = "auto";

      return () => {
        root.style.scrollBehavior = previousBehavior;
      };
    }

    // 🧩 UX Optimization: убираем конфликт браузерного smooth с Lenis
    const previousBehavior = root.style.scrollBehavior;
    root.style.scrollBehavior = "auto";

    return () => {
      root.style.scrollBehavior = previousBehavior;
    };
  }, [shouldReduceMotion]);

  return (
    <>
      <ScrollProgress />
      {children}
    </>
  );
}