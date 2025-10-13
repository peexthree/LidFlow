"use client";

import Image from "next/image";
import { type ReactNode, useCallback, useEffect, useState } from "react";
import { clsx } from "clsx";
import { MotionProvider } from "@/components/MotionProvider";
interface VideoIntroProps {
  children: ReactNode;
}

const FADE_OUT_DELAY = 800;
const INTRO_DISPLAY_DURATION = 3600;
const SAFETY_TIMEOUT = 20000;

/**
 * Показывает вступительную заставку и плавно открывает основной контент.
 * Fallback-таймер гарантирует, что сайт не зависнет, если анимация не завершится.
 */
export function VideoIntro({ children }: VideoIntroProps) {
  const [phase, setPhase] = useState<"intro" | "fading" | "hidden">("intro");

  const startFadeOut = useCallback(() => {
    setPhase((currentPhase) =>
      currentPhase === "intro" ? "fading" : currentPhase,
    );
  }, []);

  useEffect(() => {
    if (phase !== "intro") {
      return;
    }

    const introTimeoutId = window.setTimeout(startFadeOut, INTRO_DISPLAY_DURATION);
    const safetyTimeoutId = window.setTimeout(startFadeOut, SAFETY_TIMEOUT);

    return () => {
      window.clearTimeout(introTimeoutId);
      window.clearTimeout(safetyTimeoutId);
    };
  }, [phase, startFadeOut]);

  useEffect(() => {
    if (phase !== "fading") {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      setPhase("hidden");
    }, FADE_OUT_DELAY);

    return () => window.clearTimeout(timeoutId);
  }, [phase]);

  useEffect(() => {
    if (phase === "hidden") {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" || event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        startFadeOut();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [phase, startFadeOut]);

  const shouldRenderOverlay = phase !== "hidden";

  return (
    // 🧩 Motion System: оборачиваем контент, чтобы анимации делили единые настройки
    <MotionProvider>
      <div className="relative flex min-h-screen flex-1 flex-col">
        <div
          className={clsx(
            "flex min-h-screen flex-1 flex-col filter transition-[filter] duration-700 ease-in-out",
            phase === "intro" ? "blur-2xl" : "blur-0",
          )}
        >
          {children}
        </div>

        {shouldRenderOverlay ? (
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Заставка LidFlow"
            className={clsx(
              "fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-white/95 backdrop-blur-2xl transition-opacity duration-700 ease-out",
              phase === "fading"
                ? "pointer-events-none opacity-0"
                : "pointer-events-auto opacity-100",
            )}
          >
            <div className="relative flex h-full w-full items-center justify-center">
              <div className="absolute inset-0 bg-gradient-to-br from-white via-white/90 to-brand-50" />
              <div className="absolute inset-0 opacity-80 [background:radial-gradient(circle_at_20%_20%,rgba(59,130,246,0.15),transparent_55%)]" />
              <div className="absolute inset-0 opacity-70 [background:radial-gradient(circle_at_75%_70%,rgba(236,72,153,0.16),transparent_60%)]" />
              <div className="absolute inset-0 animate-[gradientShift_18s_ease_infinite] opacity-60 [background:radial-gradient(circle_at_50%_30%,rgba(147,51,234,0.12),transparent_55%)]" />

              <div className="relative flex flex-col items-center gap-8 px-6 text-center">
                <div className="relative flex h-36 w-36 items-center justify-center">
                  <span className="absolute inset-0 rounded-[32px] border border-white/60 bg-gradient-to-br from-brand-500/15 via-violet-500/10 to-rose-500/15 blur" />
                  <span className="intro-orbit absolute -inset-6 rounded-full border border-white/40" />
                  <span className="absolute -inset-14 rounded-full bg-gradient-to-br from-brand-500/10 via-sky-400/5 to-rose-500/10 blur-3xl" />
                  <span aria-hidden className="intro-spinner" />
                  <Image
                    src="/logo.webp"
                    alt="Логотип LidFlow"
                    width={120}
                    height={120}
                    priority
                    className="intro-glow relative z-10 h-24 w-24 rounded-3xl border border-white/80 bg-white/95 p-4 shadow-lg"
                  />
                </div>

                <div className="space-y-3">
                  <p className="animate-fade-in-up text-3xl font-semibold tracking-tight text-neutral-900">
                    Лидогенерация нового уровня
                  </p>
                  <p className="animate-fade-in-up text-sm text-neutral-600 [animation-delay:160ms]">
                    Разгоняем ваши продажи креативными лендингами и умным маркетингом
                  </p>
                </div>

                <button
                  type="button"
                  onClick={startFadeOut}
                  className="animate-fade-in-up rounded-full border border-neutral-200/80 bg-white/90 px-6 py-2 text-sm font-medium text-neutral-700 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-400 hover:text-brand-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-300 focus-visible:ring-offset-2 focus-visible:ring-offset-white [animation-delay:260ms]"
                >
                  Пропустить заставку
                </button>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </MotionProvider>
  );
}