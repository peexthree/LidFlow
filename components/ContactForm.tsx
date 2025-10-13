"use client";

import { useMemo, useState, type FormEvent } from "react";
import { z } from "zod";

import { Button } from "@/components/ui/button";

const formSchema = z.object({
  name: z.string().min(2, "Укажите имя"),
  contact: z.string().min(3, "Добавьте способ связи"),
  message: z
    .string()
    .max(2000, "Сообщение слишком длинное")
    .optional()
    .transform((value) => value?.trim() ?? ""),
});

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle",
  );
  const [error, setError] = useState<string | null>(null);

  const isSending = status === "loading";

  const statusMessage = useMemo(() => {
    if (status === "success") {
      return "Заявка отправлена. Скоро свяжемся!";
    }
    if (status === "error") {
      return error ?? "Не удалось отправить сообщение.";
    }
    return null;
  }, [error, status]);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    const rawData = Object.fromEntries(formData.entries());
    const parsed = formSchema.safeParse(rawData);

    if (!parsed.success) {
      setStatus("error");
      setError(parsed.error.issues[0]?.message ?? "Проверьте введённые данные.");
      return;
    }

    setStatus("loading");
    setError(null);


    try {
      const response = await fetch("/api/telegram", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });

      if (!response.ok) {
        const text = await response.text();
        throw new Error(text || "Сервер вернул ошибку");
      }

      form.reset();
      setStatus("success");
    } catch (err) {
      console.error("Contact form submission failed", err);
      setStatus("error");
      setError("Ошибка сети. Напишите напрямую в Telegram.");
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      className="relative rounded-2xl border border-white/10 bg-white/[0.05] p-6 shadow-[0_30px_100px_rgba(14,165,233,0.25)] backdrop-blur-xl"
    >
      <div className="grid gap-5">
        <div className="grid gap-2">
          <label className="text-sm font-medium text-white/70" htmlFor="name">
            Имя
          </label>
          <input
            id="name"
            name="name"
            required
            className="h-12 w-full rounded-xl border border-white/10 bg-white/[0.08] px-3 text-base text-white placeholder-white/50 shadow-sm transition focus:border-cyan-300 focus:outline-none focus:ring-2 focus:ring-cyan-400/40"
            placeholder="Как к вам обращаться"
            autoComplete="name"
          />
        </div>

        <div className="grid gap-2">
          <label className="text-sm font-medium text-white/70" htmlFor="contact">
            Контакт
          </label>
          <input
            id="contact"
            name="contact"
            required
            className="h-12 w-full rounded-xl border border-white/10 bg-white/[0.08] px-3 text-base text-white placeholder-white/50 shadow-sm transition focus:border-cyan-300 focus:outline-none focus:ring-2 focus:ring-cyan-400/40"
            placeholder="Telegram или email"
            autoComplete="email"
          />
        </div>

        <div className="grid gap-2">
          <label className="text-sm font-medium text-white/70" htmlFor="message">
            Задача
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            className="w-full rounded-xl border border-white/10 bg-white/[0.08] px-3 py-2 text-base text-white placeholder-white/50 shadow-sm transition focus:border-cyan-300 focus:outline-none focus:ring-2 focus:ring-cyan-400/40"
            placeholder="Кратко опишите проект"
          />
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <Button
          type="submit"
          className="group inline-flex min-w-[180px] items-center justify-center gap-2 rounded-xl2 bg-cyan-500 px-6 py-3 text-base font-semibold text-white shadow-[0_18px_45px_rgba(6,182,212,0.35)] transition-transform duration-300 ease-out hover:-translate-y-0.5 hover:bg-cyan-400 hover:shadow-[0_22px_55px_rgba(6,182,212,0.45)] disabled:cursor-not-allowed disabled:opacity-70"
          disabled={isSending}
        >
          {isSending ? "Отправка..." : "Отправить заявку"}
        </Button>
        <p
          className="text-sm text-white/60"
          role="status"
          aria-live="polite"
        >
          {statusMessage}
        </p>
      </div>
    </form>
  );
}