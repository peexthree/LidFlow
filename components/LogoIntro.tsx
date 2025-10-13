"use client";

import { type ReactNode, useCallback, useEffect, useState } from "react";
import Image from "next/image"; // Импортируем компонент Image

interface LogoIntroProps {
  children: ReactNode;
}

// ⏱️ Параметры анимации и задержки
const FADE_OUT_DELAY = 800; // Длительность CSS-перехода для исчезновения
const INTRO_DURATION = 6500; // Длительность показа анимации (например, 3.5 секунды)

/**
 * Показывает анимированный логотип (прелоадер) и плавно открывает основной контент.
 * Использует CSS-анимации вместо видео для максимальной скорости.
 */
export function LogoIntro({ children }: LogoIntroProps) {
  // Состояния: 'intro' (показ), 'fading' (исчезновение), 'hidden' (скрыт)
  const [phase, setPhase] = useState<"intro" | "fading" | "hidden">("intro");

  // Функция, которая начинает фазу "fading"
  const startFadeOut = useCallback(() => {
    setPhase((currentPhase) =>
      currentPhase === "intro" ? "fading" : currentPhase,
    );
  }, []);

  // 1. useEffect для запуска исчезновения через INTRO_DURATION
  useEffect(() => {
    if (phase !== "intro") {
      return;
    }

    // Устанавливаем таймер на INTRO_DURATION (3.5с), после чего запустится startFadeOut
    const timeoutId = window.setTimeout(startFadeOut, INTRO_DURATION);

    return () => window.clearTimeout(timeoutId);
  }, [phase, startFadeOut]);

  // 2. useEffect для завершения (скрытия) после FADE_OUT_DELAY
  useEffect(() => {
    if (phase !== "fading") {
      return;
    }

    // Ждем, пока завершится CSS-переход исчезновения (FADE_OUT_DELAY)
    const timeoutId = window.setTimeout(() => {
      setPhase("hidden");
    }, FADE_OUT_DELAY);

    return () => window.clearTimeout(timeoutId);
  }, [phase]);

  const shouldRenderOverlay = phase !== "hidden";

  return (
    <div className="relative flex min-h-screen flex-1 flex-col">
      {/* 🏞️ Основной контент - фон размывается во время интро */}
      <div
        className={`flex min-h-screen flex-1 flex-col transition-[filter] duration-700 ease-in-out ${phase === "intro" ? "blur-sm" : "blur-0" // Сделаем размытие мягче
          }`}
      >
        {children}
      </div>

      {/* 💡 Оверлей с логотипом-анимацией */}
      {shouldRenderOverlay ? (
        <div
          aria-hidden
          className={`fixed inset-0 z-[9999] flex items-center justify-center bg-background transition-opacity duration-700 ease-out ${phase === "fading"
              ? "pointer-events-none opacity-0"
              : "pointer-events-auto opacity-100"
            }`}
        >
          <div className="logo-loader">
            {/* Внешние элементы создают ощущение вращения и прогресса загрузки */}
            <span aria-hidden className="logo-loader__orbit" />
            <span aria-hidden className="logo-loader__trail" />
            <span aria-hidden className="logo-loader__dot" />
            <Image
              src="/logo.webp" // Используем путь из публичной директории Next.js
              alt="Логотип компании"
              width={180}
              height={180}
              className="logo-loader__image"
              priority // Загружаем логотип как можно раньше, чтобы анимация не задерживалась
            />
          </div>
        </div>
      ) : null}
    </div>
  );
}