import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../components/ui/dialog";
import { ExerciseSelectorModalOptions } from "./ExerciseSelectorModalOptions";

interface ExerciseSelectorModalProps {
  open: boolean;
  setOpen: (val: boolean) => void;
  setExerciseId: (val: string) => void;
  setExerciseName: (val: string) => void;
}

export const ExerciseSelectorModal = ({
  open,
  setOpen,
  setExerciseId,
  setExerciseName,
}: ExerciseSelectorModalProps) => {
  return (
    <div className="h-full">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>Open</DialogTrigger>
        <DialogContent className="h-[90%] py-6">
          <DialogHeader>
            <DialogTitle className="text-center text-lg lg:text-xl text-blue-400 lg:text-blue-500">
              Select Exercise
            </DialogTitle>
          </DialogHeader>
          <ExerciseSelectorModalOptions
            setExerciseId={setExerciseId}
            setOpen={setOpen}
            setExerciseName={setExerciseName}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};
