import Image from "next/image";
import Link from "next/link";
import { clsx } from "clsx";

import { ContactForm } from "@/components/ContactForm";
import { Hero, type HeroHighlight } from "@/components/sections/Hero";
import { PortfolioShowcase, type ProjectShowcaseItem } from "@/components/sections/PortfolioShowcase";
import { ElectricBorder } from "@/components/ui/ElectricBorder";
import { Button } from "@/components/ui/button";
import { paletteStyle } from "@/utils/electricPalettes";

// ... (остальные константы heroHighlights, benefits, projects, processSteps, pricingPlans остаются без изменений) ...

const testimonials = [
  {
    name: "Дарья Акуленок",
    role: "Основатель бренда Akulenok",
    quote:
      "Получили первый поток заявок в день запуска. Дальше дорабатывали секции на лету — всё максимально гибко.",
  },
  {
    name: "Александр Сергеев",
    role: "CEO b2b-сервиса",
    quote:
      "Собрали лендинг за неделю, подключили аналитику и CRM. Команда довольна скоростью и прозрачностью.",
  },
  {
    name: "Анна Петрова",
    role: "Маркетолог",
    quote:
      "Мощная связка дизайна и кода. Все гипотезы внедряются в тот же день, аналитика показывает рост конверсии.",
  },
] as const;

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#050816] text-slate-200">
      <div className="pointer-events-none absolute inset-0">
        <div className="floating-orb top-[-15%] left-[-5%] h-72 w-72 bg-fuchsia-500/30" />
        <div className="floating-orb right-[-10%] top-[20%] h-[22rem] w-[22rem] bg-cyan-500/20" />
        <div className="floating-orb bottom-[-10%] left-1/2 h-80 w-80 -translate-x-1/2 bg-indigo-500/30" />
      </div>

      <div className="relative z-10 space-y-24 py-16 md:py-24">
        <div className="animate-scale-in">
          <Hero highlights={heroHighlights} />
        </div>

        {/* ... (Секции Преимущества, Портфолио, Процесс, Стоимость остаются без изменений) ... */}
        
        {/* Секция Отзывы - ИЗМЕНЕНА ДЛЯ ВЫХОДА ИЗОБРАЖЕНИЯ ЗА ПРЕДЕЛЫ */}
        <section className="container relative overflow-visible rounded-3xl border border-white/10 bg-white/[0.03] px-6 py-12 shadow-[0_40px_120px_rgba(76,29,149,0.25)] backdrop-blur-2xl md:px-12 animate-fade-in-up">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_bottom,_rgba(168,85,247,0.3),_transparent_70%)]" />
          
          <div className="relative space-y-10 z-20"> {/* Добавляем z-20, чтобы контент был над изображением */}
            <div className="space-y-4">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1 text-xs uppercase tracking-[0.28em] text-white/60">
                Отзывы
              </span>
              <h2 className="text-3xl font-semibold text-white md:text-4xl">
                Что говорят клиенты
              </h2>
              <p className="max-w-2xl text-base text-slate-300 md:text-lg">
                Работаем прозрачно: регулярные созвоны, понятные отчёты по аналитике, быстро реагируем на гипотезы.
              </p>
            </div>
            
            {/* Контейнер для отзывов, чтобы оставить место для талисмана */}
            <div className="grid gap-6 md:grid-cols-3">
              {testimonials.map((testimonial) => (
                <ElectricBorder
                  key={testimonial.name}
                  as="figure"
                  className="group relative h-full transition-transform duration-500 hover:-translate-y-2 [--electric-radius:1.5rem]"
                  contentClassName="relative z-10 flex h-full flex-col justify-between overflow-hidden bg-white/[0.05] p-6 shadow-[0_25px_80px_rgba(168,85,247,0.2)] transition-colors duration-500 group-hover:bg-white/[0.07]"
                  style={paletteStyle("violet")}
                >
                  <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(236,72,153,0.32),_transparent_70%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  <blockquote className="relative z-10 text-base text-slate-200">
                    “{testimonial.quote}”
                  </blockquote>
                  <figcaption className="relative z-10 mt-6 space-y-1">
                    <div className="text-sm font-semibold text-white">{testimonial.name}</div>
                    <div className="text-xs uppercase tracking-[0.28em] text-white/50">
                      {testimonial.role}
                    </div>
                  </figcaption>
                </ElectricBorder>
              ))}
            </div>
          </div>
          
          {/* Блок с изображением tal2.webp - Позиционирование в правом верхнем углу */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute top-[-120px] right-[-100px] hidden lg:block z-10" // <-- ИЗМЕНЕНО: top-[-120px] и right-[-100px]
          >
            <div className="relative h-[600px] w-[600px]"> {/* <-- ИЗМЕНЕНО: Увеличенный размер */}
              <Image
                src="/tal2.webp"
                alt="Талисман LidFlow"
                fill
                className="object-contain drop-shadow-[0_60px_140px_rgba(59,130,246,0.35)]"
                sizes="(min-width: 1024px) 600px" // Обновленный размер
                priority // Важное изображение для первого экрана
              />
            </div>
          </div>
        </section>

        {/* ... (Секция Контакты остается без изменений) ... */}
        <section className="container relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.04] via-white/[0.02] to-transparent px-6 py-16 shadow-[0_50px_160px_rgba(14,165,233,0.35)] backdrop-blur-2xl md:grid md:grid-cols-[minmax(0,1fr)_380px] md:gap-12 md:px-12 animate-fade-in-up">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(6,182,212,0.28),_transparent_65%)]" />
          <div className="relative space-y-6">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1 text-xs uppercase tracking-[0.28em] text-white/60">
              Контакты
            </span>
            <h2 className="text-3xl font-semibold text-white md:text-4xl">
              Заполните заявку — и обсудим проект
            </h2>
            <p className="text-base text-slate-300 md:text-lg">
              Отвечаю в течение рабочего дня. Подготовлю структуру, бюджет и таймлайн, а также варианты апсейлов.
            </p>
            <ul className="space-y-2 text-sm text-slate-300 md:text-base">
              <li>
                • Telegram:
                <a
                  className="ml-1 inline-flex items-center gap-1 text-cyan-300 underline decoration-dotted underline-offset-4 transition hover:text-cyan-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#050816]"
                  href="https://t.me/peexthree"
                  target="_blank"
                  rel="noreferrer"
                >
                  @peexthree
                </a>
              </li>
              <li>• Email: linderop@yandex.ru</li>
              <li>• Время ответа: до 1 часа в рабочие дни</li>
            </ul>
          </div>
          <div className="relative mt-10 md:mt-0">
            <ContactForm />
          </div>
        </section>
      </div>
    </div>
  );
}