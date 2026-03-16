import re

with open('app/page.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

trust_signals_jsx = """
      <div className="relative z-10 w-full">
        <Hero />
      </div>

      <div className="relative z-10 space-y-24 py-16 md:py-24">

        {/* Секция Юридический щит / Trust Signals */}
        <section className="container relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.02] px-6 py-10 shadow-[0_20px_50px_rgba(0,0,0,0.3)] backdrop-blur-xl animate-fade-in-up md:px-12">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(255,255,255,0.05),_transparent_70%)]" />
          <div className="relative z-10 grid gap-8 text-center md:grid-cols-3 md:gap-12">
            <div className="flex flex-col items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/5 shadow-inner">
                <img src="/data-armor.svg" alt="Договор ИП" className="h-8 w-8 text-cyan-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">Работа по договору ИП</h3>
                <p className="mt-2 text-sm text-slate-400">Официально, прозрачно, с закрывающими документами.</p>
              </div>
            </div>
            <div className="flex flex-col items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/5 shadow-inner">
                <img src="/web-architecture.svg" alt="Передача прав на код" className="h-8 w-8 text-cyan-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">100% права на код</h3>
                <p className="mt-2 text-sm text-slate-400">Полная передача исходников и доступов к серверам.</p>
              </div>
            </div>
            <div className="flex flex-col items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/5 shadow-inner">
                <img src="/ui-ux.svg" alt="Строгое NDA" className="h-8 w-8 text-cyan-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">Строгое NDA</h3>
                <p className="mt-2 text-sm text-slate-400">Защита вашей идеи, клиентской базы и данных.</p>
              </div>
            </div>
          </div>
        </section>
"""

content = content.replace("""      <div className="relative z-10 w-full">
        <Hero />
      </div>

      <div className="relative z-10 space-y-24 py-16 md:py-24">""", trust_signals_jsx)


with open('app/page.tsx', 'w', encoding='utf-8') as f:
    f.write(content)
