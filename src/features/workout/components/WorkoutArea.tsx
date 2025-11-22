import { useState } from "react";
import { ScrollArea } from "../../../components/ui/scroll-area";
import { cn } from "../../../lib/utils";
import { useAppStore } from "../../../store/app.store";
import type { Set } from "../../../types/types";
import { AddExerciseModal } from "../../exercise/components/AddExerciseModal";
import { useWorkouts } from "../hooks/useWorkouts";
import { EmptyArea } from "./EmptyArea";
import { IoIosTrophy } from "react-icons/io";
import { WorkoutAreaSetInformation } from "./WorkoutAreaSetInformation";
import { WorkoutAreaSetMenu } from "./WorkoutAreaSetMenu";
import { PageLoader } from "../../../components/PageLoader";
import { Button } from "../../../components/ui/button";

export const WorkoutArea = () => {
  const sessionId = useAppStore((state) => state.sessionId);
  const setExercise = useAppStore((state) => state.setExercise);
  const date = useAppStore((state) => state.date);

  const [openModal, setOpenModal] = useState(false);

  if (!sessionId) {
    return <EmptyArea />;
  }

  const { isFetching, workouts, refetch } = useWorkouts(sessionId);

  const calculateHighestLoad = (sets: Set[]) => {
    const load = sets.map((set) => set.reps * set.weight);
    const highestLoad = Math.max(...load);

    return highestLoad;
  };

  if (isFetching) {
    return <PageLoader />;
  }

  if (workouts.length === 0 && !isFetching) {
    return <EmptyArea />;
  }

  let index = 0;

  return (
    <div className="h-full py-4">
      <>
        <ScrollArea className="w-full h-[90%]">
          {workouts
            .sort((a, b) => (a.order || index++) - (b.order || index++))
            .map((workout) => {
              let highestLoadSetId = "";
              return (
                <div
                  key={workout._id}
                  className="w-[90%] lg:w-[40%] mx-auto my-2 mb-4 cursor-pointer rounded shadow-sm py-2 border"
                >
                  <div className="font-medium text-lg text-center border-b-2 border-blue-500 pb-1 opacity-80">
                    {workout.exerciseId.name}
                  </div>
                  <div className="mt-2 w-full">
                    {workout.sets.map((set) => {
                      if (highestLoadSetId.length < 1) {
                        const isHighestLoadSet =
                          set.reps * set.weight ===
                          calculateHighestLoad(workout.sets);
                        if (isHighestLoadSet) {
                          highestLoadSetId = set._id;
                        }
                      }
                      return (
                        <div
                          key={set._id}
                          className={cn(
                            "flex relative justify-between mt-3 mb-2 w-full px-6 lg:px-10 items-center"
                          )}
                        >
                          <div className="min-w-6 flex">
                            <IoIosTrophy
                              className={cn(
                                "text-blue-400",
                                highestLoadSetId === set._id
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                          </div>
                          <WorkoutAreaSetInformation
                            information={set.weight}
                            label="kgs"
                          />
                          <WorkoutAreaSetInformation
                            information={set.reps}
                            label="reps"
                          />
                          <div className="absolute right-[0%]">
                            <WorkoutAreaSetMenu
                              set={set}
                              workoutId={workout._id}
                              refetch={refetch}
                            />
                          </div>
                        </div>
                      );
                    })}
                    <div className="mt-4 flex justify-center items-center">
                      <Button
                        onClick={() => {
                          setExercise(workout.exerciseId);
                          setOpenModal(true);
                        }}
                        size={"sm"}
                        variant={"teritary"}
                        className="text-xs bg-blue-400 lg:bg-lue-500 lg:text-sm lg:h-9.5 w-20 lg:w-22"
                      >
                        Add Set
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
        </ScrollArea>
        <AddExerciseModal
          exerciseDate={date}
          openModal={openModal}
          setOpenModal={setOpenModal}
          refetch={refetch}
        />
      </>
    </div>
  );
};
