import { config } from "@/config";
import axios from "axios";

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
