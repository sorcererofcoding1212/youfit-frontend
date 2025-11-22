import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "../../../components/ui/accordion";
import { ScrollArea } from "../../../components/ui/scroll-area";
import type { Routine } from "../../../types/types";

interface RoutineListProps {
  routines: Routine[];
}

export const RoutineList = ({ routines }: RoutineListProps) => {
  return (
    <ScrollArea className="h-[60vh] lg:h-[50vh] px-4">
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
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </ScrollArea>
  );
};
