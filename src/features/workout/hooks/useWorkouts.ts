import { useEffect, useState } from "react";
import axios from "../../../lib/axios";
import { toast } from "sonner";
import type { Workout } from "../../../types/types";

export const useWorkouts = (sessionId: string) => {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [isFetching, setIsFetching] = useState(false);

  const fetchSessionWorkouts = async () => {
    try {
      setIsFetching(true);
      const res = await axios.get(`/app/workouts/${sessionId}`);
      if (!res.data.success) {
        toast.error(res.data.msg || "Internal server error");
        return;
      }

      setWorkouts(res.data.workouts);
    } catch (error) {
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    fetchSessionWorkouts();
  }, []);

  return { isFetching, workouts, refetch: fetchSessionWorkouts };
};
