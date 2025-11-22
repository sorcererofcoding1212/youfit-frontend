import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../../../components/ui/dropdown-menu";
import { CiMenuKebab } from "react-icons/ci";
import { MdDelete, MdEdit } from "react-icons/md";
import type { Set } from "../../../types/types";
import { useAppStore } from "../../../store/app.store";
import { WorkoutAreaSetMenuItem } from "./WorkoutAreaSetMenuItem";
import { useState } from "react";
import axios from "../../../lib/axios";
import { toast } from "sonner";
import { EditExerciseModal } from "../../exercise/components/EditExerciseModal";

interface WorkoutAreaSetMenuProps {
  set: Set;
  workoutId: string;
  refetch: () => void;
}

export const WorkoutAreaSetMenu = ({
  set,
  workoutId,
  refetch,
}: WorkoutAreaSetMenuProps) => {
  console.log(workoutId);
  const setEditSet = useAppStore((state) => state.setEditSet);
  const [openEditModal, setEditOpenModal] = useState(false);

  const [_, setIsDeleting] = useState(false);

  const editSetHandler = (set: Set) => {
    setEditSet(set);
    setEditOpenModal(true);
  };

  const deleteSetHandler = async () => {
    try {
      setIsDeleting(true);
      const response = await axios.delete("/app/set/delete", {
        data: {
          setId: set._id,
          workoutId,
        },
      });

      if (!response.data.success) {
        toast.error(response.data.msg || "Internal server error");
      }

      refetch();
    } catch (error) {
      console.log(error);
      toast.error("Internal server error");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <CiMenuKebab />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-36 mx-2 lg:w-24 py-2 flex flex-col text-sm"
        align="center"
      >
        <WorkoutAreaSetMenuItem
          onClick={() => {
            editSetHandler(set);
          }}
          label="Edit"
          Icon={MdEdit}
        />
        <WorkoutAreaSetMenuItem
          onClick={deleteSetHandler}
          label="Delete"
          Icon={MdDelete}
        />
      </DropdownMenuContent>
      <EditExerciseModal
        openEditModal={openEditModal}
        setOpenEditModal={setEditOpenModal}
        refetch={refetch}
        editWorkoutId={workoutId}
      />
    </DropdownMenu>
  );
};
