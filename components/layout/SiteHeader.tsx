"use client";

import CardNav from "@/components/ui/CardNav";

export function SiteHeader() {
  const items = [
    {
      label: "Компания",
      bgColor: "#0D0716",
      textColor: "#fff",
      links: [
        { label: "О нас", href: "#about", ariaLabel: "О компании" },
        { label: "Контакты", href: "#contact", ariaLabel: "Контакты" }
      ]
    },
    {
      label: "Проекты",
      bgColor: "#170D27",
      textColor: "#fff",
      links: [
        { label: "Портфолио", href: "#portfolio", ariaLabel: "Избранные проекты" },
        { label: "Услуги", href: "#services", ariaLabel: "Наши услуги" }
      ]
    },
    {
      label: "Цены",
      bgColor: "#271E37",
      textColor: "#fff",
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
        baseColor="#0a0a0a"
        menuColor="#fff"
        buttonBgColor="#111"
        buttonTextColor="#fff"
        ease="circ.out"
      />
    </header>
  );
}
