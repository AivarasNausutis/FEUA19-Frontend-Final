import { config } from "@/config";
import axios from "axios";

type LoginProps = {
  email: string;
  password: string;
};

export const loginUser = async ({ email, password }: LoginProps) => {
  try {
    const loginBody = {
      email: email,
      password: password,
    };

    const response = await axios.post(`${config.BASE_URL}/login`, loginBody);

    return response;
  } catch (err) {
    throw err;
  }
};

type RegisterProps = {
  email: string;
  password: string;
  name: string;
};

export const registerUser = async ({
  email,
  password,
  name,
}: RegisterProps) => {
  try {
    const RegisterBody = {
      name: name,
      email: email,
      password: password,
    };

    const response = await axios.post(
      `${config.BASE_URL}/register`,
      RegisterBody
    );

    return response;
  } catch (err) {
    throw err;
  }
};
