import { useState } from "react";
import { useCategories } from "../../workout/hooks/useCategories";
import { useExercise } from "../../exercise/hooks/useExercise";
import { ScrollArea } from "../../../components/ui/scroll-area";
import { ModalLoader } from "../../../components/ModalLoader";
import { RoutineExerciseSelectorModalExerciseOption } from "./RoutineExerciseSelectorModalExerciseOption";

interface RoutineExerciseSelectorModalOptionsProps {
  setOpen: (val: boolean) => void;
  addRoutineExercise: (
    exerciseId: string,
    sets: number,
    exerciseName: string
  ) => void;
}

export const RoutineExerciseSelectorModalOptions = ({
  setOpen,
  addRoutineExercise,
}: RoutineExerciseSelectorModalOptionsProps) => {
  const [categoryId, setCategoryId] = useState<string | undefined>();

  const { categories, loading } = useCategories();
  const { exercises, isLoading } = useExercise(categoryId);

  return (
    <div className="h-full">
      {!categoryId ? (
        <ScrollArea className="mt-10 flex flex-col h-[90%]">
          {loading ? (
            <ModalLoader />
          ) : (
            categories.map((category) => (
              <div
                onClick={() => setCategoryId(category._id)}
                className="px-6 w-[90%] mx-auto cursor-pointer my-2 flex items-center gap-x-3 lg:gap-x-4 lg:hover:scale-[99%] transition-all py-3 font-semibold opacity-75 shadow-sm rounded border-[0.5] lg:border"
                key={category._id}
              >
                {category.muscleGroupName}
              </div>
            ))
          )}
        </ScrollArea>
      ) : (
        <ScrollArea className="mt-10 flex flex-col h-[90%]">
          {isLoading ? (
            <ModalLoader />
          ) : (
            exercises.map((exercise) => (
              <RoutineExerciseSelectorModalExerciseOption
                exercise={exercise}
                setOpen={setOpen}
                addRoutineExercise={addRoutineExercise}
              />
            ))
          )}
        </ScrollArea>
      )}
    </div>
  );
};
