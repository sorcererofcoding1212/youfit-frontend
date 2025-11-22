import { ModalLoader } from "../../../components/ModalLoader";
import { Button } from "../../../components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../components/ui/dialog";
import { ScrollArea } from "../../../components/ui/scroll-area";
import { useRoutines } from "../hooks/useRoutines";
import { useAppStore } from "../../../store/app.store";
import axios from "../../../lib/axios";
import { convertToServerDate } from "../../../lib/utils";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../../../store/user.store";

interface RoutineModalProps {
  open: boolean;
  setOpen: (val: boolean) => void;
  refetch?: () => Promise<void>;
}

export const RoutineModal = ({ open, setOpen, refetch }: RoutineModalProps) => {
  const { routines, fetching } = useRoutines();
  const sessionId = useAppStore((state) => state.sessionId);
  const setSessionId = useAppStore((state) => state.setSessionId);
  const date = useAppStore((state) => state.date);
  const navigate = useNavigate();
  const client = useUserStore((state) => state.client);

  const createWorkout = async (routineId: string) => {
    try {
      if (!sessionId) {
        const response = await axios.post(
          `/app/session/${convertToServerDate(date)}`
        );
        if (!response.data.success) {
          toast.error("Some error occured");
          return;
        }
        const { data } = await axios.post(
          `/app/routine/${routineId}/${response.data.session._id}`
        );

        if (!data.success) {
          toast.error(data.msg || "Some error occured");
          return;
        }
        setSessionId(response.data.session._id);
        toast.success("Workout created");
        setOpen(false);
      } else {
        const { data } = await axios.post(
          `/app/routine/${routineId}/${sessionId}`
        );

        if (!data.success) {
          toast.error(data.msg || "Some error occured");
          return;
        }
        if (refetch) refetch();
        toast.success("Workout created");
        setOpen(false);
      }
    } catch (error) {
      toast.error("Some error occured");
    }
  };
  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>Open</DialogTrigger>
        <DialogContent className="h-[70%] lg:h-[80%] py-6">
          <DialogHeader>
            <DialogTitle className="text-center text-lg lg:text-xl text-blue-400 lg:text-blue-500">
              {routines.length < 1 ? "No Routines Available" : "Select Routine"}
            </DialogTitle>
          </DialogHeader>
          {routines.length < 1 ? (
            <div className="flex justify-center pb-20 h-full items-center">
              <Button
                onClick={() => {
                  if (!client) return;
                  navigate(`/${client.id}/routines`);
                }}
                className="bg-blue-400 px-3 lg:bg-blue-500 lg:hover:bg-blue-500/90"
                size={"card"}
              >
                Create a new Routine
              </Button>
            </div>
          ) : (
            <ScrollArea className="mt-10 flex flex-col h-[90%]">
              {fetching ? (
                <ModalLoader />
              ) : (
                routines.map((routine) => (
                  <div
                    onClick={() => {
                      createWorkout(routine._id);
                    }}
                    className="px-6 w-[90%] mx-auto cursor-pointer my-2 flex items-center gap-x-3 lg:gap-x-4 lg:hover:scale-[99%] transition-all py-3 font-semibold opacity-75 shadow-sm rounded border-[0.5] lg:border"
                    key={routine._id}
                  >
                    {routine.name}
                  </div>
                ))
              )}
            </ScrollArea>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};
