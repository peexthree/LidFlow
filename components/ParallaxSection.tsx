"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { useReducedMotion } from "framer-motion";
import { clsx } from "clsx";

export interface ParallaxLayer {
  speed: number;
  className?: string;
  content?: ReactNode;
}

export interface ParallaxSectionProps {
  layers?: ParallaxLayer[];
  children: ReactNode;
  className?: string;
}

export function ParallaxSection({ layers = [], children, className }: ParallaxSectionProps) {
  const containerRef = useRef<HTMLElement | null>(null);
  const layerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const prefersReducedMotion = useReducedMotion();

  layerRefs.current = layerRefs.current.slice(0, layers.length);

  useEffect(() => {
    if (prefersReducedMotion) {
      layerRefs.current.forEach((layer) => {
        if (layer) {
          layer.style.transform = "translate3d(0, 0, 0)";
        }
      });
      return;
    }

    let animationFrame: number | null = null;

    const updateLayers = () => {
      animationFrame = null;
      const container = containerRef.current;

      if (!container) {
        return;
      }

      const rect = container.getBoundingClientRect();
      const viewportHeight = window.innerHeight || 1;
      const progress = (viewportHeight - rect.top) / (viewportHeight + rect.height || 1);
      const clamped = Math.min(Math.max(progress, 0), 1);

      layerRefs.current.forEach((layer, index) => {
        const definition = layers[index];

        if (!layer || !definition) {
          return;
        }

        const offset = (clamped - 0.5) * 2 * definition.speed;
        layer.style.transform = `translate3d(0, ${offset}px, 0)`;
      });
    };

    const scheduleUpdate = () => {
      if (animationFrame !== null) {
        cancelAnimationFrame(animationFrame);
      }

      animationFrame = requestAnimationFrame(updateLayers);
    };

    scheduleUpdate();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);

    return () => {
      if (animationFrame !== null) {
        cancelAnimationFrame(animationFrame);
      }

      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
    };
  }, [layers, prefersReducedMotion]);

  return (
    <section ref={containerRef} className={clsx("relative overflow-hidden", className)}>
      <div aria-hidden className="absolute inset-0 -z-10">
        {layers.map((layer, index) => (
          <div
            key={index}
            ref={(node) => {
              layerRefs.current[index] = node;
            }}
            className={clsx("absolute inset-0 will-change-transform", layer.className)}
            style={{ transform: "translate3d(0, 0, 0)" }}
          >
            {layer.content}
          </div>
        ))}
      </div>
      <div className="relative z-10">{children}</div>
    </section>
  );
}