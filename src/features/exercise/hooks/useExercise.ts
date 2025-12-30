import { useEffect, useState } from "react";
import axios from "../../../lib/axios";
import { toast } from "sonner";
import type { Exercise } from "../../../types/types";

export const useExercise = (categoryId: string | undefined) => {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchExercisesByCategory = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`/app/exercises/${categoryId}`);

      if (!response.data.success) {
        if (response.data.msg === "Category not provided") return;
        toast.error(response.data.msg || "Internal server error");
        return;
      }

      setExercises(response.data.exercises);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchExercisesByCategory();
  }, [categoryId]);

  return { exercises, isLoading };
};
