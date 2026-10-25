import type { FormData } from "../schema/registrationSchema.js";
import { API_URL } from "../constants/index.js";
import axios from "axios";

type TelegramResponse = {
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
};

export const sendTelegramMessage = async (
  data: FormData,
): Promise<TelegramResponse> => {
  const response = await axios.post(API_URL, {
    chat_id: -1004373185404,
    text: `
ФИО: ${data.firstName},
Email: ${data.email},
Телефон: ${data.number},
Работы: ${data.works},
      `,
  });

  return response.data;
};
