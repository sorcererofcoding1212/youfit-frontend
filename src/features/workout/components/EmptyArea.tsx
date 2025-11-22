import { useState } from "react";
import { Button } from "../../../components/ui/button";
import { WorkoutAdder } from "./WorkoutAdder";
import { RoutineModal } from "../../routine/components/RoutineModal";
import { useAppStore } from "../../../store/app.store";

interface EmptyAreaProps {
  refetch?: () => Promise<void>;
}

export const EmptyArea = ({ refetch }: EmptyAreaProps) => {
  const [openRoutineModal, setOpenRoutineModal] = useState(false);
  const date = useAppStore((state) => state.date);
  return (
    <div className="relative h-full">
      <div className="mt-8 flex justify-center">
        <Button
          onClick={() => {
            setOpenRoutineModal(true);
          }}
          className="bg-blue-400 lg:bg-blue-500 lg:hover:bg-blue-500/90 px-3"
          size={"card"}
        >
          Choose a Routine
        </Button>
      </div>
      <div className="absolute top-[25%] text-lg lg:text-xl opacity-60 left-[50%] -translate-x-[50%] -translate-y-[40%]">
        Workout Log Empty
      </div>
      <div className="absolute top-[50%] lg:top-[60%] left-[50%] w-full -translate-x-[50%] -translate-y-[40%]">
        <WorkoutAdder date={date} />
      </div>
      <RoutineModal
        open={openRoutineModal}
        setOpen={setOpenRoutineModal}
        refetch={refetch}
      />
    </div>
  );
};
