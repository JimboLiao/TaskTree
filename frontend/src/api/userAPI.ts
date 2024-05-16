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

async function loginApi(email: string, password: string): Promise<User> {
  const response = await axios.post(
    `${userApiUrl}/login`,
    {
      email: email,
      password: password,
    },
    { withCredentials: true }
  );

  return response.data.user;
}

async function signupApi(email: string, password: string) {
  const response = await axios.post(`${userApiUrl}/signup`, {
    email: email,
    password: password,
  });

  return response.data;
}

async function googleLoginApi(): Promise<{ url: string }> {
  const response = await axios.post(`${userApiUrl}/googleLogin`);
  return response.data;
}

async function getUserProfileApi(): Promise<User> {
  const response = await axios.get(`${userApiUrl}/`, {
    withCredentials: true, // include cookies in request
  });

  return response.data.user;
}

async function logoutApi() {
  await axios.post(`${userApiUrl}/logout`, undefined, {
    withCredentials: true,
  });
}

export { loginApi, signupApi, googleLoginApi, getUserProfileApi, logoutApi };
