import { DottedSeperator } from "../../../components/DottedSeperator";
import {
  DialogContent,
  Dialog,
  DialogHeader,
  DialogTitle,
} from "../../../components/ui/dialog";
import { ExerciseModalInput } from "../../exercise/components/ExerciseModalInput";

interface RoutineExerciseSetSelectorModalProps {
  exerciseName: string;
  sets: number;
  setSets: React.Dispatch<React.SetStateAction<number>>;
  open: boolean;
  setOpen: (val: boolean) => void;
}

export const RoutineExerciseSetSelectorModal = ({
  exerciseName,
  sets,
  setSets,
  open,
  setOpen,
}: RoutineExerciseSetSelectorModalProps) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogHeader>
        <DialogTitle className="text-center">{exerciseName}</DialogTitle>
      </DialogHeader>
      <div className="px-6">
        <DottedSeperator />
      </div>
      <div className="mt-4">
        <ExerciseModalInput
          disabled={false}
          onClickIncrease={() => setSets((prev) => prev + 1)}
          onClickDecrease={() =>
            setSets((prev) => {
              if (prev === 0) return prev;
              return prev - 1;
            })
          }
          value={sets}
          label="SETS"
          onChange={(e) => setSets(e.target.valueAsNumber)}
        />
      </div>
      <DialogContent className="rounded-xl p-6 h-[40%] w-[100%] flex justify-between flex-col gap-y-2 lg:gap-y-4 lg:w-[80vw]"></DialogContent>
    </Dialog>
  );
};
