import axios from "axios";
const apiUrl = import.meta.env.VITE_BACKEND_API_URL;
const categoryApiUrl = `${apiUrl}/categories`;

export type Category = {
  id: string;
  name: string;
  color: string;
  gCalendarId: string | null;
};

async function getCategoriesApi() {
  const response = await axios.get(`${categoryApiUrl}/`, {
    withCredentials: true,
  });

  console.log("getCategoriesApi return data: ", response.data.categories);
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

  console.log("createCategoryApi return data: ", response.data.data);
  return response.data.data;
}

export { getCategoriesApi, createCategoryApi };
