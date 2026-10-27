import type { FormData } from "../schema/registrationSchema.js";
import axios from "axios";
import { CHAT_ID, API_URL } from "../constants/index.js";

interface TelegramResponse {
  ok: boolean;
  result?: {
    message_id: number;
    date: number;
    chat: {
      id: number;
      title?: string;
      type: string;
    };
    text?: string;
  };
}

export const sendTelegramMessage = async (
  data: FormData,
): Promise<TelegramResponse> => {
  const response = await axios.post(API_URL, {
    chat_id: CHAT_ID,
    text: `
ФИО: ${data.firstName}
Email: ${data.email}
Телефон: ${data.number}
Работы: ${data.works.map((work, index) => `${index + 1} ${work}`).join("\n")}

      `,
  });

  return response.data;
};
