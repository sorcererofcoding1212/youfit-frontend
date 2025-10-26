import { DottedSeperator } from "../../../components/DottedSeperator";
import {
  Dialog,
  DialogHeader,
  DialogContent,
  DialogTitle,
} from "../../../components/ui/dialog";
import { useAppStore } from "../../../store/app.store";
import { ExerciseModalInput } from "./ExerciseModalInput";
import { Button } from "../../../components/ui/button";
import { useState } from "react";
import axios from "../../../lib/axios";
import { toast } from "sonner";
import { cn } from "../../../lib/utils";

interface AddExerciseModalProps {
  openModal: boolean;
  setOpenModal: (value: boolean) => void;
  refetch?: () => Promise<void>;
  exerciseDate: Date;
}

export const AddExerciseModal = ({
  openModal,
  setOpenModal,
  refetch,
  exerciseDate,
}: AddExerciseModalProps) => {
  const setExercise = useAppStore((state) => state.setExercise);
  const exercise = useAppStore((state) => state.exercise);
  const [isRecording, setIsRecording] = useState(false);
  const sessionId = useAppStore((state) => state.sessionId);
  const [weight, setWeight] = useState(0);
  const [reps, setReps] = useState(0);

  const inputHandler = (
    stateSetter: React.Dispatch<React.SetStateAction<number>>,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.value === "") {
      stateSetter(0);
      return;
    }

    stateSetter(parseFloat(e.target.value));
  };

  const recordExercise = async () => {
    if (!exercise || !sessionId) {
      toast.error("Invalid request");
      return;
    }

    if (reps === 0 || weight === 0) return;

    try {
      setIsRecording(true);
      const response = await axios.post("/app/workout", {
        exerciseId: exercise._id,
        sessionId,
        reps,
        weight,
        createdAt: exerciseDate,
      });

      if (!response.data.success) {
        toast.error(response.data.msg);
        return;
      }

      if (refetch) refetch();
      setExercise(null);
      setOpenModal(false);
      clearValues();
    } catch (error) {
      console.log(error);
    } finally {
      setIsRecording(false);
    }
  };

  const clearValues = () => {
    setWeight(0);
    setReps(0);
  };

  return (
    <Dialog
      open={openModal}
      onOpenChange={(val) => {
        setExercise(null);
        clearValues();
        setOpenModal(val);
      }}
    >
      <DialogContent className="rounded-xl p-6 h-[60%] w-[100%] flex justify-between flex-col gap-y-2 lg:gap-y-4 lg:w-[80vw]">
        <DialogHeader>
          <DialogTitle className="text-center">{exercise?.name}</DialogTitle>
        </DialogHeader>
        <div className="px-6">
          <DottedSeperator />
        </div>
        <div className="flex flex-col gap-y-2 py-2 lg:py-4 lg:gap-y-4 items-center w-full">
          <ExerciseModalInput
            disabled={isRecording}
            onClickIncrease={() => setWeight((prev) => prev + 2.5)}
            onClickDecrease={() =>
              setWeight((prev) => {
                if (prev === 0) return prev;
                return prev - 2.5;
              })
            }
            value={weight}
            label="WEIGHT"
            onChange={(e) => inputHandler(setWeight, e)}
          />
          <ExerciseModalInput
            disabled={isRecording}
            onClickIncrease={() => setReps((prev) => prev + 1)}
            onClickDecrease={() =>
              setReps((prev) => {
                if (prev === 0) return prev;
                return prev - 1;
              })
            }
            value={reps}
            label="REPS"
            onChange={(e) => inputHandler(setReps, e)}
          />
        </div>
        <div className="flex justify-between w-full mt-2">
          <Button
            disabled={isRecording}
            onClick={clearValues}
            size={"lg"}
            variant={"teritary"}
            className={cn(isRecording && "bg-cyan-200")}
          >
            Clear
          </Button>
          <Button
            disabled={isRecording}
            onClick={recordExercise}
            size={"lg"}
            variant={"teritary"}
            className={cn(isRecording && "bg-cyan-200")}
          >
            Save
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
