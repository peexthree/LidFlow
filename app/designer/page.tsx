import Link from "next/link";

function Section({ id, className = "", children }: { id?: string; className?: string; children: React.ReactNode }) {
  return (
    <section id={id} className={`container py-20 ${className}`}>
      {children}
    </section>
  );
}

function Pill({ children }: { children: React.ReactNode }) {
  return <span className="inline-flex items-center px-3 py-1 rounded-full border text-sm">{children}</span>;
}

export default function Home() {
  return (
    <>
      {/* HERO */}
      <Section>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl md:text-6xl font-semibold leading-tight">
              Сайты-лендинги, которые <span className="text-brand-600">приносят клиентов</span>
            </h1>
            <p className="mt-6 text-lg text-neutral-600">
              Делаю одностраничники под лидогенерацию: чистый дизайн, сильная структура, быстрая загрузка, готовность к рекламе.
            </p>
            <div className="mt-8 flex gap-4">
              <a href="#contact" className="inline-flex items-center justify-center rounded-xl2 px-5 py-3 bg-brand-500 text-white border border-brand-500 hover:bg-brand-600">
                Обсудить проект
              </a>
              <a href="#portfolio" className="inline-flex items-center justify-center rounded-xl2 px-5 py-3 border hover:bg-neutral-50">
                Портфолио
              </a>
            </div>
            <div className="mt-8 flex flex-wrap gap-3 text-neutral-600">
              <Pill>Next.js · React · TypeScript · Tailwind</Pill>
              <Pill>Запуск от 3–5 дней</Pill>
              <Pill>Vercel/Https/Аналитика</Pill>
            </div>
          </div>

          <div className="rounded-2xl border shadow-soft p-6">
            <div className="aspect-video rounded-xl overflow-hidden border">
              <video autoPlay muted loop playsInline className="w-full h-full object-cover">
                <source src="https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4" type="video/mp4" />
              </video>
            </div>
            <p className="text-center text-sm text-neutral-500 mt-2">Демо-анимация интерфейса</p>
          </div>
        </div>
      </Section>

      {/* BENEFITS */}
      <Section id="benefits" className="bg-neutral-50 rounded-2xl">
        <h2 className="text-2xl md:text-3xl font-semibold">Почему со мной удобно</h2>
        <div className="mt-8 grid md:grid-cols-3 gap-6">
          {[
            { t: "Лидогенерация", d: "Делаем структуру под рекламу: оффер, воронка, UTM, цели." },
            { t: "Скорость", d: "Соберу и выведу в продакшн за 3–5 дней на Vercel." },
            { t: "Чистый код", d: "React + TS, легко масштабировать, быстро загружается." },
          ].map((b, i) => (
            <div key={i} className="border rounded-2xl p-6 bg-white shadow-soft">
              <div className="text-sm text-brand-600 font-medium">0{i + 1}</div>
              <h3 className="mt-2 text-xl font-semibold">{b.t}</h3>
              <p className="mt-2 text-neutral-600">{b.d}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* PORTFOLIO */}
      <Section id="portfolio">
        <div className="flex items-end justify-between">
          <h2 className="text-2xl md:text-3xl font-semibold">Недавние проекты</h2>
          <span className="text-sm text-neutral-500">Ещё работы — по запросу</span>
        </div>
        <div className="mt-8 grid md:grid-cols-3 gap-6">
          {/* Проект №1 — единственная публичная ссылка */}
          <article className="border rounded-2xl overflow-hidden bg-white shadow-soft">
            <img src="/portfolio/akulenok-cover.jpg" alt="" className="w-full h-44 object-cover border-b" />
            <div className="p-5">
              <div className="text-sm text-neutral-500">Landing · Бренд</div>
              <h3 className="text-lg font-semibold mt-1">Akulenok — сайт-визитка</h3>
              <p className="text-neutral-600 mt-2">Чистый минималистичный лендинг с акцентом на конверсию.</p>
              <a className="inline-flex mt-4 text-brand-600 underline" href="https://akulenok-tmz.ru/" target="_blank" rel="noreferrer">Смотреть сайт</a>
            </div>
          </article>

          {/* Проект №2 — карточка без ссылки */}
          <article className="border rounded-2xl overflow-hidden bg-white shadow-soft">
            <img src="/portfolio/work-2.jpg" alt="" className="w-full h-44 object-cover border-b" />
            <div className="p-5">
              <div className="text-sm text-neutral-500">Leadgen · Промо</div>
              <h3 className="text-lg font-semibold mt-1">Лендинг услуги</h3>
              <p className="text-neutral-600 mt-2">Сильный оффер, секция кейсов, CTA на заявку.</p>
              <span className="inline-flex mt-4 text-neutral-400">Ссылка по запросу</span>
            </div>
          </article>

          {/* Проект №3 — карточка без ссылки */}
          <article className="border rounded-2xl overflow-hidden bg-white shadow-soft">
            <img src="/portfolio/work-3.jpg" alt="" className="w-full h-44 object-cover border-b" />
            <div className="p-5">
              <div className="text-sm text-neutral-500">B2B · Услуги</div>
              <h3 className="text-lg font-semibold mt-1">Лендинг под трафик</h3>
              <p className="text-neutral-600 mt-2">Структура под рекламные кампании и аналитика.</p>
              <span className="inline-flex mt-4 text-neutral-400">Ссылка по запросу</span>
            </div>
          </article>
        </div>
      </Section>

      {/* PROCESS */}
      <Section id="process" className="bg-neutral-50 rounded-2xl">
        <h2 className="text-2xl md:text-3xl font-semibold">Как работаем</h2>
        <ol className="mt-8 grid md:grid-cols-4 gap-6">
          {[
            { t: "Бриф", d: "Цели, аудитория, оффер, структура." },
            { t: "Дизайн", d: "Современный UI «как в Figma», но сразу в коде." },
            { t: "Запуск", d: "Домен, хостинг Vercel, SSL, аналитика." },
            { t: "Оптимизация", d: "A/B-гипотезы, повышение конверсии." },
          ].map((s, i) => (
            <li key={i} className="border rounded-2xl p-5 bg-white shadow-soft">
              <div className="text-sm text-brand-600 font-medium">Шаг {i + 1}</div>
              <div className="text-lg font-semibold mt-1">{s.t}</div>
              <p className="text-neutral-600 mt-2">{s.d}</p>
            </li>
          ))}
        </ol>
      </Section>

      {/* PRICING */}
      <Section id="pricing">
        <h2 className="text-2xl md:text-3xl font-semibold">Стоимость</h2>
        <div className="mt-8 grid md:grid-cols-3 gap-6">
          {[
            { name: "Старт", price: "от 25 000 ₽", pts: ["1 экран + CTA", "Быстрый запуск", "Подходит для MVP"] },
            { name: "Стандарт", price: "от 45 000 ₽", pts: ["5–7 блоков", "Под ключ: домен, SSL, аналитика", "Готов к рекламе"], hit: true },
            { name: "Премиум", price: "от 75 000 ₽", pts: ["Индивидуальный UI", "Анимации, кейсы", "A/B-оптимизация"] },
          ].map((p, i) => (
            <div key={i} className={`border rounded-2xl p-6 bg-white shadow-soft ${p.hit ? "ring-1 ring-brand-300" : ""}`}>
              <div className="text-sm text-neutral-500">{p.name}</div>
              <div className="text-3xl font-semibold mt-2">{p.price}</div>
              <ul className="mt-4 space-y-2 text-neutral-600">
                {p.pts.map((x, j) => <li key={j}>• {x}</li>)}
              </ul>
              <a href="#contact" className="inline-flex mt-6 rounded-xl2 px-4 py-2 bg-brand-500 text-white border border-brand-500 hover:bg-brand-600">Хочу такой</a>
            </div>
          ))}
        </div>
      </Section>

      {/* TESTIMONIALS — при желании подменишь на реальные */}
      <Section id="reviews" className="bg-neutral-50 rounded-2xl">
        <h2 className="text-2xl md:text-3xl font-semibold">Отзывы</h2>
        <div className="mt-8 grid md:grid-cols-3 gap-6">
          {[
            { a: "Анастасия", t: "Быстро запустили рекламный лендинг, пошли лиды на 2-й день." },
            { a: "Алексей", t: "Удобно, что всё сведено под ключ: домен, метрики, хостинг." },
            { a: "Ирина", t: "Понравилась структура страницы — видно опыт именно в лидогенерации." },
          ].map((r, i) => (
            <blockquote key={i} className="border rounded-2xl p-6 bg-white shadow-soft">
              <p>“{r.t}”</p>
              <footer className="mt-3 text-sm text-neutral-500">— {r.a}</footer>
            </blockquote>
          ))}
        </div>
      </Section>

      {/* CONTACT */}
      <Section id="contact">
        <div className="grid md:grid-cols-2 gap-10">
          <div>
            <h2 className="text-2xl md:text-3xl font-semibold">Обсудим ваш лендинг?</h2>
            <p className="mt-4 text-neutral-600">
              Напишите задачу — предложу структуру и стоимость. Обычно отвечаю в течение часа.
            </p>
            <ul className="mt-6 space-y-2 text-neutral-600">
              <li>• Telegram: <a className="underline" href="https://t.me/your_username" target="_blank">t.me/your_username</a></li>
              <li>• Email: your@mail.com</li>
            </ul>
          </div>
          <ContactForm />
        </div>
      </Section>
    </>
  );
}

/** --- простая форма: отправка в Telegram через /api/telegram --- */
function ContactForm() {
  async function action(formData: FormData) {
    const payload = {
      name: formData.get("name"),
      contact: formData.get("contact"),
      message: formData.get("message"),
    };
    try {
      const res = await fetch("/api/telegram", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      alert(res.ok ? "Заявка отправлена! Я свяжусь с вами." : "Не удалось отправить. Напишите в Telegram.");
    } catch {
      alert("Ошибка сети. Напишите в Telegram.");
    }
  }

  return (
    <form action={action as any} className="rounded-2xl border p-6 shadow-soft bg-white">
      <label className="block text-sm">Имя
        <input name="name" required className="mt-1 w-full border rounded-xl px-3 py-2" placeholder="Как к вам обращаться" />
      </label>
      <label className="block text-sm mt-4">Контакт
        <input name="contact" required className="mt-1 w-full border rounded-xl px-3 py-2" placeholder="Telegram или email" />
      </label>
      <label className="block text-sm mt-4">Задача
        <textarea name="message" rows={4} className="mt-1 w-full border rounded-xl px-3 py-2" placeholder="Кратко опишите проект"></textarea>
      </label>
      <button className="mt-5 inline-flex items-center justify-center rounded-xl2 px-5 py-3 bg-brand-500 text-white border border-brand-500 hover:bg-brand-600">
        Отправить заявку
      </button>
    </form>
  );
}
