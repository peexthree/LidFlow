"use client";

export const dynamic = "force-dynamic";

import Image from "next/image";
import type { ReactNode } from "react";

import { ContactForm } from "@/components/ContactForm";

interface SectionProps {
  id?: string;
  className?: string;
  children: ReactNode;
}

function Section({ id, className = "", children }: SectionProps) {
  return (
    <section id={id} className={`container space-y-10 py-20 ${className}`}>
      {children}
    </section>
  );
}

function Pill({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-neutral-200 px-3 py-1 text-sm text-neutral-600">
      {children}
    </span>
  );
}

const heroPills = [
  "Next.js · React · TypeScript · Tailwind",
  "Запуск от 3–5 дней",
  "Vercel · HTTPS · Аналитика",
] as const;

const benefits = [
  {
    title: "Лидогенерация",
    description: "Структура под рекламу: оффер, доверие, UTM и цели в аналитике.",
  },
  {
    title: "Скорость",
    description: "Соберу и выведу в продакшн за 3–5 дней на Vercel с проверками.",
  },
  {
    title: "Чистый код",
    description: "React + TS + Tailwind, компоненты легко расширять и переиспользовать.",
  },
] as const;

interface ProjectCard {
  title: string;
  description: string;
  tag: string;
  image: string;
  linkLabel: string;
  href?: string;
}

const projects = [
  {
    title: "Akulenok — сайт-визитка",
    description: "Чистый минималистичный лендинг с акцентом на конверсию.",
    tag: "Landing · Бренд",
    image: "/placeholder/1.jpg",
    href: "https://akulenok-tmz.ru/",
    linkLabel: "Смотреть сайт",
  },
  {
    title: "Лендинг услуги",
    description: "Сильный оффер, секция кейсов и CTA на заявку.",
    tag: "Leadgen · Промо",
    image: "/placeholder/2.jpg",
    linkLabel: "Ссылка по запросу",
  },
  {
    title: "Лендинг под трафик",
    description: "Структура под рекламные кампании и интеграцию аналитики.",
    tag: "B2B · Услуги",
    image: "/placeholder/3.jpg",
    linkLabel: "Ссылка по запросу",
  },
] satisfies ReadonlyArray<ProjectCard>;

const processSteps = [
  { title: "Бриф", description: "Цели, аудитория, оффер и структура." },
  { title: "Дизайн", description: "Современный UI «как в Figma», но сразу в коде." },
  { title: "Запуск", description: "Домен, хостинг Vercel, SSL, аналитика и пиксели." },
  { title: "Оптимизация", description: "A/B-гипотезы и рост конверсии." },
] as const;

interface PricingPlan {
  name: string;
  price: string;
  perks: ReadonlyArray<string>;
  featured?: boolean;
}

const pricingPlans = [
  {
    name: "Старт",
    price: "от 25 000 ₽",
    perks: ["1 экран + CTA", "Быстрый запуск", "Подходит для MVP"],
  },
  {
    name: "Стандарт",
    price: "от 45 000 ₽",
    perks: ["5–7 блоков", "Под ключ: домен, SSL, аналитика", "Готов к рекламе"],
    featured: true,
  },
  {
    name: "Премиум",
    price: "от 75 000 ₽",
    perks: ["Индивидуальный UI", "Анимации и кейсы", "A/B-оптимизация"],
  },
] satisfies ReadonlyArray<PricingPlan>;

const testimonials = [
  { author: "Анастасия", quote: "Быстро запустили рекламный лендинг — лиды пошли на 2-й день." },
  { author: "Алексей", quote: "Удобно: всё под ключ — домен, метрики, хостинг." },
  { author: "Ирина", quote: "Структура страницы показывает опыт именно в лидогенерации." },
] as const;

export default function DesignerPage() {
  return (
    <>
      <Section>
        <div className="grid items-center gap-12 md:grid-cols-[minmax(0,1fr)_minmax(320px,1fr)]">
          <div className="space-y-8">
            <div className="space-y-6">
              <h1 className="text-4xl font-semibold leading-tight md:text-6xl">
                Сайты-лендинги, которые {" "}
                <span className="text-brand-600">приносят клиентов</span>
              </h1>
              <p className="max-w-xl text-lg text-neutral-600">
                Делаю одностраничники под лидогенерацию: чистый дизайн, сильную структуру,
                быструю загрузку и готовность к рекламе.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-4">
              <a
                href="#contact"
                className="inline-flex items-center justify-center rounded-xl2 border border-brand-500 bg-brand-500 px-5 py-3 text-base font-semibold text-white shadow-[0_20px_55px_rgba(14,165,233,0.35)] transition hover:-translate-y-0.5 hover:bg-brand-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-300 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
              >
                Обсудить проект
              </a>
              <a
                href="#portfolio"
                className="inline-flex items-center justify-center rounded-xl2 border border-neutral-200 bg-white px-5 py-3 text-base font-semibold text-neutral-700 transition hover:-translate-y-0.5 hover:bg-neutral-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-300 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
              >
                Портфолио
              </a>
            </div>
            <div className="flex flex-wrap gap-3 text-neutral-600">
              {heroPills.map((pill) => (
                <Pill key={pill}>{pill}</Pill>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-4 rounded-2xl border border-neutral-200 bg-white p-6 shadow-soft">
            <div className="relative aspect-video overflow-hidden rounded-xl border border-neutral-200">
              <video
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                className="h-full w-full object-cover"
              >
                <source
                  src="https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4"
                  type="video/mp4"
                />
              </video>
            </div>
            <p className="text-center text-sm text-neutral-500">Демо-анимация интерфейса</p>
          </div>
        </div>
      </Section>

      <Section
        id="benefits"
        className="rounded-[32px] border border-neutral-200 bg-neutral-50 px-6 md:px-10"
      >
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold md:text-3xl">Почему со мной удобно</h2>
          <p className="max-w-3xl text-lg text-neutral-600">
            Сочетаю стратегию, копирайтинг и разработку: блоки выстроены по логике воронки,
            работают на доверие и конверсию.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {benefits.map((benefit, index) => (
            <article
              key={benefit.title}
              className="flex h-full flex-col gap-3 rounded-2xl border border-neutral-200 bg-white p-6 shadow-soft"
            >
              <span className="text-sm font-semibold text-brand-600">0{index + 1}</span>
              <h3 className="text-xl font-semibold text-neutral-900">{benefit.title}</h3>
              <p className="text-neutral-600">{benefit.description}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section id="portfolio">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div className="space-y-2">
            <h2 className="text-2xl font-semibold md:text-3xl">Недавние проекты</h2>
            <p className="text-neutral-500">Больше кейсов покажу на созвоне.</p>
          </div>
          <span className="text-sm text-neutral-500">Ещё работы — по запросу</span>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {projects.map((project) => (
            <article
              key={project.title}
              className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-soft transition hover:-translate-y-1 hover:shadow-[0_30px_60px_rgba(15,23,42,0.12)]"
            >
              <div className="relative h-44 w-full overflow-hidden border-b border-neutral-200">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-105"
                  sizes="(min-width: 1024px) 320px, (min-width: 768px) 40vw, 90vw"
                />
              </div>
              <div className="flex flex-1 flex-col gap-2 p-5">
                <span className="text-sm font-medium uppercase tracking-[0.2em] text-neutral-400">
                  {project.tag}
                </span>
                <h3 className="text-lg font-semibold text-neutral-900">{project.title}</h3>
                <p className="flex-1 text-sm text-neutral-600">{project.description}</p>
                {project.href ? (
                  <a
                    className="inline-flex items-center text-sm font-medium text-brand-600 underline decoration-dotted underline-offset-4 transition hover:text-brand-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-300 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
                    href={project.href}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {project.linkLabel}
                  </a>
                ) : (
                  <span className="text-sm text-neutral-400">{project.linkLabel}</span>
                )}
              </div>
            </article>
          ))}
        </div>
      </Section>

      <Section
        id="process"
        className="rounded-[32px] border border-neutral-200 bg-neutral-50 px-6 md:px-10"
      >
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold md:text-3xl">Как работаем</h2>
          <p className="max-w-3xl text-lg text-neutral-600">
            Прозрачный пайплайн: фиксируем задачи, делимся промежуточными результатами,
            быстро запускаем итерации.
          </p>
        </div>
        <ol className="grid gap-6 md:grid-cols-4">
          {processSteps.map((step, index) => (
            <li
              key={step.title}
              className="flex h-full flex-col gap-3 rounded-2xl border border-neutral-200 bg-white p-6 shadow-soft"
            >
              <span className="text-sm font-semibold text-brand-600">Шаг {index + 1}</span>
              <h3 className="text-lg font-semibold text-neutral-900">{step.title}</h3>
              <p className="text-sm text-neutral-600">{step.description}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section id="pricing">
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold md:text-3xl">Стоимость</h2>
          <p className="max-w-3xl text-lg text-neutral-600">
            Тарифы можно дополнить: подключим CRM, создадим блог или добавим доп.языки по запросу.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {pricingPlans.map((plan) => (
            <article
              key={plan.name}
              className={`flex h-full flex-col gap-4 rounded-2xl border bg-white p-6 shadow-soft transition hover:-translate-y-0.5 hover:shadow-[0_24px_60px_rgba(15,23,42,0.14)] ${plan.featured ? "border-brand-200 ring-1 ring-brand-200" : "border-neutral-200"}`}
            >
              <div className="space-y-2">
                <span className="text-sm font-semibold uppercase tracking-[0.2em] text-neutral-400">
                  {plan.name}
                </span>
                <p className="text-3xl font-semibold text-neutral-900">{plan.price}</p>
              </div>
              <ul className="space-y-2 text-sm text-neutral-600">
                {plan.perks.map((perk) => (
                  <li key={perk}>• {perk}</li>
                ))}
              </ul>
              <a
                href="#contact"
                className="mt-auto inline-flex items-center justify-center rounded-xl2 border border-brand-500 bg-brand-500 px-4 py-2 text-base font-semibold text-white shadow-[0_18px_45px_rgba(14,165,233,0.32)] transition hover:-translate-y-0.5 hover:bg-brand-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-300 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
              >
                Хочу такой
              </a>
            </article>
          ))}
        </div>
      </Section>

      <Section
        id="reviews"
        className="rounded-[32px] border border-neutral-200 bg-neutral-50 px-6 md:px-10"
      >
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold md:text-3xl">Отзывы</h2>
          <p className="max-w-3xl text-lg text-neutral-600">
            Ведём проект прозрачно: регулярные созвоны, отчёты по аналитике и быстрые внедрения гипотез.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((testimonial) => (
            <blockquote
              key={testimonial.author}
              className="flex h-full flex-col justify-between gap-4 rounded-2xl border border-neutral-200 bg-white p-6 text-neutral-600 shadow-soft"
            >
              <p className="text-base leading-relaxed">“{testimonial.quote}”</p>
              <footer className="text-sm font-semibold text-neutral-500">— {testimonial.author}</footer>
            </blockquote>
          ))}
        </div>
      </Section>

      <Section id="contact">
        <div className="rounded-[32px] border border-neutral-200 bg-neutral-50 px-6 py-12 shadow-soft md:px-10">
          <div className="grid gap-12 md:grid-cols-[minmax(0,1fr)_minmax(320px,1fr)]">
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold md:text-3xl">Обсудим ваш лендинг?</h2>
              <p className="text-lg text-neutral-600">
                Опишите задачу — подготовлю структуру, смету и таймлайн. Отвечаю в течение рабочего дня.
              </p>
              <ul className="space-y-2 text-neutral-600">
                <li>
                  • Telegram:
                  <a
                    className="ml-1 inline-flex items-center gap-1 text-brand-600 underline decoration-dotted underline-offset-4 transition hover:text-brand-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-300 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-50"
                    href="https://t.me/peexthree"
                    target="_blank"
                    rel="noreferrer"
                  >
                    @peexthree
                  </a>
                </li>
                <li>• Email: linedrop@yandex.ru</li>
              </ul>
            </div>
            <ContactForm />
          </div>
        </div>
      </Section>
    </>
  );
}