import { cache, useEffect, useState } from "react";
import axios from "../../../lib/axios";
import { toast } from "sonner";
import type { Category } from "../../../types/types";

export const useCategories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchCategories = cache(async () => {
    try {
      setLoading(true);

      const response = await axios.get("/app/categories");
      if (!response.data.success) {
        toast.error(response.data.msg);
        return;
      }
      setCategories(response.data.categories);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  });

  useEffect(() => {
    fetchCategories();
  }, []);

  return { loading, categories };
};
