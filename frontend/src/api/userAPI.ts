import axios from "axios";
const apiUrl = import.meta.env.VITE_BACKEND_API_URL;
const userApiUrl = `${apiUrl}/users`;

export type User = {
  id: number;
  email: string;
  username: string | null;
  createTime: string;
  updateTime: string;
};

export interface LoginResponse {
  user: User;
  token: string;
}

async function loginApi(
  email: string,
  password: string
): Promise<LoginResponse> {
  const response = await axios.post(`${userApiUrl}/login`, {
    email: email,
    password: password,
  });

  return response.data;
}

async function signupApi(email: string, password: string) {
  const response = await axios.post(`${userApiUrl}/signup`, {
    email: email,
    password: password,
  });

  return response.data;
}

export { loginApi, signupApi };
