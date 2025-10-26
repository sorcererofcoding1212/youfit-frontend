import { useState } from "react";
import { PageWrapper } from "../components/PageWrapper";
import { Searchbar } from "../components/Searchbar";
import { CategoryArea } from "../features/session/components/CategoryArea";
import { useCategories } from "../features/workout/hooks/useCategories";
import { AddExerciseModal } from "../features/exercise/components/AddExerciseModal";
import { useAppStore } from "../store/app.store";
import { PageLoader } from "../components/PageLoader";

const SessionPage = () => {
  const { loading, categories } = useCategories();
  const [openModal, setOpenModal] = useState(false);
  const date = useAppStore((state) => state.date);

  if (loading) {
    return <PageLoader />;
  }

  return (
    <PageWrapper className="overflow-y-hidden">
      <Searchbar />
      <CategoryArea setOpenModal={setOpenModal} categories={categories} />
      <AddExerciseModal
        exerciseDate={date}
        openModal={openModal}
        setOpenModal={setOpenModal}
      />
    </PageWrapper>
  );
};

export default SessionPage;
