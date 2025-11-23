import { toast } from "sonner";
import { InteractiveScrollArea } from "../../../components/InteractiveScrollArea";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "../../../components/ui/accordion";
import type { Routine } from "../../../types/types";
import { FaTrash } from "react-icons/fa";
import { useState } from "react";
import axios from "../../../lib/axios";

interface RoutineListProps {
  routines: Routine[];
  refetch: () => void;
}

export const RoutineList = ({ routines, refetch }: RoutineListProps) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const deleteRoutine = async (routineId: string) => {
    try {
      setIsDeleting(true);
      const response = await axios.delete(`/app/routine/${routineId}`);
      if (!response.data.success) {
        toast.error(response.data.msg || "Some error occured");
      }
      toast.success("Routine deleted");
      refetch();
    } catch (error) {
      toast.error("Some error occured");
    } finally {
      setIsDeleting(false);
    }
  };
  return (
    <InteractiveScrollArea className="h-[60vh] mt-10 lg:h-[50vh] px-4">
      <Accordion
        type="single"
        collapsible
        className="w-full px-4 py-4 flex items-center space-y-3 flex-col"
      >
        {routines.map((routine) => (
          <AccordionItem
            key={routine._id}
            value={routine._id}
            className="w-full lg:w-[40%] shadow-sm px-4"
          >
            <AccordionTrigger className="font-semibold hover:no-underline lg:hover:cursor-pointer text-zinc-600">
              {routine.name}
            </AccordionTrigger>
            <AccordionContent className="pl-4 space-y-2">
              {routine.exercises.map((ex) => (
                <div
                  key={ex.exerciseId}
                  className="text-sm lg:text-blue-600 text-blue-500 opacity-80 border-b pb-2 lg:pb-3 py-3"
                >
                  {ex.exerciseName} — {ex.sets} sets
                </div>
              ))}
              <div role="button" className="mt-3 flex w-full justify-end">
                <FaTrash
                  onClick={() => {
                    if (isDeleting) return;
                    deleteRoutine(routine._id);
                  }}
                  className="text-red-500 lg:hover:cursor-pointer"
                />
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </InteractiveScrollArea>
  );
};
