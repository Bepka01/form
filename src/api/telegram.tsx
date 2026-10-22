import type { FormData } from "../chema/registrationSchema";
import { API_URL } from "../data/index.js";

export const sendTelegramMessage = async (data: FormData) => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      chat_id: 8809232919,
      text: `
ФИО: ${data.firstName},
Email: ${data.email},
Телефон: ${data.number},
Работы: ${data.works},
      `,
    }),
  });

  if (!response.ok) {
    throw new Error("Не удалось отправить сообщение в Telegram");
  }

  return response.json();
};
