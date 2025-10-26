import { useParams } from "react-router-dom";
import { useExercise } from "../features/exercise/hooks/useExercise";
import { Searchbar } from "../components/Searchbar";
import { ExerciseArea } from "../features/exercise/components/ExerciseArea";
import { AddExerciseModal } from "../features/exercise/components/AddExerciseModal";
import { useState } from "react";
import { PageWrapper } from "../components/PageWrapper";
import { useAppStore } from "../store/app.store";
import { PageLoader } from "../components/PageLoader";

const ExercisePage = () => {
  const { categoryId } = useParams();
  const { exercises, isLoading } = useExercise(categoryId);
  const [openModal, setOpenModal] = useState(false);
  const date = useAppStore((state) => state.date);

  if (isLoading) {
    return <PageLoader />;
  }

  return (
    <PageWrapper className="overflow-y-hidden">
      <Searchbar />
      <ExerciseArea exercises={exercises} setOpenModal={setOpenModal} />
      <AddExerciseModal
        exerciseDate={date}
        openModal={openModal}
        setOpenModal={setOpenModal}
      />
    </PageWrapper>
  );
};

export default ExercisePage;
