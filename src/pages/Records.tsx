import { useEffect, useState } from "react";
import { PageWrapper } from "../components/PageWrapper";
import { ExerciseSelector } from "../components/ExerciseSelector";
import { cn } from "../lib/utils";
import axios from "../lib/axios";
import { toast } from "sonner";
import type { RecordSetResponse } from "../types/types";
import { ComponentLoader } from "../components/ComponentLoader";

const RecordsPage = () => {
  const [exerciseId, setExerciseId] = useState("");
  const [exerciseName, setExerciseName] = useState("");
  const [openExerciseSelectorModal, setOpenExerciseSelectorModal] =
    useState(false);
  const [recordSetData, setRecordSetData] = useState<RecordSetResponse>(null);
  const [loading, setLoading] = useState(false);

  const getExerciseRecordSet = async () => {
    try {
      setLoading(true);
      if (!exerciseId || loading) return;
      const response = await axios.get(`/app/record/${exerciseId}`);
      if (!response.data.success) {
        setRecordSetData(null);
        return;
      }
      setRecordSetData(response.data.recordSetDetails);
    } catch (error) {
      console.log(error);
      toast.error("Some error occured");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getExerciseRecordSet();
  }, [exerciseId]);
  return (
    <PageWrapper>
      <div className="text-blue-400 text-xl lg:text-3xl mt-8 text-center font-medium">
        My Personal Records
      </div>
      <div className="h-40 lg:h-56 mt-10 flex justify-center items-center">
        <div
          onClick={() => {
            if (exerciseId) return;
            setOpenExerciseSelectorModal(true);
          }}
          role={!exerciseId ? "button" : "none"}
          className={cn(
            "text-xl lg:text-2xl",
            !exerciseId &&
              "cursor-pointer opacity-60 active:px-6 active:py-3 active:rounded-md active:text-blue-500 active:hover:bg-blue-100 lg:hover:py-4 lg:hover:bg-blue-100 lg:hover:text-blue-700 lg:hover:px-8 lg:hover:rounded-md active:bg-blue-100"
          )}
        >
          {loading ? (
            <ComponentLoader />
          ) : recordSetData ? (
            <div className="flex flex-col justify-center text-lg lg:text-xl items-center gap-y-1 lg:gap-y-2 text-blue-400">
              <div className="font-semibold">
                Personal Record : {recordSetData.recordSet.weight}kg x{" "}
                {recordSetData.recordSet.reps}reps
              </div>
              <div className="text-sm lg:text-base text-center font-semibold">
                Lifted on :{" "}
                {recordSetData.recordSet.createdAt
                  ? (() => {
                      const d = new Date(recordSetData.recordSet.createdAt);
                      const day = String(d.getDate()).padStart(2, "0");
                      const month = String(d.getMonth() + 1).padStart(2, "0");
                      const year = d.getFullYear();
                      return `${day}-${month}-${year}`;
                    })()
                  : ""}
              </div>
              <div className="text-sm lg:text-base text-center font-semibold">
                Estimated One Rep Max :{" "}
                {recordSetData.estimatedOneRepMax.toFixed(2)}
              </div>
            </div>
          ) : exerciseId ? (
            "No Data Available"
          ) : (
            "Click To Select Exercise"
          )}
        </div>
      </div>
      <div className="flex justify-center">
        <ExerciseSelector
          exerciseName={exerciseName}
          setExerciseId={setExerciseId}
          setExerciseName={setExerciseName}
          openModal={openExerciseSelectorModal}
          setOpenModal={setOpenExerciseSelectorModal}
        />
      </div>
    </PageWrapper>
  );
};

export default RecordsPage;
