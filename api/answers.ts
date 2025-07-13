import { config } from "@/config";

import axios from "axios";

type getAllAnswersProps = {
  jwt_token: string;
  id: string;
};

export const getAllAnswers = async ({ id, jwt_token }: getAllAnswersProps) => {
  try {
    const response = await axios.get(
      `${config.BASE_URL}/question/${id}/answers`,
      {
        headers: {
          Authorization: jwt_token,
        },
      }
    );

    return response;
  } catch (err) {
    throw err;
  }
};

type PostAnswerProps = {
  jwt_token: string;
  answer: object;
  id: string;
};

export const PostAnswer = async ({
  jwt_token,
  answer,
  id,
}: PostAnswerProps) => {
  try {
    const response = await axios.post(
      `${config.BASE_URL}/question/${id}/answers`,
      answer,
      {
        headers: {
          Authorization: jwt_token,
        },
      }
    );

    return response;
  } catch (error) {
    throw error;
  }
};
