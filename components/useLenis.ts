"use client";

import { useEffect } from "react";

export function useLenis() {
  useEffect(() => {
    if (typeof window === "undefined") {
      return undefined;
    }

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (prefersReducedMotion.matches) {
      return undefined;
    }

    type LenisInstance = { raf: (time: number) => void; destroy: () => void };
    let lenis: LenisInstance | undefined;
    let frameId = 0;
    let stopped = false;

    const startLenis = async () => {
      const { default: Lenis } = await import("lenis");
      lenis = new Lenis({
        smoothWheel: true,
        lerp: 0.08,
        syncTouch: false,
      });

      const raf = (time: number) => {
        if (!lenis || stopped) {
          return;
        }
        lenis.raf(time);
        frameId = requestAnimationFrame(raf);
      };

      frameId = requestAnimationFrame(raf);
    };

    void startLenis();

    const handleMotionChange = (event: MediaQueryListEvent) => {
      if (event.matches) {
        stopped = true;
        if (frameId) {
          cancelAnimationFrame(frameId);
        }
        lenis?.destroy();
        lenis = undefined;
      } else if (!lenis) {
        stopped = false;
        void startLenis();
      }
    };

    if (typeof prefersReducedMotion.addEventListener === "function") {
      prefersReducedMotion.addEventListener("change", handleMotionChange);
    } else {
      prefersReducedMotion.addListener(handleMotionChange);
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
    };
  }, []);
}
