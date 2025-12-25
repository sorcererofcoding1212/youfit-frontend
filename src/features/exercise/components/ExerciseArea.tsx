import { InteractiveScrollArea } from "../../../components/InteractiveScrollArea";
import { useAppStore } from "../../../store/app.store";
import type { Exercise } from "../../../types/types";

interface ExerciseAreaProps {
  exercises: Exercise[];
  setOpenModal: (val: boolean) => void;
}

export const ExerciseArea = ({
  exercises,
  setOpenModal,
}: ExerciseAreaProps) => {
  const setExercise = useAppStore((state) => state.setExercise);
  const filteredExercises = useAppStore((state) => state.filteredExercises);
  return (
    <InteractiveScrollArea className="h-[90%] w-full mt-4 pb-8 lg:pb-12 rounded-md">
      <div className="flex flex-col items-center">
        {filteredExercises.length > 0
          ? filteredExercises.map((exercise) => (
              <div
                onClick={() => {
                  setExercise(exercise);
                  setOpenModal(true);
                }}
                className="px-6 w-[90%] lg:w-[40%] cursor-pointer flex items-center gap-x-3 lg:gap-x-4 lg:hover:scale-[99%] transition-all py-3 font-semibold opacity-75 shadow-sm border-[0.5px] lg:border my-1 rounded"
                key={exercise._id}
              >
                {exercise.name}
              </div>
            ))
          : exercises.map((exercise) => (
              <div
                onClick={() => {
                  setExercise(exercise);
                  setOpenModal(true);
                }}
                className="px-6 w-[90%] lg:w-[40%] cursor-pointer flex items-center gap-x-3 lg:gap-x-4 lg:hover:scale-[99%] transition-all py-3 font-semibold opacity-75 shadow-sm border-[0.5px] lg:border my-1 rounded"
                key={exercise._id}
              >
                {exercise.name}
              </div>
            ))}
      </div>
    </InteractiveScrollArea>
  );
};
