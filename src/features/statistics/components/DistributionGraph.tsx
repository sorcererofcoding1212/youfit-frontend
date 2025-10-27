import { useCallback, useState } from "react";
import axios from "../../../lib/axios";
import type { DistributionResponse } from "../../../types/types";
import { useGraphData } from "../hooks/useGraphData";
import { PageLoader } from "../../../components/PageLoader";
import { GraphWrapper } from "./GraphWrapper";
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { DurationOptions } from "./DurationOptions";
import { MobileGraphHeader } from "./MobileGraphHeader";

const COLORS = [
  "#8884d8",
  "#82ca9d",
  "#ffc658",
  "#ff7f50",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#0088FE",
];

export const DistributionGraph = () => {
  const [duration, setDuration] = useState("3m");

  const fetchDistributionData = useCallback(async () => {
    const response = await axios.get<{
      success: boolean;
      msg?: string;
      data: DistributionResponse[];
    }>(`/app/workout/distribution?duration=${duration}`);

    return response;
  }, [duration]);

  const { graphData, loading } = useGraphData(fetchDistributionData, duration);

  const CustomTooltip = ({
    active,
    payload,
  }: {
    active?: boolean;
    payload?: {
      payload: DistributionResponse;
    }[];
  }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-2 rounded-lg shadow-lg border border-gray-200 text-sm px-4">
          <p className="font-semibold mb-1">{data.muscle}</p>
          <p className="text-blue-500">{data.volume} sets</p>
        </div>
      );
    }
    return null;
  };

  if (loading) {
    return <PageLoader />;
  }

  return (
    <>
      <MobileGraphHeader heading="Muscle Distribution" />
      {graphData.length > 0 ? (
        <>
          <GraphWrapper>
            <ResponsiveContainer
              width={"100%"}
              height={"100%"}
              className={"text-xs lg:text-sm"}
            >
              <PieChart>
                <Pie
                  className="lg:hover:cursor-pointer text-xs"
                  data={graphData}
                  dataKey={"volume"}
                  nameKey={"muscle"}
                  fill="#8884d8"
                  cx="50%"
                  cy="50%"
                  name="Muscle Group Distribution"
                >
                  {graphData.map((_, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend align="center" />
              </PieChart>
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
