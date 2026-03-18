const fs = require('fs');

let fileStr = fs.readFileSync('app/page.tsx', 'utf8');

const twaBlock = `
        {/* Секция TWA Teaser */}
        <section
          className="container relative overflow-hidden rounded-none border border-[#66FCF1]/30 bg-[#020304] px-6 py-16 shadow-[0_0_50px_rgba(102,252,241,0.1)] md:px-12 my-20 z-10" style={{ clipPath: "polygon(20px 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%, 0 20px)" }}
        >
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(102,252,241,0.1),_transparent_70%)]" />
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#66FCF1] opacity-5 blur-[100px]" />

          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-10">
            <div className="space-y-6 max-w-2xl">
              <span className="inline-flex items-center gap-2 rounded-none border border-[#66FCF1]/30 bg-[#66FCF1]/5 px-4 py-1 text-xs uppercase tracking-[0.2em] text-[#66FCF1] font-mono">
                TELEGRAM WEB APPS
              </span>
              <h2 className="text-3xl font-mono font-bold text-white md:text-5xl uppercase tracking-wider">
                Сайты <span className="text-red-500 line-through decoration-4 opacity-70">умирают</span>.<br />
                Телеграм — новая <span className="text-[#66FCF1]">монополия</span>.
              </h2>
              <p className="text-lg text-slate-300">
                Загоните клиентов в экосистему, из которой они не захотят выходить. Откажитесь от слива трафика на внешние сайты. Создайте автономный отдел продаж прямо в мессенджере.
              </p>
              <ul className="space-y-2 text-sm font-mono text-slate-400">
                <li className="flex items-center gap-2"><span className="text-[#66FCF1]">✓</span> Конверсия x3 выше стандартных Landing Pages</li>
                <li className="flex items-center gap-2"><span className="text-[#66FCF1]">✓</span> Мгновенный биллинг и push-уведомления (без спам-фильтров)</li>
                <li className="flex items-center gap-2"><span className="text-[#66FCF1]">✓</span> Бесшовная интеграция с ИИ-ассистентами</li>
              </ul>
            </div>

            <div className="w-full md:w-auto flex-shrink-0">
              <a href="/twa" className="group relative inline-flex w-full md:w-auto items-center justify-center gap-3 bg-[#66FCF1] px-8 py-5 font-mono text-lg font-bold text-black uppercase tracking-widest shadow-[0_0_30px_rgba(102,252,241,0.4)] transition-all hover:bg-[#45ece0] hover:shadow-[0_0_50px_rgba(102,252,241,0.6)]" style={{ clipPath: "polygon(0 0, 100% 0, 100% calc(100% - 15px), calc(100% - 15px) 100%, 0 100%)" }}>
                <span>Войти в TWA-Матрицу</span>
                <svg className="w-5 h-5 transition-transform group-hover:translate-x-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
                {/* Cyberpunk corner accent */}
                <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-black opacity-50" />
              </a>
            </div>
          </div>
        </section>
`;

// Insert the TWA teaser right before the Dynamic Pricing section
const searchString = '{/* Секция Стоимость */}';
fileStr = fileStr.replace(searchString, twaBlock + '\n\n        ' + searchString);

fs.writeFileSync('app/page.tsx', fileStr);
