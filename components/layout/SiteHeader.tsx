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
      label: "Архитектура & AI",
      bgColor: "rgba(2, 3, 4, 0.8)", // Эйдос-фон
      textColor: "#66FCF1",
      links: [
        { label: "Автономные системы", href: "#services", ariaLabel: "Автономные системы продаж" },
        { label: "Умные TWA", href: "#services", ariaLabel: "TWA приложения" },
        { label: "Интеграция ИИ", href: "#services", ariaLabel: "Интеграция нейросетей" }
      ]
    },
    {
      label: "Визуал & Motion",
      bgColor: "rgba(15, 23, 42, 0.8)",
      textColor: "#f8fafc",
      links: [
        { label: "Генеративный арт", href: "#services", ariaLabel: "Генеративный арт" },
        { label: "Motion & UI", href: "#services", ariaLabel: "Анимированные интерфейсы" },
      ]
    },
    {
      label: "GameDev & Лор",
      bgColor: "rgba(88, 28, 135, 0.6)", // Пурпурный для лора
      textColor: "#f8fafc",
      links: [
        { label: "Хроники Эйдоса", href: "https://t.me/Eidos_Interface_bot", ariaLabel: "Лор" },
        { label: "Геймдизайн", href: "#portfolio", ariaLabel: "Геймдизайн" },
      ]
    },
    {
      label: "Арсенал",
      bgColor: "rgba(2, 6, 23, 0.8)",
      textColor: "#f8fafc",
      links: [
        { label: "Кейсы", href: "#portfolio", ariaLabel: "Кейсы" },
        { label: "Цены", href: "#pricing", ariaLabel: "Цены" },
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
        baseColor="rgba(2, 3, 4, 0.85)" // slate-950 / 85%
        menuColor="#f8fafc" // slate-50
        buttonBgColor="#66FCF1" // Эйдос-циан
        buttonTextColor="#020304" // Черный текст на кнопке
        ease="circ.out"
      />
    </header>
  );
}
