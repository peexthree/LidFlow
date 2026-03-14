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
  const [isScrolled, setIsScrolled] = useState(false);

  const toggleMenu = useCallback(() => {
    setIsMenuOpen((previous) => !previous);
  }, []);

  const closeMenu = useCallback(() => {
    setIsMenuOpen(false);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
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
    <header
      className={clsx(
        "fixed top-0 z-50 w-full transition-all duration-300 ease-figma-smooth",
        isScrolled
          ? "border-b border-white/5 bg-[#020617]/70 backdrop-blur-xl py-3 shadow-[0_4px_30px_rgba(0,0,0,0.1)]"
          : "bg-transparent py-5"
      )}
    >
      <div className="container flex flex-wrap items-center justify-between gap-x-4">
        <Link
          href="/"
          className="group inline-flex items-center gap-3 rounded-full text-slate-100 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
          aria-label="LidFlow — на главную"
          onClick={closeMenu}
        >
          <div className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl border border-white/10 bg-white/5 shadow-soft transition-transform group-hover:scale-105">
            <Image
              src="/logo.webp"
              alt="Логотип LidFlow"
              width={32}
              height={32}
              className="h-8 w-8 object-contain"
              sizes="32px"
              priority
            />
          </div>
          <span className="font-mono text-lg font-semibold tracking-tight text-white/90">
            LidFlow
          </span>
        </Link>

        <nav className="hidden items-center gap-1 rounded-full border border-white/5 bg-white/[0.03] px-2 py-1 backdrop-blur-md md:flex">
          {navigationItems.map((item) => (
            <a
              key={item.href}
              className="rounded-full px-4 py-2 text-sm font-medium text-slate-300 transition-colors duration-300 hover:bg-white/10 hover:text-white"
              href={item.href}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:block">
          <Link
            href="#contact"
            className="inline-flex h-10 items-center justify-center rounded-full border border-white/10 bg-white/5 px-6 text-sm font-medium text-white shadow-[0_0_20px_rgba(255,255,255,0.05)] backdrop-blur-md transition-all duration-300 hover:bg-white/10 hover:shadow-[0_0_30px_rgba(255,255,255,0.1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/20"
          >
            Связаться
          </Link>
        </div>

        <button
          type="button"
          onClick={toggleMenu}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-300 backdrop-blur-md transition-colors hover:bg-white/10 hover:text-white md:hidden"
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
          "absolute left-0 top-full w-full overflow-hidden border-b border-white/5 bg-[#020617]/95 backdrop-blur-2xl transition-all duration-300 ease-in-out md:hidden",
          isMenuOpen ? "max-h-[400px] border-t opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <nav className="container flex flex-col gap-2 py-6">
          {navigationItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={closeMenu}
              className="rounded-xl px-4 py-3 text-base font-medium text-slate-300 transition-colors hover:bg-white/5 hover:text-white"
            >
              {item.label}
            </a>
          ))}
          <Link
            href="#contact"
            onClick={closeMenu}
            className="mt-4 flex h-12 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-base font-medium text-white transition-colors hover:bg-white/10"
          >
            Оставить заявку
          </Link>
        </nav>
      </div>
    </header>
  );
}
