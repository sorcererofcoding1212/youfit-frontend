import { useState } from "react";
import axios from "../../../lib/axios";
import { useGraphData } from "../hooks/useGraphData";
import { GraphWrapper } from "./GraphWrapper";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { StrengthResponse } from "../../../types/types";
import { DurationOptions } from "./DurationOptions";
import { PageLoader } from "../../../components/PageLoader";
import { ExerciseSelector } from "./ExerciseSelector";
import { cn } from "../../../lib/utils";
import { MobileGraphHeader } from "./MobileGraphHeader";

export const StrengthGraph = () => {
  const [duration, setDuration] = useState("3m");
  const [exerciseId, setExerciseId] = useState("");
  const [exerciseName, setExerciseName] = useState("");
  const [openExerciseSelectorModal, setOpenExerciseSelectorModal] =
    useState(false);

  const fetchStrengthData = async () => {
    const response = await axios.get<{
      success: boolean;
      msg?: string;
      data: StrengthResponse[];
    }>(`/app/exercise/details?exercise=${exerciseId}`);
    return response;
  };

  const { graphData, loading } = useGraphData(
    fetchStrengthData,
    duration,
    exerciseId
  );

  if (loading) {
    return <PageLoader />;
  }

  const CustomTooltip = ({
    active,
    payload,
  }: {
    active?: boolean;
    payload?: {
      payload: StrengthResponse;
    }[];
  }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-2 rounded-lg shadow-lg border border-gray-200 text-sm">
          <p className="font-semibold mb-1">{data.date}</p>
          <p className="text-blue-500">
            <span>Weight:</span> {data.weight} kg
          </p>
          <p className="text-blue-500">
            <span>Reps:</span> {data.reps}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <>
      <MobileGraphHeader heading="Strength Progression" />
      {graphData.length > 0 ? (
        <>
          <GraphWrapper className="-ml-[40px] lg:-ml-[30px]">
            <ResponsiveContainer
              width={"100%"}
              height={"100%"}
              className={"text-xs lg:text-sm"}
            >
              <LineChart data={graphData}>
                <CartesianGrid strokeDasharray={"3 3"} />
                <Line name="Strength Progression" dataKey={"load"} />
                <XAxis dataKey={"date"} />
                <YAxis />
                <Tooltip content={<CustomTooltip />} />
                <Legend align="right" />
              </LineChart>
            </ResponsiveContainer>
          </GraphWrapper>
          <DurationOptions duration={duration} setDuration={setDuration} />
        </>
      ) : (
        <div className="h-72 lg:h-96 flex justify-center items-center">
          <div
            onClick={() => {
              if (exerciseId) return;
              setOpenExerciseSelectorModal(true);
            }}
            role={!exerciseId ? "button" : "none"}
            className={cn(
              "opacity-60 text-xl lg:text-2xl",
              !exerciseId &&
                "cursor-pointer lg:hover:py-4 lg:hover:bg-blue-100 lg:hover:text-blue-700  lg:hover:px-8 lg:hover:rounded-md active:bg-blue-100"
            )}
          >
            {exerciseId ? "No Data Available" : "Click To Select Exercise"}
          </div>
        </div>
      )}
      <ExerciseSelector
        exerciseName={exerciseName}
        setExerciseName={setExerciseName}
        setExerciseId={setExerciseId}
        openModal={openExerciseSelectorModal}
        setOpenModal={setOpenExerciseSelectorModal}
      />
    </>
  );
};
