export function CTA({ text, button }: { text: string; button: string }) {
  return (
    <section className="container py-20">
      <div className="rounded-2xl border p-10 shadow-soft bg-neutral-950 text-white text-center">
        <h3 className="text-3xl font-semibold">{text}</h3>
        <button className="mt-6 px-5 py-3 rounded-xl2 bg-white text-neutral-900">{button}</button>
      </div>
    </section>
  );
}
