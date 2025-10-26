import { useEffect, useState } from "react";
import { DateViewer } from "../features/workout/components/DateViewer";
import axios from "../lib/axios";
import { convertToServerDate } from "../lib/utils";
import { useAppStore } from "../store/app.store";
import { WorkoutArea } from "../features/workout/components/WorkoutArea";
import { EmptyArea } from "../features/workout/components/EmptyArea";
import { PageWrapper } from "../components/PageWrapper";
import { PageLoader } from "../components/PageLoader";

const UserPage = () => {
  const date = useAppStore((state) => state.date);
  const setDate = useAppStore((state) => state.setDate);
  const [isFetching, setIsFetching] = useState(false);
  const currentDate = new Date();
  const sessionId = useAppStore((state) => state.sessionId);
  const setSessionId = useAppStore((state) => state.setSessionId);

  const fetchWorkout = async () => {
    try {
      setSessionId(null);
      setIsFetching(true);
      const response = await axios.get(
        `/app/session/${convertToServerDate(date)}`
      );
      if (response.data.success) {
        setSessionId(response.data.session._id);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    fetchWorkout();
  }, [date]);

  const goToPreviousDate = () => {
    const prevDay = new Date(date);
    prevDay.setDate(date.getDate() - 1);
    setDate(prevDay);
  };

  const goToNextDate = () => {
    const nextDay = new Date(date);
    nextDay.setDate(date.getDate() + 1);
    setDate(nextDay);
  };

  if (isFetching) {
    return <PageLoader />;
  }

  return (
    <PageWrapper className="overflow-y-hidden">
      <DateViewer
        date={date}
        currentDate={currentDate}
        goToPreviousDate={goToPreviousDate}
        goToNextDate={goToNextDate}
      />
      <div className="w-full h-full">
        {sessionId ? (
          <WorkoutArea />
        ) : (
          <EmptyArea date={date} setSessionId={setSessionId} />
        )}
      </div>
    </PageWrapper>
  );
};

export default UserPage;
