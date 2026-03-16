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
      // 🧩 Design Tokens: Developer Aesthetic (Anthracite/Slate)
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
        slate: {
          50: "#f8fafc",
          100: "#f1f5f9",
          200: "#e2e8f0",
          300: "#cbd5e1",
          400: "#94a3b8",
          500: "#64748b",
          600: "#475569",
          700: "#334155",
          800: "#1e293b",
          900: "#0f172a",
          950: "#020617",
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
        sans: ["'Inter Variable'", "Inter", "system-ui", "sans-serif"],
        display: ["'Inter Variable'", "Inter", "system-ui", "sans-serif"],
        mono: ["'Geist Mono Variable'", "'JetBrains Mono'", "monospace"],
      },
      fontSize: {
        "display-2xl": ["clamp(3.5rem, 6vw, 4.75rem)", { lineHeight: "1.04", letterSpacing: "-0.04em" }],
        "display-xl": ["clamp(3rem, 5vw, 4rem)", { lineHeight: "1.05", letterSpacing: "-0.035em" }],
        "display-lg": ["clamp(2.5rem, 4vw, 3.5rem)", { lineHeight: "1.08", letterSpacing: "-0.03em" }],
        "display-md": ["clamp(2.125rem, 3vw, 3rem)", { lineHeight: "1.1", letterSpacing: "-0.025em" }],
        "display-sm": ["clamp(1.875rem, 2.4vw, 2.5rem)", { lineHeight: "1.12", letterSpacing: "-0.02em" }],
        "body-lg": ["clamp(1.125rem, 1.6vw, 1.3125rem)", { lineHeight: "1.65" }],
        "body-md": ["clamp(1rem, 1.4vw, 1.125rem)", { lineHeight: "1.7" }],
        "body-sm": ["clamp(0.9375rem, 1.2vw, 1rem)", { lineHeight: "1.65" }],
        "body-xs": ["0.8125rem", { lineHeight: "1.6", letterSpacing: "0.02em" }],
      },
      spacing: {
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
      boxShadow: {
        soft: "0 10px 26px rgba(0,0,0,0.4), 0 28px 60px rgba(0,0,0,0.6)",
        floating: "0 14px 35px rgba(0,0,0,0.5), 0 38px 90px rgba(0,0,0,0.7)",
      },
      maxWidth: {
        measure: "60ch",
      },
      backgroundImage: {
        "radial-fade": "radial-gradient(circle at 20% 20%, rgba(255,255,255,0.05), transparent 60%)",
        "radial-fade-strong": "radial-gradient(circle at 80% 50%, rgba(255,255,255,0.08), transparent 65%)",
      },
      transitionTimingFunction: {
        "figma-smooth": "cubic-bezier(0.22, 1, 0.36, 1)",
      },
      keyframes: {
        'infinite-scroll': {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-100%)' },
        },

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
        'infinite-scroll': 'infinite-scroll 45s linear infinite',

        "fade-up": "fade-up 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards",
        "scale-in": "scale-in 0.7s cubic-bezier(0.22, 1, 0.36, 1) forwards",
        shimmer: "shimmer 2.2s linear infinite",
      },
      borderColor: {
        subtle: "hsl(var(--border-subtle))",
      },
    },
  },
  plugins: [animate],
} satisfies Config;

export default config;
