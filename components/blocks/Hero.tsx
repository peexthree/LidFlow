export function Hero({ title, subtitle, cta }: { title: string; subtitle: string; cta: string }) {
  return (
    <section className="container py-24">
      <div className="rounded-2xl border p-10 shadow-soft bg-white">
        <h2 className="text-4xl md:text-5xl font-semibold">{title}</h2>
        <p className="mt-4 text-neutral-600 text-lg">{subtitle}</p>
        <button className="mt-8 px-5 py-3 rounded-xl2 bg-brand-500 text-white">{cta}</button>
      </div>
    </section>
  );
}
