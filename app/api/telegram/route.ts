import { z } from "zod";

const payloadSchema = z.object({
  name: z.string().min(2).max(120),
  contact: z.string().min(3).max(320),
  message: z.string().max(2000).optional(),
});

function getBaseUrl() {
  return process.env.NEXT_PUBLIC_SITE_URL ?? "https://lidflow.vercel.app";
}

export async function POST(req: Request) {
  try {
    const json = await req.json().catch(() => {
      throw new z.ZodError([
        {
          code: "invalid_type",
          expected: "object",
          received: "undefined",
          path: [],
          message: "Некорректный формат данных",
        },
      ]);
    });

    const parsed = payloadSchema.parse(json);

    const token = process.env.TG_BOT_TOKEN;
    const chatId = process.env.TG_CHAT_ID;

    if (!token) {
      console.error("Telegram bot token is missing");
      return Response.json(
        { error: "Сервис временно недоступен" },
        { status: 500 }
      );
    }

    if (!chatId) {
      console.error("Telegram environment variables are missing");
      return Response.json(
        { error: "Сервис временно недоступен" },
        { status: 500 },
      );
    }

    const text = `🆕 Заявка с сайта ${getBaseUrl()}\n\nИмя: ${parsed.name}\nКонтакт: ${parsed.contact}\nСообщение: ${parsed.message?.trim() || "-"}`;

    const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chatId, text }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Telegram API error", response.status, errorText);
      return Response.json(
        { error: "Не удалось отправить сообщение" },
        { status: 502 },
      );
    }

    return Response.json({ ok: true }, { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return Response.json(
        { error: "Проверьте корректность данных" },
        { status: 422 },
      );
    }

    console.error("Unexpected Telegram handler error", error);
    return Response.json(
      { error: "Внутренняя ошибка сервера" },
      { status: 500 },
    );
  }
}