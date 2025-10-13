"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";

import { clsx } from "clsx";

interface NavigationItem {
  readonly href: string;
  readonly label: string;
}

const navigationItems: ReadonlyArray<NavigationItem> = [
  { href: "#portfolio", label: "Портфолио" },
  { href: "#pricing", label: "Цены" },
  { href: "#contact", label: "Контакты" },
] as const;

const MOBILE_BREAKPOINT = 768;

export function SiteHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = useCallback(() => {
    setIsMenuOpen((previous) => !previous);
  }, []);

  const closeMenu = useCallback(() => {
    setIsMenuOpen(false);
  }, []);

  useEffect(() => {
    // Сбрасываем мобильное меню при возврате на десктоп, чтобы избежать наложений.
    const mediaQuery = window.matchMedia(`(min-width: ${MOBILE_BREAKPOINT}px)`);

    const handleChange = (event: MediaQueryListEvent) => {
      if (event.matches) {
        setIsMenuOpen(false);
      }
    };

    if (typeof mediaQuery.addEventListener === "function") {
      mediaQuery.addEventListener("change", handleChange);
    } else {
      mediaQuery.addListener(handleChange);
    }

    return () => {
      if (typeof mediaQuery.removeEventListener === "function") {
        mediaQuery.removeEventListener("change", handleChange);
      } else {
        mediaQuery.removeListener(handleChange);
      }
    };
  }, []);

  useEffect(() => {
    // Блокируем прокрутку фона, когда открыт мобильный оверлей.
    document.body.classList.toggle("overflow-hidden", isMenuOpen);

    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [isMenuOpen]);

  const menuAriaLabel = useMemo(
    () => (isMenuOpen ? "Закрыть меню" : "Открыть меню"),
    [isMenuOpen]
  );

  return (
    <header className="sticky top-0 z-40 border-b border-subtle/70 glass-effect animate-fade-in-up">
      <div className="container flex flex-wrap items-center justify-between gap-x-4 gap-y-3 py-3 sm:py-4">
        <Link
          href="/"
          className="inline-flex items-center gap-3 rounded-full px-2.5 py-1.5 text-neutral-900 transition-colors duration-300 ease-figma-smooth hover:text-brand-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-300 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          aria-label="LidFlow — на главную"
          onClick={closeMenu}
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

        <nav className="hidden items-center gap-6 text-sm font-medium text-neutral-700 md:flex">
          {navigationItems.map((item) => (
            <a
              key={item.href}
              className="rounded-full px-3 py-1.5 transition-colors duration-300 ease-figma-smooth hover:text-brand-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-300 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              href={item.href}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <button
          type="button"
          onClick={toggleMenu}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-subtle bg-white/70 text-neutral-800 shadow-soft transition-colors duration-300 ease-figma-smooth hover:bg-white md:hidden"
          aria-expanded={isMenuOpen}
          aria-label={menuAriaLabel}
        >
          <span className="relative flex h-4 w-4 flex-col justify-between">
            <span
              className={clsx(
                "h-0.5 w-full rounded-full bg-current transition-transform duration-300",
                isMenuOpen ? "translate-y-1.5 rotate-45" : ""
              )}
            />
            <span
              className={clsx(
                "h-0.5 w-full rounded-full bg-current transition-opacity duration-300",
                isMenuOpen ? "opacity-0" : "opacity-100"
              )}
            />
            <span
              className={clsx(
                "h-0.5 w-full rounded-full bg-current transition-transform duration-300",
                isMenuOpen ? "-translate-y-1.5 -rotate-45" : ""
              )}
            />
          </span>
        </button>
      </div>

      <div
        className={clsx(
          "overflow-hidden border-t border-subtle/80 bg-white/90 text-neutral-900 transition-all duration-300 ease-figma-smooth md:hidden",
          isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <nav className="container flex flex-col gap-2 py-4">
          {navigationItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={closeMenu}
              className="rounded-xl px-4 py-3 text-base font-medium transition-colors duration-300 ease-figma-smooth hover:bg-brand-50"
            >
              {item.label}
            </a>
          ))}
          <Link
            href="#contact"
            onClick={closeMenu}
            className="mt-2 inline-flex items-center justify-center rounded-xl border border-brand-200 bg-brand-500 px-4 py-3 text-base font-semibold text-white shadow-soft transition-all duration-300 ease-figma-smooth hover:-translate-y-0.5 hover:bg-brand-400"
          >
            Оставить заявку
          </Link>
        </nav>
      </div>
    </header>
  );
}