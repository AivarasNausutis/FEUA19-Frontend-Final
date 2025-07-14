import { config } from "@/config";

import axios from "axios";

type getAllQuestionsProps = {
  jwt_token: string;
};

export const getAllQuestions = async ({ jwt_token }: getAllQuestionsProps) => {
  try {
    const response = await axios.get(`${config.BASE_URL}/questions`, {
      headers: {
        Authorization: jwt_token,
      },
    });

    return response;
  } catch (err) {
    throw err;
  }
};

type PostQuestionProps = {
  jwt_token: string;
  question: object;
};

export const postQuestion = async ({
  jwt_token,
  question,
}: PostQuestionProps) => {
  try {
    const response = await axios.post(`${config.BASE_URL}/question`, question, {
      headers: {
        Authorization: jwt_token,
      },
    });

    return response;
  } catch (error) {
    throw error;
  }
};

type GetQuestionProps = {
  jwt_token: string;
  id: string;
};

export const GetQuestionById = async ({ id, jwt_token }: GetQuestionProps) => {
  try {
    const response = await axios.get(`${config.BASE_URL}/question/${id}`, {
      headers: { Authorization: jwt_token },
    });

    return response;
  } catch (err) {
    throw err;
  }
};
