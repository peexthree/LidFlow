import re

with open('app/page.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Replace testimonials array
old_testimonials = """const testimonials = [
  {
    name: "Дарья Акуленок",
    role: "Основатель бренда Akulenok",
    quote:
      "Результат с первого дня. Мы просто залили трафик, и заявки пошли. Работают быстро, жестко, без лишних слов — как я люблю. Настоящие профи.",
  },
  {
    name: "Александр Сергеев",
    role: "CEO b2b-сервиса",
    quote:
      "Связка лендинга и CRM была собрана за неделю. Скорость феноменальная. Конверсия выросла в разы. Мы просто уничтожаем конкурентов в своей нише.",
  },
  {
    name: "Анна Петрова",
    role: "Директор по маркетингу",
    quote:
      "Идеальный баланс технологий и психологии продаж. Мы тестируем гипотезы на лету, внедрения происходят в тот же день. ROI просто сумасшедший.",
  },
] as const;"""

new_testimonials = """const testimonials = [
  {
    name: "Дарья Акуленок",
    role: "Основатель бренда Akulenok",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
    quote:
      "Бот-визитка окупил себя за первые выходные. Настроили сбор заявок, теперь мы не теряем клиентов из Telegram, пока спим. Работают быстро, четко, без воды.",
  },
  {
    name: "Александр Сергеев",
    role: "Владелец розничного магазина",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
    quote:
      "Интеграция каталога и корзины в Telegram сработала на отлично. Заказы падают сразу в CRM. Это именно то решение, которое нужно малому бизнесу для быстрого старта.",
  },
  {
    name: "Анна Петрова",
    role: "Директор салона красоты",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026703d",
    quote:
      "Сделали удобную запись на услуги прямо через бота. Клиенты довольны, администратор разгружен. Вложения вернулись буквально за первый месяц работы.",
  },
] as const;"""

content = content.replace(old_testimonials, new_testimonials)

# Replace testimonials UI
old_test_ui = """                  <figcaption className="relative z-10 mt-6 space-y-1">
                    <div className="text-sm font-semibold text-white">{testimonial.name}</div>
                    <div className="text-xs uppercase tracking-[0.28em] text-white/50">
                      {testimonial.role}
                    </div>
                  </figcaption>"""

new_test_ui = """                  <figcaption className="relative z-10 mt-6 flex items-center gap-4">
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="h-12 w-12 rounded-full border-2 border-white/10 object-cover shadow-sm"
                    />
                    <div className="space-y-1">
                      <div className="text-sm font-semibold text-white">{testimonial.name}</div>
                      <div className="text-xs text-white/60">
                        {testimonial.role}
                      </div>
                    </div>
                  </figcaption>"""

content = content.replace(old_test_ui, new_test_ui)

with open('app/page.tsx', 'w', encoding='utf-8') as f:
    f.write(content)
