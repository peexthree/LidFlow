export const runtime = "edge"; // быстро и просто деплоится на Vercel

export async function POST(req: Request) {
  try {
    const { name, contact, message } = await req.json();
    const text = `🆕 Заявка с сайта\n\nИмя: ${name}\nКонтакт: ${contact}\nСообщение: ${message || "-"}`;

    const token = process.env.TG_BOT_TOKEN!;
    const chatId = process.env.TG_CHAT_ID!; // свой user/chat id или id группы

    if (!token || !chatId) {
      return new Response("Missing TG env", { status: 500 });
    }

    const url = `https://api.telegram.org/bot${token}/sendMessage`;
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chatId, text }),
    });

    if (!res.ok) return new Response("TG error", { status: 500 });
    return new Response("ok");
  } catch (e) {
    return new Response("fail", { status: 500 });
  }
}
