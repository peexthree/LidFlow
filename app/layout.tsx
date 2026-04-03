import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";

import "./globals.css";
import { Plus_Jakarta_Sans } from "next/font/google";

const plusJakartaSans = Plus_Jakarta_Sans({ subsets: ["latin", "cyrillic-ext"], variable: "--font-plus-jakarta-sans" });
import { SiteHeader } from "@/components/layout/SiteHeader";


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
      <body className={`flex min-h-screen flex-col bg-[#e8eaf0] text-slate-800 ${plusJakartaSans.variable} font-sans`}>
        <SiteHeader />





        <main className="flex-1 relative z-10">{children}</main>

        <footer className="relative z-20 border-t border-slate-300 bg-[#e8eaf0]/80 backdrop-blur-xl">

          <div className="container flex flex-col sm:flex-row items-center justify-between gap-6 py-12 font-mono text-[10px] uppercase tracking-[0.2em] text-slate-500">
            <div className="flex items-center gap-4">
              <span className="flex h-2 w-2 rounded-full bg-brand-400 animate-pulse" />
              <p>© {currentYear} LIDFLOW.OS. ВЫСОКОКОНВЕРСИОННЫЕ АКТИВЫ.</p>
            </div>

            <div className="flex items-center gap-6">
              <a
                href="https://t.me/peexthree"
                target="_blank"
                rel="noreferrer"
                className="group flex items-center gap-2 transition-all hover:text-brand-400"
              >
                <span className="opacity-50 group-hover:opacity-100">&gt;</span>
                CONNECTION_TGM: @peexthree
              </a>
              <a
                href="mailto:linderop@yandex.ru"
                className="group flex items-center gap-2 transition-all hover:text-brand-400 hidden sm:flex"
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
