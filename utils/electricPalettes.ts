import type { CSSProperties } from "react";

/**
 * Словарь палитр для электрических рамок.
 * Вынесен в отдельный модуль, чтобы переиспользовать в разных секциях.
 */
export const electricBorderPalettes = {
  cyan: {
    "--electric-color-1": "rgba(14,165,233,0.28)",
    "--electric-color-2": "rgba(79,70,229,0.55)",
    "--electric-color-3": "rgba(236,72,153,0.45)",
    "--electric-glow-color": "rgba(34,211,238,0.35)",
  },
  blue: {
    "--electric-color-1": "rgba(59,130,246,0.32)",
    "--electric-color-2": "rgba(14,165,233,0.5)",
    "--electric-color-3": "rgba(147,51,234,0.48)",
    "--electric-glow-color": "rgba(59,130,246,0.32)",
  },
  violet: {
    "--electric-color-1": "rgba(168,85,247,0.38)",
    "--electric-color-2": "rgba(236,72,153,0.48)",
    "--electric-color-3": "rgba(59,130,246,0.35)",
    "--electric-glow-color": "rgba(168,85,247,0.38)",
  },
  amber: {
    "--electric-color-1": "rgba(251,191,36,0.4)",
    "--electric-color-2": "rgba(236,72,153,0.38)",
    "--electric-color-3": "rgba(14,165,233,0.35)",
    "--electric-glow-color": "rgba(251,191,36,0.35)",
  },
  green: {
    "--electric-color-1": "hsla(162, 83%, 62%, 0.40)",
    "--electric-color-2": "rgba(12, 191, 246, 0.38)",
    "--electric-color-3": "rgba(34, 213, 222, 0.35)",
    "--electric-glow-color": "rgba(222, 29, 203, 0.35)",
  },
} as const satisfies Record<string, Record<`--${string}`, string>>;

export type ElectricPaletteKey = keyof typeof electricBorderPalettes;

export const paletteStyle = (palette: ElectricPaletteKey): CSSProperties =>
  electricBorderPalettes[palette] as CSSProperties;