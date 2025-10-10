export function Features({ items }: { items: { title: string; text: string }[] }) {
  return (
    <section className="container py-16">
      <div className="grid md:grid-cols-3 gap-6">
        {items.map((it, i) => (
          <div key={i} className="border rounded-2xl p-6 shadow-soft bg-white">
            <div className="text-sm text-brand-600 font-medium">0{i+1}</div>
            <h3 className="mt-2 text-xl font-semibold">{it.title}</h3>
            <p className="mt-2 text-neutral-600">{it.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
