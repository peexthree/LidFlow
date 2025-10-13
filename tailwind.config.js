import type { Config } from "tailwindcss";
import animate from "tailwindcss-animate";

const config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./sections/**/*.{ts,tsx}",
    "./utils/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      // 🧩 Design Tokens: унифицированная палитра и типографика под Figma-like эстетику
      colors: {
        brand: {
          50: "#ECF7FF",
          100: "#D8EDFF",
          200: "#AEDDFF",
          300: "#78C8FF",
          400: "#41AEFF",
          500: "#1F8CFF",
          600: "#136FE0",
          700: "#1258B5",
          800: "#10458C",
          900: "#0A2D5B",
          DEFAULT: "#1F8CFF",
        },
        charcoal: {
          50: "#F8FAFC",
          100: "#EEF2F7",
          200: "#D9E0EB",
          300: "#B6C0D1",
          400: "#8995AA",
          500: "#64708A",
          600: "#485068",
          700: "#31374A",
          800: "#1F2333",
          900: "#0F1220",
        },
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        "border-subtle": "hsl(var(--border-subtle))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          1: "hsl(var(--chart-1))",
          2: "hsl(var(--chart-2))",
          3: "hsl(var(--chart-3))",
          4: "hsl(var(--chart-4))",
          5: "hsl(var(--chart-5))",
        },
      },
      fontFamily: {
        // 🧩 Typography: плавное масштабирование гарнитуры по всему проекту
        sans: ["'Inter Variable'", "Inter", "system-ui", "sans-serif"],
        display: ["'Satoshi Variable'", "Inter", "system-ui", "sans-serif"],
      },
      fontSize: {
        // 🧩 Responsive Type Scale: clamp обеспечивает читаемость на всех устройствах
        "display-2xl": ["clamp(3.5rem, 6vw, 4.75rem)", { lineHeight: '1.04', letterSpacing: "-0.04em" }],
        "display-xl": ["clamp(3rem, 5vw, 4rem)", { lineHeight: '1.05', letterSpacing: "-0.035em" }],
        "display-lg": ["clamp(2.5rem, 4vw, 3.5rem)", { lineHeight: '1.08', letterSpacing: "-0.03em" }],
        "display-md": ["clamp(2.125rem, 3vw, 3rem)", { lineHeight: '1.1', letterSpacing: "-0.025em" }],
        "display-sm": ["clamp(1.875rem, 2.4vw, 2.5rem)", { lineHeight: '1.12', letterSpacing: "-0.02em" }],
        "body-lg": ["clamp(1.125rem, 1.6vw, 1.3125rem)", { lineHeight: '1.65' }],
        "body-md": ["clamp(1rem, 1.4vw, 1.125rem)", { lineHeight: '1.7' }],
        "body-sm": ["clamp(0.9375rem, 1.2vw, 1rem)", { lineHeight: '1.65' }],
        "body-xs": ["0.8125rem", { lineHeight: '1.6', letterSpacing: "0.02em" }],
      },
      spacing: {
        // 🧩 Spacing Rhythm: шаг в 4px для выравнивания отступов
        18: "4.5rem",
        22: "5.5rem",
        26: "6.5rem",
        30: "7.5rem",
      },
      borderRadius: {
        xl2: "1.25rem",
        "3xl": "1.75rem",
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      // 🧩 Depth Tokens: многослойная глубина для эффектов плавания
      soft: "0 12px 28px rgba(15, 23, 42, 0.08), 0 32px 70px rgba(15, 23, 42, 0.1)",
      floating: "0 16px 38px rgba(15, 23, 42, 0.14), 0 45px 105px rgba(15, 23, 42, 0.2)",
    },
    maxWidth: {
      // 🧩 Content Grid: предсказуемая сетка контейнеров
      measure: "60ch",
    },
    backgroundImage: {
      // 🧩 Gradient Tokens: переиспользуемые фоновые эффекты
      "radial-fade": "radial-gradient(circle at 20% 20%, rgba(31,140,255,0.12), transparent 60%)",
      "radial-fade-strong": "radial-gradient(circle at 80% 50%, rgba(168,85,247,0.2), transparent 65%)",
    },
    transitionTimingFunction: {
      // 🧩 Motion Curve: фирменное замедление
      "figma-smooth": "cubic-bezier(0.22, 1, 0.36, 1)",
    },
    borderColor: {
      subtle: "hsl(var(--border-subtle))",
    },
    keyframes: {
      // 🧩 Motion Library: базовые ключевые кадры для переиспользования
      "fade-up": {
        "0%": { opacity: "0", transform: "translateY(20px)" },
        "100%": { opacity: "1", transform: "translateY(0)" },
      },
      "scale-in": {
        "0%": { opacity: "0", transform: "scale(0.96)" },
        "100%": { opacity: "1", transform: "scale(1)" },
      },
      shimmer: {
        "0%": { backgroundPosition: "-200% center" },
        "100%": { backgroundPosition: "200% center" },
      },
    },
    animation: {
      // 🧩 Motion Utility: быстрые классы для микровзаимодействий
      "fade-up": "fade-up 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards",
      "scale-in": "scale-in 0.7s cubic-bezier(0.22, 1, 0.36, 1) forwards",
      shimmer: "shimmer 2.2s linear infinite",
    },
  },
},
  plugins: [animate],
} satisfies Config;

export default config;