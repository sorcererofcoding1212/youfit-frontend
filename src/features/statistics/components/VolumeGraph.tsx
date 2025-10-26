import { useCallback, useState } from "react";
import axios from "../../../lib/axios";
import { useGraphData } from "../hooks/useGraphData";
import type { VolumeResponse } from "../../../types/types";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { GraphWrapper } from "./GraphWrapper";
import { PageLoader } from "../../../components/PageLoader";
import { DurationOptions } from "./DurationOptions";
import { MobileGraphHeader } from "./MobileGraphHeader";

export const VolumeGraph = () => {
  const [duration, setDuration] = useState("3m");

  const fetchVolumeData = useCallback(async () => {
    const response = await axios.get<{
      success: boolean;
      msg?: string;
      data: VolumeResponse[];
    }>(`/app/volume?duration=${duration}`);
    return response;
  }, [duration]);

  const { graphData, loading } = useGraphData(fetchVolumeData, duration);

  if (loading) {
    return <PageLoader />;
  }

  return (
    <>
      <MobileGraphHeader heading="Workout Volume" />
      {graphData.length > 0 ? (
        <>
          <GraphWrapper className="-ml-[40px] lg:-ml-[30px]">
            <ResponsiveContainer
              width={"100%"}
              height={"100%"}
              className={"text-xs lg:text-sm"}
            >
              <BarChart data={graphData}>
                <CartesianGrid strokeDasharray={"3 3"} />
                <Bar dataKey={"volume"} name="Sets Performed" fill="#8884d8" />
                <XAxis dataKey={"date"} />
                <YAxis />
                <Legend align="right" />
                <Tooltip />
              </BarChart>
            </ResponsiveContainer>
          </GraphWrapper>
          <DurationOptions duration={duration} setDuration={setDuration} />
        </>
      ) : (
        <div className="h-72 lg:h-96 flex justify-center items-center">
          <div className="opacity-60 text-xl lg:text-2xl">
            No Data Available
          </div>
        </div>
      )}
    </>
  );
};
