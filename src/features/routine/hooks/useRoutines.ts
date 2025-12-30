import { useEffect, useState } from "react";
import type { Routine } from "../../../types/types";
import axios from "../../../lib/axios";
import { toast } from "sonner";

export const useRoutines = () => {
  const [fetching, setFetching] = useState(false);
  const [routines, setRoutines] = useState<Routine[]>([]);

  const fetchUserRoutines = async () => {
    try {
      setFetching(true);
      const response = await axios.get("/app/routines");
      if (!response.data.success) {
        toast.error(response.data.msg || "Some error occured");
        return;
      }
      setRoutines(response.data.routines);
    } catch (error) {
      console.log(error);
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    fetchUserRoutines();
  }, []);

  return { routines, fetching, refetch: fetchUserRoutines };
};
