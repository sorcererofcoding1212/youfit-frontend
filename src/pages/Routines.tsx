import { useState } from "react";
import { PageWrapper } from "../components/PageWrapper";
import { Button } from "../components/ui/button";
import { CreateRoutineModal } from "../features/routine/components/CreateRoutineModal";
import { useRoutines } from "../features/routine/hooks/useRoutines";
import type { RoutineExercise } from "../types/types";
import { RoutineList } from "../features/routine/components/RoutineList";
import { ComponentLoader } from "../components/ComponentLoader";

const RoutinesPage = () => {
  const { routines, fetching, refetch } = useRoutines();
  const [openCreateRoutineModal, setOpenCreateRoutineModal] = useState(false);
  const [routineExercises, setRoutineExercises] = useState<RoutineExercise[]>(
    []
  );

  return (
    <PageWrapper>
      <div className="text-blue-400 text-xl lg:text-3xl mt-8 text-center font-medium">
        My Routines
      </div>
      <div className="mt-10">
        <div className="flex justify-center pb-10 h-full items-center">
          <Button
            onClick={() => {
              setOpenCreateRoutineModal(true);
            }}
            className="bg-blue-400 px-3 lg:bg-blue-500 lg:hover:bg-blue-500/90"
            size={"card"}
          >
            Create a new Routine
          </Button>
        </div>
        {fetching ? (
          <div className="mt-20">
            <ComponentLoader />
          </div>
        ) : (
          routines.length > 0 && <RoutineList refetch={refetch} routines={routines} />
        )}
        <CreateRoutineModal
          routineExercises={routineExercises}
          setRoutineExercises={setRoutineExercises}
          open={openCreateRoutineModal}
          setOpen={setOpenCreateRoutineModal}
          refetch={refetch}
        />
      </div>
    </PageWrapper>
  );
};

export default RoutinesPage;
