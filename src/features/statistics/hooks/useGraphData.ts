import type { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import type { GraphResponse } from "../../../types/types";

export const useGraphData = <T extends GraphResponse>(
  fetchGraphDataFunction: () => Promise<
    AxiosResponse<{ success: boolean; msg?: string; data: T[] }>
  >,
  duration: string,
  exerciseId?: string
) => {
  const [graphData, setGraphData] = useState<T[]>([]);
  const [loading, setLoading] = useState(false);

  const getGraphData = async () => {
    try {
      setLoading(true);
      const response = await fetchGraphDataFunction();

      if (!response.data.success) {
        if (response.data.msg === "No exercise selected") return;
        toast.error(response.data.msg || "Internal server error");
        return;
      }

      const { data } = response.data;
      setGraphData(data);
    } catch (error) {
      toast.error("Internal server error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getGraphData();
  }, [duration, exerciseId]);

  return { graphData, loading };
};
