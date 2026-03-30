import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";

import "./globals.css";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { TechBackground } from "@/components/ui/VisualEffects";

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
      <body className="flex min-h-screen flex-col bg-[#020304] text-slate-100 selection:bg-white/20">
        <SiteHeader />


        <TechBackground />


        <main className="flex-1 relative z-10">{children}</main>

        <footer className="relative z-20 border-t border-[#66FCF1]/30 bg-[#020304]/80 backdrop-blur-xl">
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#66FCF1]/50 to-transparent" />
          <div className="container flex flex-col sm:flex-row items-center justify-between gap-6 py-12 font-mono text-[10px] uppercase tracking-[0.2em] text-[#66FCF1]/60">
            <div className="flex items-center gap-4">
              <span className="flex h-2 w-2 rounded-none bg-[#66FCF1] animate-pulse drop-shadow-[0_0_8px_#66FCF1]" />
              <p>© {currentYear} LIDFLOW.OS. ВЫСОКОКОНВЕРСИОННЫЕ АКТИВЫ.</p>
            </div>

            <div className="flex items-center gap-6">
              <a
                href="https://t.me/peexthree"
                target="_blank"
                rel="noreferrer"
                className="group flex items-center gap-2 transition-all hover:text-[#66FCF1] hover:drop-shadow-[0_0_10px_rgba(102,252,241,0.5)]"
              >
                <span className="opacity-50 group-hover:opacity-100">&gt;</span>
                CONNECTION_TGM: @peexthree
              </a>
              <a
                href="mailto:linderop@yandex.ru"
                className="group flex items-center gap-2 transition-all hover:text-[#66FCF1] hover:drop-shadow-[0_0_10px_rgba(102,252,241,0.5)] hidden sm:flex"
              >
                <span className="opacity-50 group-hover:opacity-100">&gt;</span>
                SECURE_MAIL
              </a>
            </div>
          </div>
        </footer>
        <Analytics />
      </body>
    </html>
  );
}
