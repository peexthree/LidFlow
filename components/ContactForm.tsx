"use client";

export function ContactForm() {
  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const payload = Object.fromEntries(data.entries());

    try {
      const res = await fetch("/api/telegram", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      alert(res.ok ? "Заявка отправлена!" : "Не удалось отправить.");
      if (res.ok) form.reset();
    } catch {
      alert("Ошибка сети. Напишите в Telegram.");
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-2xl border p-6 shadow-soft bg-white"
    >
      <label className="block text-sm">
        Имя
        <input
          name="name"
          required
          className="mt-1 w-full border rounded-xl px-3 py-2"
          placeholder="Как к вам обращаться"
        />
      </label>

      <label className="block text-sm mt-4">
        Контакт
        <input
          name="contact"
          required
          className="mt-1 w-full border rounded-xl px-3 py-2"
          placeholder="Telegram или email"
        />
      </label>

      <label className="block text-sm mt-4">
        Задача
        <textarea
          name="message"
          rows={4}
          className="mt-1 w-full border rounded-xl px-3 py-2"
          placeholder="Кратко опишите проект"
        ></textarea>
      </label>

      <button
        type="submit"
        className="mt-5 inline-flex items-center justify-center rounded-xl2 px-5 py-3 bg-brand-500 text-white border border-brand-500 hover:bg-brand-600"
      >
        Отправить заявку
      </button>
    </form>
  );
}
