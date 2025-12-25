import { useForm } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../../../components/ui/dialog";
import type z from "zod";
import { createRoutineSchema } from "../schema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../../../components/ui/form";
import { Input } from "../../../components/ui/input";
import { RoutineExerciseAdder } from "./RoutineExerciseAdder";
import type { RoutineExercise } from "../../../types/types";
import { LuTrash2 } from "react-icons/lu";
import { Button } from "../../../components/ui/button";
import { useState } from "react";
import { toast } from "sonner";
import axios from "../../../lib/axios";
import { cn } from "../../../lib/utils";
import { InteractiveScrollArea } from "../../../components/InteractiveScrollArea";
import { useScroll } from "../../../hooks/useScroll";

interface CreateRoutineModalProps {
  open: boolean;
  setOpen: (val: boolean) => void;
  routineExercises: RoutineExercise[];
  setRoutineExercises: React.Dispatch<React.SetStateAction<RoutineExercise[]>>;
  refetch: () => Promise<void>;
}

export const CreateRoutineModal = ({
  open,
  setOpen,
  routineExercises,
  setRoutineExercises,
  refetch,
}: CreateRoutineModalProps) => {
  const form = useForm<z.infer<typeof createRoutineSchema>>({
    resolver: zodResolver(createRoutineSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });
  const [loading, setLoading] = useState(false);
  const { scrollRef, scrollToArea } = useScroll();

  const addRoutineExercise = (
    exerciseId: string,
    sets: number,
    exerciseName: string
  ) => {
    if (routineExercises.some((r) => r.exerciseId === exerciseId)) return;
    setRoutineExercises((prev) => [
      ...prev,
      { exerciseId, sets, order: prev.length + 1, exerciseName },
    ]);
  };

  const removeRoutineExercise = (exerciseId: string) => {
    setRoutineExercises((prev) =>
      prev.filter((re) => re.exerciseId !== exerciseId)
    );
  };

  const clearValues = () => {
    form.reset();
    setRoutineExercises([]);
  };

  const createRoutine = async () => {
    try {
      setLoading(true);
      const name = form.getValues("name");
      const description = form.getValues("description");

      if (!name) {
        toast.error("Please enter name of your routine");
        return;
      }
      if (routineExercises.length < 1) {
        toast.error("No exercises added");
        return;
      }

      const response = await axios.post("/app/routine", {
        name,
        exercises: routineExercises.reverse(),
        description,
      });

      if (!response.data.success) {
        toast.error(response.data.msg || "Some error occured");
        return;
      }
      toast.success("Routine created!");
      clearValues();
      setOpen(false);
      refetch();
    } catch (error) {
      toast.error("Some error occured");
    } finally {
      setLoading(false);
    }
  };
  return (
    <Dialog
      open={open}
      onOpenChange={(val) => {
        setOpen(val);
        clearValues();
      }}
    >
      <DialogContent className="h-[80%] lg:h-[90%] py-6">
        <DialogHeader>
          <DialogTitle className="text-center text-lg lg:text-xl text-blue-400 lg:text-blue-500">
            Create new Routine
          </DialogTitle>
        </DialogHeader>
        <div className="mt-6 lg:mt-10 px-4 lg:px-6">
          <Form {...form}>
            <form className="space-y-4 py-2 px-2 lg:px-4">
              <FormField
                name="name"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        className="bg-blue-50 border-blue-200 border-2 text-blue-400 lg:text-blue-500 placeholder:text-blue-400 lg:placeholder:text-blue-500"
                        required
                        {...field}
                        placeholder="Enter routine name"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="description"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        className="bg-blue-50 border-blue-200 border-2 text-blue-400 lg:text-blue-500 placeholder:text-blue-400 lg:placeholder:text-blue-500"
                        {...field}
                        placeholder="Enter routine description"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </div>
        <InteractiveScrollArea
          onClick={scrollToArea}
          className="h-[30%] lg:h-[40%] mt-6"
        >
          {routineExercises.length > 0 &&
            routineExercises
              .sort((a, b) => a.order - b.order)
              .map((re, index) => (
                <div
                  key={index}
                  className="flex justify-center items-center gap-x-2 lg:gap-x-3"
                >
                  <div className="px-4 py-2 min-w-56 lg:min-w-64 text-center rounded-md border-2 border-blue-200 bg-blue-50 text-blue-400 mb-2 justify-center">
                    {re.exerciseName}
                  </div>
                  <div className="text-blue-300">
                    <LuTrash2
                      onClick={() => {
                        removeRoutineExercise(re.exerciseId);
                      }}
                      className="size-4.5 lg:cursor-pointer"
                    />
                  </div>
                </div>
              ))}
          <div className="h-1" ref={scrollRef}></div>
        </InteractiveScrollArea>
        <RoutineExerciseAdder addRoutineExercise={addRoutineExercise} />
        <Button
          onClick={createRoutine}
          disabled={loading}
          size={"card"}
          className={cn(
            "fixed bottom-[3%] bg-green-500 px-6 py-2 rounded-md font-semibold text-white left-[50%] z-50 -translate-x-[50%] lg:hover:bg-green-500/90",
            loading && "bg-green-400"
          )}
        >
          Confirm
        </Button>
      </DialogContent>
    </Dialog>
  );
};
