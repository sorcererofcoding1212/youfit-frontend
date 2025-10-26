import { WorkoutAdder } from "./WorkoutAdder";

interface EmptyAreaProps {
  date: Date;
  setSessionId: (val: string) => void;
}

export const EmptyArea = ({ date, setSessionId }: EmptyAreaProps) => {
  return (
    <>
      <div className="absolute top-[40%] text-lg lg:text-xl opacity-60 left-[50%] -translate-x-[50%] -translate-y-[40%]">
        Workout Log Empty
      </div>
      <WorkoutAdder date={date} setSessionId={setSessionId} />
    </>
  );
};
