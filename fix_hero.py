import re

with open('components/sections/Hero.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Replace pill text
content = content.replace('<span>Доминируй в своей нише</span>', '<span>Telegram Web Apps & Bots</span>')

# Replace Heading SplitText 1
content = content.replace('text="Абсолютный"', 'text="Автоматизация"')

# Replace Heading SplitText 2
content = content.replace('text="Результат"', 'text="Продаж"')

# Replace description paragraph
old_p = """<p>
            Мы не делаем шаблоны. Мы создаём High-End машины для генерации прибыли.
            Твой бизнес заслуживает системы, которая продаёт 24/7. Вложись в рост.
          </p>"""
new_p = """<p>
            Увеличиваем конверсию, снижаем нагрузку на менеджеров.
            Разрабатываем инструменты, которые продают 24/7.
          </p>"""
content = content.replace(old_p, new_p)

# Replace CTA button 1
old_btn1 = """<Link href="#contact">Забрать рынок</Link>"""
new_btn1 = """<Link href="https://t.me/LIDflowDemoBOT" target="_blank" rel="noopener noreferrer">Запустить Демо-Бота</Link>"""
content = content.replace(old_btn1, new_btn1)

# Replace CTA button 2
old_btn2 = """<Link href="#features">Узнать систему</Link>"""
new_btn2 = """<Link href="#pricing">Посмотреть тарифы</Link>"""
content = content.replace(old_btn2, new_btn2)

with open('components/sections/Hero.tsx', 'w', encoding='utf-8') as f:
    f.write(content)
