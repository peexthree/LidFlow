"use client";

import { useEffect, useState } from "react";
import CardNav from "@/components/ui/CardNav";

export function SiteHeader() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show navbar after 50px of scroll
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    // Trigger once on mount
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const items = [
    {
      label: "Компания",
      bgColor: "rgba(15, 23, 42, 0.4)", // slate-900 / 40% (glassmorphism)
      textColor: "#f8fafc", // slate-50
      links: [
        { label: "О нас", href: "#about", ariaLabel: "О компании" },
        { label: "Контакты", href: "#contact", ariaLabel: "Контакты" }
      ]
    },
    {
      label: "Проекты",
      bgColor: "rgba(30, 41, 59, 0.4)", // slate-800 / 40%
      textColor: "#f8fafc",
      links: [
        { label: "Портфолио", href: "#portfolio", ariaLabel: "Избранные проекты" },
        { label: "Услуги", href: "#services", ariaLabel: "Наши услуги" }
      ]
    },
    {
      label: "Цены",
      bgColor: "rgba(51, 65, 85, 0.4)", // slate-700 / 40%
      textColor: "#f8fafc",
      links: [
        { label: "Прайс", href: "#pricing", ariaLabel: "Прайс лист" },
        { label: "Оставить заявку", href: "#contact", ariaLabel: "Связаться с нами" }
      ]
    }
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-[100] transition-opacity duration-500 ease-in-out ${
        isScrolled ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      }`}
    >
      <CardNav
        logo="/logo.webp"
        logoAlt="LidFlow Логотип"
        items={items}
        baseColor="rgba(2, 6, 23, 0.6)" // slate-950 / 60%
        menuColor="#f8fafc" // slate-50
        buttonBgColor="#1F8CFF" // brand-500
        buttonTextColor="#f8fafc" // slate-50
        ease="circ.out"
      />
    </header>
  );
}
