import type { Metadata } from "next";
import Link from "next/link";
import { Analytics } from "@vercel/analytics/react";

import "./globals.css";

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
    images: [
      {
        url: "/placeholder/1.jpg",
        width: 1200,
        height: 630,
        alt: "LidFlow — современный лендинг",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "LidFlow — Лендинги, которые приводят клиентов",
    description:
      "Современные лендинги на Next.js и React с аналитикой, оптимизацией и быстрой загрузкой.",
    images: ["/placeholder/1.jpg"],
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
      <body className="flex min-h-screen flex-col bg-background text-foreground">
        <header className="sticky top-0 z-40 border-b border-white/10 bg-white/80 backdrop-blur">
          <div className="container flex h-16 items-center justify-between">
            <Link
              href="/"
              className="text-lg font-semibold tracking-tight text-neutral-900 transition-colors hover:text-brand-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-300 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              LidFlow
            </Link>
            <nav className="flex items-center gap-6 text-sm font-medium text-neutral-700">
              <a
                className="rounded-full px-2 py-1 text-neutral-700 transition hover:text-brand-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-300 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                href="#portfolio"
              >
                Портфолио
              </a>
              <a
                className="rounded-full px-2 py-1 text-neutral-700 transition hover:text-brand-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-300 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                href="#pricing"
              >
                Цены
              </a>
              <a
                className="rounded-full px-2 py-1 text-neutral-700 transition hover:text-brand-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-300 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                href="#contact"
              >
                Контакты
              </a>
            </nav>
          </div>
        </header>
        <main className="flex-1">{children}</main>
        <footer className="border-t border-neutral-200 bg-white/80">
          <div className="container flex flex-col gap-3 py-10 text-sm text-neutral-500">
            <div className="h-px bg-gradient-to-r from-transparent via-neutral-300/70 to-transparent" />
            <p>© {currentYear} LidFlow. Создаём лендинги, которые продают.</p>
            <p className="text-xs text-neutral-400">
              Telegram:{" "}
              <a
                href="https://t.me/your_username"
                target="_blank"
                rel="noreferrer"
                className="underline decoration-dotted underline-offset-4 hover:text-brand-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-300 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                @your_username
              </a>
            </p>
          </div>
        </footer>
        <Analytics />
      </body>
    </html>
  );
}