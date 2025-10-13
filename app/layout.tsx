import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Analytics } from "@vercel/analytics/react";

import "./globals.css";
import { FloatingOrbs } from "@/components/ui/VisualEffects";
import { VideoIntro } from "@/components/VideoIntro";
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
        url: "/placeholder/1.jpg",
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
    images: ["/placeholder/1.jpg", "/logo.webp"],
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
      <body className="flex min-h-screen flex-col bg-background text-foreground">

        <VideoIntro>
          <>
            <header className="sticky top-0 z-40 border-b border-subtle/70 glass-effect animate-fade-in-up">
              <div className="container flex min-h-[4.5rem] items-center justify-between gap-6 py-4">
                <Link
                  href="/"
                  className="inline-flex items-center gap-3 rounded-full px-3 py-1.5 text-neutral-900 transition-colors duration-300 ease-figma-smooth hover:text-brand-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-300 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                  aria-label="LidFlow — на главную"
                >
                  <Image
                    src="/logo.webp"
                    alt="Логотип LidFlow"
                    width={36}
                    height={36}
                    className="h-9 w-9 rounded-2xl border border-subtle bg-white/90 p-1 shadow-soft"
                    sizes="36px"
                    priority
                  />
                  <span className="text-lg font-semibold tracking-tight">LidFlow</span>
                </Link>
                <nav className="flex items-center gap-8 text-sm font-medium text-neutral-700">
                  <a
                    className="rounded-full px-3 py-1.5 text-neutral-700 transition-colors duration-300 ease-figma-smooth hover:text-brand-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-300 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                    href="#portfolio"
                  >
                    Портфолио
                  </a>
                  <a
                    className="rounded-full px-3 py-1.5 text-neutral-700 transition-colors duration-300 ease-figma-smooth hover:text-brand-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-300 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                    href="#pricing"
                  >
                    Цены
                  </a>
                  <a
                    className="rounded-full px-3 py-1.5 text-neutral-700 transition-colors duration-300 ease-figma-smooth hover:text-brand-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-300 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                    href="#contact"
                  >
                    Контакты
                  </a>
                </nav>
              </div>
            </header>
            <FloatingOrbs />

            <main className="flex-1">{children}</main>
            <footer className="border-t border-subtle glass-effect">
              <div className="container flex flex-col gap-4 py-14 text-sm text-neutral-500">
                <div className="h-px bg-gradient-to-r from-transparent via-border-subtle/80 to-transparent" />
                <p>© {currentYear} LidFlow. Создаём лендинги, которые продают.</p>
                <p className="text-xs text-neutral-400">
                  Telegram:{" "}
                  <a
                    href="https://t.me/your_username"
                    target="_blank"
                    rel="noreferrer"
                    className="underline decoration-dotted underline-offset-4 transition-colors duration-300 ease-figma-smooth hover:text-brand-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-300 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                  >
                    @your_username
                  </a>
                </p>
              </div>
            </footer>
            <Analytics />
          </>
        </VideoIntro>

      </body>
    </html>
  );
}