"use client";

import { useEffect, useState } from "react";
import { MathUtils } from "three";

export type ScrollRotationOptions = {
  /** Максимальная высота скролла (в пикселях), соответствующая максимальному углу. */
  maxScroll?: number;
  /** Максимальный угол поворота по оси Y в градусах. */
  maxRotationDeg?: number;
};

const DEFAULT_OPTIONS: Required<ScrollRotationOptions> = {
  maxScroll: 1200,
  maxRotationDeg: 15,
};

/**
 * Преобразует текущее положение вертикального скролла в угол поворота по оси Y.
 * Значение ограничено диапазоном [0, maxRotationDeg] и возвращается в радианах
 * для прямого использования в Three.js / R3F.
 */
export function useScrollRotation(
  options: ScrollRotationOptions = DEFAULT_OPTIONS,
): number {
  const { maxScroll, maxRotationDeg } = { ...DEFAULT_OPTIONS, ...options };
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    if (typeof window === "undefined") {
      return undefined;
    }

    const handleScroll = () => {
      const progress = Math.min(window.scrollY / maxScroll, 1);
      const nextRotation = MathUtils.degToRad(progress * maxRotationDeg);

      setRotation((current) =>
        Math.abs(current - nextRotation) > 0.0005 ? nextRotation : current,
      );
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [maxRotationDeg, maxScroll]);

  return rotation;
}