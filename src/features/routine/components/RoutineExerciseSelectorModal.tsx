import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../../../components/ui/dialog";
import { RoutineExerciseSelectorModalOptions } from "./RoutineExerciseSelectorModalOptions";

interface RoutineExerciseSelectorModalProps {
  open: boolean;
  setOpen: (val: boolean) => void;
  addRoutineExercise: (
    exerciseId: string,
    sets: number,
    exerciseName: string
  ) => void;
}

export const RoutineExerciseSelectorModal = ({
  open,
  setOpen,
  addRoutineExercise,
}: RoutineExerciseSelectorModalProps) => {
  return (
    <div className="h-full">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="h-[90%] py-6">
          <DialogHeader>
            <DialogTitle className="text-center text-lg lg:text-xl text-blue-400 lg:text-blue-500">
              Select Exercise
            </DialogTitle>
          </DialogHeader>
          <RoutineExerciseSelectorModalOptions
            setOpen={setOpen}
            addRoutineExercise={addRoutineExercise}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};
