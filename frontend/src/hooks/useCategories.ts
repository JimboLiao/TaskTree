import { useEffect, useState } from "react";
import { getCategoriesApi } from "../api/categoryAPI";
import { Category } from "../../../config/type";

function useCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategoriesApi();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  function updateCategories(newCategories: Category[]) {
    setCategories(newCategories);
  }

  return { categories, updateCategories };
}

export default useCategories;
