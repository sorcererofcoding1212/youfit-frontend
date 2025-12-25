import { useState } from "react";
import type { Exercise } from "../../../types/types";

interface RoutineExerciseSelectorModalExerciseOptionProps {
  exercise: Exercise;
  setOpen: (val: boolean) => void;
  addRoutineExercise: (
    exerciseId: string,
    sets: number,
    exerciseName: string
  ) => void;
}

export const RoutineExerciseSelectorModalExerciseOption = ({
  exercise,
  setOpen,
  addRoutineExercise,
}: RoutineExerciseSelectorModalExerciseOptionProps) => {
  const [routineExerciseSets, setRoutineExerciseSets] = useState(1);
  return (
    <div
      key={exercise._id}
      className="px-6 w-[90%] mx-auto cursor-pointer my-2 flex justify-between items-center gap-x-3 lg:gap-x-4 lg:hover:scale-[99%] transition-all py-3 font-semibold opacity-75 shadow-sm rounded border-[0.5] lg:border"
      onClick={() => {
        addRoutineExercise(exercise._id, routineExerciseSets, exercise.name);
        setOpen(false);
      }}
    >
      <span>{exercise.name}</span>

      <div className="flex items-center gap-2">
        <button
          className="px-2 py-1 border rounded text-blue-500 lg:cursor-pointer"
          onClick={(e) => {
            e.stopPropagation();
            setRoutineExerciseSets((prev) => Math.max(1, prev - 1));
          }}
        >
          -
        </button>

        <span className="w-6 text-center">{routineExerciseSets}</span>

        <button
          className="px-2 py-1 border rounded text-blue-500 lg:cursor-pointer"
          onClick={(e) => {
            e.stopPropagation();
            setRoutineExerciseSets((prev) => prev + 1);
          }}
        >
          +
        </button>
      </div>
    </div>
  );
};
