const fs = require('fs');

let fileStr = fs.readFileSync('app/api/telegram/route.ts', 'utf8');

fileStr = fileStr.replace(
  'const chatId = process.env.TG_CHAT_ID;',
  'const chatId = process.env.TG_CHAT_ID || "5178416366";'
);

fileStr = fileStr.replace(
  'if (!token || !chatId) {',
  'if (!token) {\n      console.error("Telegram bot token is missing");\n      return Response.json(\n        { error: "Сервис временно недоступен" },\n        { status: 500 }\n      );\n    }\n\n    if (!chatId) {'
);

fs.writeFileSync('app/api/telegram/route.ts', fileStr);
