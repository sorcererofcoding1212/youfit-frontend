import { useState } from "react";
import { RoutineExerciseSelectorModal } from "./RoutineExerciseSelectorModal";

interface RoutineExerciseAdderProps {
  addRoutineExercise: (
    exerciseId: string,
    sets: number,
    exerciseName: string
  ) => void;
}

export const RoutineExerciseAdder = ({
  addRoutineExercise,
}: RoutineExerciseAdderProps) => {
  const [
    openRoutineExerciseSelectorModal,
    setOpenRoutineExerciseSelectorModal,
  ] = useState(false);
  return (
    <>
      <div
        onClick={() => {
          setOpenRoutineExerciseSelectorModal(true);
        }}
        className="h-10 lg:h-12 w-[80%] flex items-center cursor-pointer justify-center mx-auto bg-blue-50 border-2 rounded-md mt-10 border-blue-200 lg:border-blue-300 text-blue-400"
      >
        Select Exercise
      </div>
      <RoutineExerciseSelectorModal
        open={openRoutineExerciseSelectorModal}
        setOpen={setOpenRoutineExerciseSelectorModal}
        addRoutineExercise={addRoutineExercise}
      />
    </>
  );
};
