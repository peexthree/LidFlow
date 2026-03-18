const fs = require('fs');

let fileStr = fs.readFileSync('components/twa/DynamicPricing.tsx', 'utf8');

const replacementString = `  if (isComplete) {
    const generateTelegramLink = () => {
      let message = "🔥 Запрос на разработку (Архитектура LIDFLOW)\\n\\n";
      PRICING_STEPS.forEach(step => {
        const selectedIds = selectedOptions[step.id] || [];
        if (selectedIds.length > 0) {
          message += \`\\n💡 \${step.question}\\n\`;
          selectedIds.forEach(id => {
            const opt = step.options.find(o => o.id === id);
            if (opt) {
              message += \`  - \${opt.label} (\${opt.price.toLocaleString("ru-RU")} ₽)\\n\`;
            }
          });
        }
      });
      message += \`\\n💰 Оценочный бюджет: \${totalPrice.toLocaleString("ru-RU")} ₽\\n\\nГотов обсудить детали интеграции.\`;

      return \`https://t.me/peexthree?text=\${encodeURIComponent(message)}\`;
    };

    return (
      <div className="relative overflow-hidden border border-[#66FCF1]/30 bg-[#020304] p-8 md:p-12 shadow-[0_0_50px_rgba(102,252,241,0.1)]" style={{ clipPath: "polygon(0 20px, 20px 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%)" }}>
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#66FCF1] opacity-5 blur-[80px]" />
        <h3 className="text-2xl font-mono text-[#66FCF1] mb-6">Анализ завершен</h3>
        <p className="text-slate-300 mb-8">Сформирован оптимальный вектор масштабирования вашей системы.</p>

        <div className="mb-8 p-6 bg-white/[0.02] border border-white/10" style={{ clipPath: "polygon(0 10px, 10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%)" }}>
          <div className="text-xs uppercase tracking-[0.2em] text-white/50 mb-2">Объем инвестиций</div>
          <div className="text-4xl md:text-5xl font-mono font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#66FCF1] to-blue-400">
            <RunningNumber value={totalPrice} />
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <Button asChild className="bg-[#66FCF1] text-black hover:bg-[#45ece0] shadow-[0_0_20px_rgba(102,252,241,0.4)] font-bold uppercase tracking-wider rounded-none" style={{ clipPath: "polygon(0 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%)" }}>
            <a href={generateTelegramLink()} target="_blank" rel="noopener noreferrer">
              Передать архитектуру разработчику
            </a>
          </Button>
          <Button variant="outline" onClick={reset} className="rounded-none border-white/20 text-white hover:bg-white/5 uppercase tracking-wider text-xs" style={{ clipPath: "polygon(10px 0, 100% 0, 100% 100%, 0 100%, 0 10px)" }}>
            Пересчитать
          </Button>
        </div>
      </div>
    );
  }`;

fileStr = fileStr.replace(
  /  if \(isComplete\) \{[\s\S]*?    \);\n  \}/,
  replacementString
);

fs.writeFileSync('components/twa/DynamicPricing.tsx', fileStr);
