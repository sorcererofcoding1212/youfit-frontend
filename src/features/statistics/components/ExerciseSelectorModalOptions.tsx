import { useState } from "react";
import { useCategories } from "../../workout/hooks/useCategories";
import { ScrollArea } from "../../../components/ui/scroll-area";
import { useExercise } from "../../exercise/hooks/useExercise";
import { ModalLoader } from "../../../components/ModalLoader";

interface ExerciseSelectorModalOptionsProps {
  setExerciseId: (val: string) => void;
  setExerciseName: (val: string) => void;
  setOpen: (val: boolean) => void;
}

export const ExerciseSelectorModalOptions = ({
  setExerciseId,
  setOpen,
  setExerciseName,
}: ExerciseSelectorModalOptionsProps) => {
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
              <div
                onClick={() => {
                  setExerciseId(exercise._id);
                  setExerciseName(exercise.name);
                  setOpen(false);
                }}
                className="px-6 w-[90%] mx-auto cursor-pointer my-2 flex items-center gap-x-3 lg:gap-x-4 lg:hover:scale-[99%] transition-all py-3 font-semibold opacity-75 shadow-sm rounded border-[0.5] lg:border"
                key={exercise._id}
              >
                {exercise.name}
              </div>
            ))
          )}
        </ScrollArea>
      )}
    </div>
  );
};
