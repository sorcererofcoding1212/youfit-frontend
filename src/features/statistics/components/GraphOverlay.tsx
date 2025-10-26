import { DistributionGraph } from "./DistributionGraph";
import { StrengthGraph } from "./StrengthGraph";
import { VolumeGraph } from "./VolumeGraph";

interface GraphOverlayProps {
  activeGraph: string;
}

export const GraphOverlay = ({ activeGraph }: GraphOverlayProps) => {
  if (activeGraph === "STRENGTH") {
    return <StrengthGraph />;
  } else if (activeGraph === "VOLUME") {
    return <VolumeGraph />;
  } else if (activeGraph === "DISTRIBUTION") {
    return <DistributionGraph />;
  } else {
    return <div>Invalid Graph Selected</div>;
  }
};
