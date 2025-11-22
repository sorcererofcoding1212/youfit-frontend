import { cn } from "../lib/utils";
import { ExerciseSelectorModal } from "./ExerciseSelectorModal";

interface ExerciseSelectorProps {
  setExerciseId: (val: string) => void;
  exerciseName: string;
  setExerciseName: (val: string) => void;
  openModal: boolean;
  setOpenModal: (val: boolean) => void;
  className?: string;
}

export const ExerciseSelector = ({
  setExerciseId,
  exerciseName,
  setExerciseName,
  openModal,
  setOpenModal,
  className,
}: ExerciseSelectorProps) => {
  return (
    <>
      <div
        onClick={() => {
          setOpenModal(true);
        }}
        className={cn(
          "h-10 lg:h-12 w-[80%] flex items-center cursor-pointer justify-center lg:w-[40%] mx-auto bg-blue-50 border-2 rounded-md mt-10 border-blue-400 lg:border-blue-500",
          className
        )}
      >
        <div className="font-medium text-blue-400 lg:text-blue-500 text-sm lg:text-base">
          Selected Exercise : {exerciseName ? exerciseName : "None"}
        </div>
      </div>
      <ExerciseSelectorModal
        setExerciseId={setExerciseId}
        open={openModal}
        setOpen={setOpenModal}
        setExerciseName={setExerciseName}
      />
    </>
  );
};
