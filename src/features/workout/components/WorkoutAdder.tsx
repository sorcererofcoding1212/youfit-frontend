import { LuPlus } from "react-icons/lu";
import axios from "../../../lib/axios";
import { useState } from "react";
import { toast } from "sonner";
import { convertToServerDate } from "../../../lib/utils";
import { useNavigate } from "react-router-dom";

interface WorkoutAdderProps {
  date: Date;
  setSessionId: (val: string) => void;
}

export const WorkoutAdder = ({ date, setSessionId }: WorkoutAdderProps) => {
  const [isAdding, setIsAdding] = useState(false);
  const navigate = useNavigate();

  const createNewWorkout = async () => {
    if (isAdding) return;
    try {
      setIsAdding(true);
      const response = await axios.post(
        `/app/session/${convertToServerDate(date)}`
      );
      if (!response.data.success) {
        if (response.data.msg === "Workout already exists for this day") {
          navigate(`/workout/${response.data.session._id}`);
          return;
        }
        toast.error(response.data.msg || "Internal server error");
        return;
      }
      setSessionId(response.data.session._id);
      navigate(`/workout/${response.data.session._id}`);
    } catch (error) {
      toast.error("Internal server error");
    } finally {
      setIsAdding(false);
    }
  };
  return (
    <div className="absolute flex flex-col items-center bottom-[20%] -translate-y-[20%] left-[50%] -translate-x-[50%]">
      <div className="p-3 lg:p-2 rounded-full bg-blue-50 lg:bg-blue-100 cursor-pointer">
        <LuPlus
          role="button"
          onClick={createNewWorkout}
          className="size-6 lg:size-8 text-blue-400 lg:text-blue-500"
        />
      </div>
      <div className="mt-2 opacity-60 text-sm lg:text-base">
        Start New Workout
      </div>
    </div>
  );
};
