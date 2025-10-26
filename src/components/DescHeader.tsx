import { cn } from "../lib/utils";

interface DescHeaderProps {
  desc: string;
  isColored?: boolean;
}

export const DescHeader = ({ desc, isColored }: DescHeaderProps) => {
  return (
    <div className={cn("text-4xl lg:text-6xl ubuntu-medium", isColored && "text-blue-500")}>
      {desc}
    </div>
  );
};
