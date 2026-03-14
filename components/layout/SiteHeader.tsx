"use client";

import CardNav from "@/components/ui/CardNav";

export function SiteHeader() {
  const items = [
    {
      label: "Компания",
      bgColor: "#0f172a", // slate-900
      textColor: "#f8fafc", // slate-50
      links: [
        { label: "О нас", href: "#about", ariaLabel: "О компании" },
        { label: "Контакты", href: "#contact", ariaLabel: "Контакты" }
      ]
    },
    {
      label: "Проекты",
      bgColor: "#1e293b", // slate-800
      textColor: "#f8fafc",
      links: [
        { label: "Портфолио", href: "#portfolio", ariaLabel: "Избранные проекты" },
        { label: "Услуги", href: "#services", ariaLabel: "Наши услуги" }
      ]
    },
    {
      label: "Цены",
      bgColor: "#334155", // slate-700
      textColor: "#f8fafc",
      links: [
        { label: "Прайс", href: "#pricing", ariaLabel: "Прайс лист" },
        { label: "Оставить заявку", href: "#contact", ariaLabel: "Связаться с нами" }
      ]
    }
  ];

  return (
    <header className="relative z-50">
      <CardNav
        logo="/logo.webp"
        logoAlt="LidFlow Логотип"
        items={items}
        baseColor="#020617" // slate-950
        menuColor="#f8fafc" // slate-50
        buttonBgColor="#1F8CFF" // brand-500
        buttonTextColor="#f8fafc" // slate-50
        ease="circ.out"
      />
    </header>
  );
}
