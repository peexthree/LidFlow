"use client";

import { type ReactNode, useCallback, useEffect, useState } from "react";
import { clsx } from "clsx";

interface VideoIntroProps {
  children: ReactNode;
}

const FADE_OUT_DELAY = 800;
const INTRO_TIMEOUT = 20000;

/**
 * Показывает вступительный видеоролик и плавно открывает основной контент.
 * Fallback-таймер гарантирует, что сайт не зависнет, если видео не проиграется.
 */
export function VideoIntro({ children }: VideoIntroProps) {
  const [phase, setPhase] = useState<"intro" | "fading" | "hidden">("intro");

  const finishIntro = useCallback(() => {
    setPhase((currentPhase) =>
      currentPhase === "intro" ? "fading" : currentPhase,
    );
  }, []);

  useEffect(() => {
    if (phase !== "intro") {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      setPhase((currentPhase) =>
        currentPhase === "intro" ? "fading" : currentPhase,
      );
    }, INTRO_TIMEOUT);

    return () => window.clearTimeout(timeoutId);
  }, [phase]);

  useEffect(() => {
    if (phase !== "fading") {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      setPhase("hidden");
    }, FADE_OUT_DELAY);

    return () => window.clearTimeout(timeoutId);
  }, [phase]);

  const shouldRenderOverlay = phase !== "hidden";

  return (
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
          aria-hidden
          className={clsx(
            "fixed inset-0 z-50 flex items-center justify-center bg-black transition-opacity duration-700 ease-out",
            phase === "fading" ? "pointer-events-none opacity-0" : "pointer-events-auto opacity-100",
          )}
        >
          <video
            autoPlay
            muted
            playsInline
            preload="auto"
            className="h-full w-full object-cover"
            onEnded={finishIntro}
            onError={finishIntro}
          >
            <source src="/video.mp4" type="video/mp4" />
          </video>
        </div>
      ) : null}
    </div>
  );
}