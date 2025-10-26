import { cn } from "../../../lib/utils";

const graphOptions = ["STRENGTH", "DISTRIBUTION", "VOLUME"];

interface GraphOptionsDisplayProps {
  setActiveGraph: (val: string) => void;
  activeGraph: string;
}

export const GraphOptionsDisplay = ({
  setActiveGraph,
  activeGraph,
}: GraphOptionsDisplayProps) => {
  return (
    <div className="grid grid-cols-3 divide-x-2 divide-blue-400 lg:divide-blue-500 items-center w-full h-12 lg:h-14 bg-blue-50 box-border">
      {graphOptions.map((g) => {
        const isActive = activeGraph === g;
        return (
          <div
            key={g}
            onClick={() => {
              setActiveGraph(g);
            }}
            className={cn(
              "h-12 lg:h-14 flex justify-center items-center font-semibold text-blue-400 lg:text-blue-500 cursor-pointer border-b-2 border-blue-400 group",
              isActive && "bg-blue-100"
            )}
          >
            <span
              className={cn(
                "transition-transform duration-100 text-xs lg:text-sm",
                !isActive && "group-hover:scale-95"
              )}
            >
              {g}
            </span>
          </div>
        );
      })}
    </div>
  );
};
