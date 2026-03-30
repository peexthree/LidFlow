"use client";

import React, { useMemo, useState } from "react";
import { z } from "zod";
import { clsx } from "clsx";

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
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
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

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    const rawData = Object.fromEntries(formData.entries());
    const parsed = formSchema.safeParse(rawData);

    if (!parsed.success) {
      setStatus("error");
      setError(
        parsed.error.issues[0]?.message ?? "Проверьте введённые данные.",
      );
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
      className="relative rounded-none border border-[#66FCF1]/30 bg-white/[0.05] p-6 shadow-[0_30px_100px_rgba(14,165,233,0.25)] backdrop-blur-xl"
    >
      <div className="grid gap-5">
        <div className="grid gap-2">
          <label className="text-sm font-medium text-white/70" htmlFor="form-name">
            Имя
          </label>
          <input
            id="form-name"
            name="name"
            required
            className="h-12 w-full rounded-none border border-[#66FCF1]/30 bg-white/[0.08] px-3 text-base text-white placeholder-white/50 shadow-sm transition-colors duration-300 ease-figma-smooth focus:border-cyan-300 focus:outline-none focus:ring-2 focus:ring-cyan-400/40"
            placeholder="Как к вам обращаться"
            autoComplete="name"
          />
        </div>

        <div className="grid gap-2">
          <label
            className="text-sm font-medium text-white/70"
            htmlFor="form-contact"
          >
            Контакт
          </label>
          <input
            id="form-contact"
            name="contact"
            required
            className="h-12 w-full rounded-none border border-[#66FCF1]/30 bg-white/[0.08] px-3 text-base text-white placeholder-white/50 shadow-sm transition-colors duration-300 ease-figma-smooth focus:border-cyan-300 focus:outline-none focus:ring-2 focus:ring-cyan-400/40"
            placeholder="Telegram или email"
            autoComplete="email"
          />
        </div>

        <div className="grid gap-2">
          <label
            className="text-sm font-medium text-white/70"
            htmlFor="form-message"
          >
            Задача
          </label>
          <textarea
            id="form-message"
            name="message"
            rows={4}
            className="w-full rounded-none border border-[#66FCF1]/30 bg-white/[0.08] px-3 py-2 text-base text-white placeholder-white/50 shadow-sm transition-colors duration-300 ease-figma-smooth focus:border-cyan-300 focus:outline-none focus:ring-2 focus:ring-cyan-400/40"
            placeholder="Кратко опишите проект"
          />
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <Button
          type="submit"
          className="group inline-flex min-w-[180px] items-center justify-center gap-2 rounded-none2 bg-cyan-500 px-6 py-3 text-base font-semibold text-white shadow-[0_18px_45px_rgba(6,182,212,0.35)] transition-transform duration-300 ease-figma-smooth hover:-translate-y-0.5 hover:bg-cyan-400 hover:shadow-[0_22px_55px_rgba(6,182,212,0.45)] disabled:cursor-not-allowed disabled:opacity-70"
          disabled={isSending}
        >
          {isSending ? (
            <>
              <svg
                className="h-5 w-5 animate-spin text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Отправка...
            </>
          ) : (
            "Отправить заявку"
          )}
        </Button>
        <p
          className={clsx(
            "text-sm transition-colors duration-300",
            status === "success" && "text-emerald-400",
            status === "error" && "text-red-400",
            (status === "idle" || status === "loading") && "text-white/60",
          )}
          role="status"
          aria-live="polite"
        >
          {statusMessage}
        </p>
      </div>
    </form>
  );
}
