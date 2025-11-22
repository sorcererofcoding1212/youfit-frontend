import { useNavigate } from "react-router-dom";
import { ScrollArea } from "../../../components/ui/scroll-area";
import type { Category } from "../../../types/types";
import { useAppStore } from "../../../store/app.store";

interface CategoryAreaProps {
  categories: Category[];
  setOpenModal: (val: boolean) => void;
}

export const CategoryArea = ({
  categories,
  setOpenModal,
}: CategoryAreaProps) => {
  const navigate = useNavigate();
  const filteredExercises = useAppStore((state) => state.filteredExercises);
  const setExercise = useAppStore((state) => state.setExercise);
  return (
    <ScrollArea className="h-[90%] w-full my-4 pb-8 lg:pb-12 rounded-md">
      <div className="flex flex-col items-center">
        {filteredExercises.length > 0
          ? filteredExercises.map((exercise) => (
              <div
                onClick={() => {
                  setExercise(exercise);
                  setOpenModal(true);
                }}
                className="px-6 w-[90%] lg:w-[40%] cursor-pointer flex items-center gap-x-3 lg:gap-x-4 lg:hover:scale-[99%] transition-all py-3 font-semibold opacity-75 shadow-sm border-[0.5] lg:border my-1 rounded"
                key={exercise._id}
              >
                {exercise.name}
              </div>
            ))
          : categories.map((category) => (
              <div
                onClick={() => navigate(`/exercise/${category._id}`)}
                className="px-6 w-[90%] lg:w-[40%] cursor-pointer my-1 flex items-center gap-x-3 lg:gap-x-4 lg:hover:scale-[99%] transition-all py-3 font-semibold opacity-75 shadow-sm rounded border-[0.5] lg:border"
                key={category._id}
              >
                {category.muscleGroupName}
              </div>
            ))}
      </div>
    </ScrollArea>
  );
};
