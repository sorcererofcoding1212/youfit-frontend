import { useState } from "react";
import { PageWrapper } from "../components/PageWrapper";
import { GraphOptionsDisplay } from "../features/statistics/components/GraphOptionsDisplay";
import { GraphOverlay } from "../features/statistics/components/GraphOverlay";

const StatisticsPage = () => {
  const [activeGraph, setActiveGraph] = useState("STRENGTH");
  return (
    <PageWrapper>
      <GraphOptionsDisplay
        activeGraph={activeGraph}
        setActiveGraph={setActiveGraph}
      />
      <div className="mt-10">
        <GraphOverlay activeGraph={activeGraph} />
      </div>
    </PageWrapper>
  );
};

export default StatisticsPage;
