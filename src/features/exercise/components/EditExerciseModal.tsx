import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../../../components/ui/dialog";
import { ExerciseModalInput } from "./ExerciseModalInput";
import { DottedSeperator } from "../../../components/DottedSeperator";
import { useAppStore } from "../../../store/app.store";
import { useEffect, useState } from "react";
import { Button } from "../../../components/ui/button";
import { cn } from "../../../lib/utils";
import { toast } from "sonner";
import axios from "../../../lib/axios";

interface EditExerciseModalProps {
  openEditModal: boolean;
  setOpenEditModal: (val: boolean) => void;
  editWorkoutId: string;
  refetch?: () => void;
}

export const EditExerciseModal = ({
  openEditModal,
  setOpenEditModal,
  editWorkoutId,
  refetch,
}: EditExerciseModalProps) => {
  const setEditSet = useAppStore((state) => state.setEditSet);
  const editSet = useAppStore((state) => state.editSet);

  const [weight, setWeight] = useState(editSet?.weight || 0);
  const [reps, setReps] = useState(editSet?.reps || 0);

  useEffect(() => {
    if (!editSet) {
      setOpenEditModal(false);
      return;
    }

    setReps(editSet.reps);
    setWeight(editSet.weight);
  }, [editSet]);

  const [isEditing, setIsEditing] = useState(false);

  const clearValues = () => {
    setWeight(0);
    setReps(0);
  };

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

  const recordEdit = async () => {
    try {
      if (!editSet || !editWorkoutId) return;
      if (reps === editSet.reps && weight === editSet.weight) {
        setOpenEditModal(false);
        return;
      }
      setIsEditing(true);
      const response = await axios.put("/app/set/edit", {
        weight,
        reps,
        setId: editSet._id,
        workoutId: editWorkoutId,
      });

      if (!response.data.success) {
        toast.error(response.data.msg || "Internal server error");
        return;
      }

      if (refetch) refetch();
      setEditSet(null);
      setOpenEditModal(false);
    } catch (error) {
      console.log(error);
      toast.error("Internal server error");
    } finally {
      setIsEditing(false);
    }
  };

  return (
    <Dialog
      open={openEditModal}
      onOpenChange={(val) => {
        setEditSet(null);
        clearValues();
        setOpenEditModal(val);
      }}
    >
      <DialogContent className="rounded-xl p-6 h-[60%] w-[100%] flex justify-between flex-col gap-y-2 lg:gap-y-4 lg:w-[80vw]">
        <DialogHeader>
          <DialogTitle className="text-center">Edit</DialogTitle>
        </DialogHeader>
        <div className="px-6">
          <DottedSeperator />
        </div>
        <div className="flex flex-col gap-y-2 py-2 lg:py-4 lg:gap-y-4 items-center w-full">
          <ExerciseModalInput
            disabled={isEditing}
            onClickIncrease={() => setWeight((prev) => prev + 2.5)}
            onClickDecrease={() =>
              setWeight((prev) => {
                if (prev === 0) return prev;
                return prev - 2.5;
              })
            }
            label="WEIGHT"
            value={weight}
            onChange={(e) => inputHandler(setWeight, e)}
          />
          <ExerciseModalInput
            disabled={isEditing}
            onClickIncrease={() => setReps((prev) => prev + 1)}
            onClickDecrease={() =>
              setReps((prev) => {
                if (prev === 0) return prev;
                return prev - 1;
              })
            }
            label="REPS"
            value={reps}
            onChange={(e) => inputHandler(setReps, e)}
          />
        </div>
        <div className="flex justify-between w-full mt-2">
          <Button
            disabled={isEditing}
            onClick={clearValues}
            size={"lg"}
            variant={"teritary"}
            className={cn(isEditing && "bg-cyan-200")}
          >
            Clear
          </Button>
          <Button
            disabled={isEditing}
            onClick={recordEdit}
            size={"lg"}
            variant={"teritary"}
            className={cn(isEditing && "bg-cyan-200")}
          >
            Save
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
