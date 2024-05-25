import axios from "axios";
const apiUrl = import.meta.env.VITE_BACKEND_API_URL;
const categoryApiUrl = `${apiUrl}/categories`;

export type Category = {
  id: number;
  name: string;
  color: string;
};

async function getCategoriesApi() {
  const response = await axios.get(`${categoryApiUrl}/`, {
    withCredentials: true,
  });

  return response.data.categories;
}

async function createCategoryApi(name: string, color?: string) {
  const response = await axios.post(
    `${categoryApiUrl}/`,
    {
      category: {
        name,
        color,
      },
    },
    { withCredentials: true }
  );

  return response.data.data;
}

export { getCategoriesApi, createCategoryApi };
