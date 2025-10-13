"use client";

import { useEffect } from "react";

export function useLenis() {
  useEffect(() => {
    if (typeof window === "undefined") {
      return undefined;
    }

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    // Отключаем кастомный скролл на мобильных, чтобы убрать микролаги и ускорить интерфейс.
    const mobileViewportQuery = window.matchMedia("(max-width: 767px)");

    if (prefersReducedMotion.matches) {
      return undefined;
    }

    type LenisInstance = { raf: (time: number) => void; destroy: () => void };
    let lenis: LenisInstance | undefined;
    let frameId = 0;
    let stopped = false;

    const resolveOptions = () => {
      const isMobileViewport = mobileViewportQuery.matches;
      // 🧩 Motion Responsiveness: на мобильных уменьшаем инерцию
      return {
        duration: 1.1,
        lerp: isMobileViewport ? 0.14 : 0.08,
        smoothWheel: true,
        smoothTouch: false,
        touchMultiplier: isMobileViewport ? 1.1 : 1,
        syncTouch: false,
      } as const;
    };

    const startLenis = async () => {
      const { default: Lenis } = await import("lenis");
      lenis = new Lenis(resolveOptions());

      const raf = (time: number) => {
        if (!lenis || stopped) {
          return;
        }
        lenis.raf(time);
        frameId = requestAnimationFrame(raf);
      };

      frameId = requestAnimationFrame(raf);
    };

    if (!mobileViewportQuery.matches) {
      void startLenis();
    }

    const handleMotionChange = (event: MediaQueryListEvent) => {
      if (event.matches) {
        stopped = true;
        if (frameId) {
          cancelAnimationFrame(frameId);
        }
        lenis?.destroy();
        lenis = undefined;
      } else if (!lenis && !mobileViewportQuery.matches) {
        stopped = false;
        void startLenis();
      }
    };

    const handleViewportChange = (event: MediaQueryListEvent) => {
      if (event.matches) {
        if (frameId) {
          cancelAnimationFrame(frameId);
        }
        stopped = true;
        lenis?.destroy();
        lenis = undefined;
        return;
      }

      if (!lenis) {
        stopped = false;
        void startLenis();
      }
    };

    if (typeof prefersReducedMotion.addEventListener === "function") {
      prefersReducedMotion.addEventListener("change", handleMotionChange);
    } else {
      prefersReducedMotion.addListener(handleMotionChange);
    }

    if (typeof mobileViewportQuery.addEventListener === "function") {
      mobileViewportQuery.addEventListener("change", handleViewportChange);
    } else {
      mobileViewportQuery.addListener(handleViewportChange);
    }

    return () => {
      stopped = true;
      if (frameId) {
        cancelAnimationFrame(frameId);
      }
      lenis?.destroy();
      if (typeof prefersReducedMotion.removeEventListener === "function") {
        prefersReducedMotion.removeEventListener("change", handleMotionChange);
      } else {
        prefersReducedMotion.removeListener(handleMotionChange);
      }
      if (typeof mobileViewportQuery.removeEventListener === "function") {
        mobileViewportQuery.removeEventListener("change", handleViewportChange);
      } else {
        mobileViewportQuery.removeListener(handleViewportChange);
      }
    };
  }, []);
}
