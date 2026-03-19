import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";

import "./globals.css";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { FloatingOrbs } from "@/components/ui/VisualEffects";
import LetterGlitch from "@/components/ui/LetterGlitch";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://lidflow.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "LidFlow — Лендинги, которые приводят клиентов",
    template: "%s · LidFlow",
  },
  description:
    "Собираем продающие сайты на Next.js: сильный оффер, чистый код, анимации и подключённая аналитика.",
  openGraph: {
    title: "LidFlow — Лендинги под запуск рекламы",
    description:
      "Маркетинговый сайт под ключ: стратегия, дизайн, разработка и внедрение аналитики за 5 дней.",
    type: "website",
    locale: "ru_RU",
    url: siteUrl,
    siteName: "LidFlow",
    images: [
      {
        url: "/placeholder/n1.jpeg",
        width: 1200,
        height: 630,
        alt: "LidFlow — современный лендинг",
      },
      {
        url: "/logo.webp",
        width: 512,
        height: 512,
        alt: "Логотип LidFlow",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "LidFlow — Лендинги, которые приводят клиентов",
    description:
      "Современные лендинги на Next.js и React с аналитикой, оптимизацией и быстрой загрузкой.",
    images: ["/placeholder/n1.jpeg", "/logo.webp"],
  },
  icons: {
    icon: [{ url: "/logo.webp", type: "image/webp", sizes: "32x32" }],
  },
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const currentYear = new Date().getFullYear();

  return (
    <html lang="ru" className="h-full">
      <body className="flex min-h-screen flex-col bg-slate-950 text-slate-100 selection:bg-white/20">
        <SiteHeader />


        <FloatingOrbs />

        <div className="fixed inset-0 z-[0]">
          <LetterGlitch glitchSpeed={50} centerVignette={true} outerVignette={true} smooth={true} />
        </div>
        <main className="flex-1 relative z-10">{children}</main>

        <footer className="border-t border-white/5 bg-white/[0.02] backdrop-blur-md">
          <div className="container flex flex-col gap-4 py-14 text-sm text-slate-400">
            <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            <p>© {currentYear} LidFlow. Создаём лендинги, которые продают.</p>
            <p className="text-xs text-slate-500">
              Telegram:{" "}
              <a
                href="https://t.me/peexthree"
                target="_blank"
                rel="noreferrer"
                className="underline decoration-dotted underline-offset-4 transition-colors duration-300 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/20"
              >
                @peexthree
              </a>
            </p>
          </div>
        </footer>
        <Analytics />
      </body>
    </html>
  );
}
