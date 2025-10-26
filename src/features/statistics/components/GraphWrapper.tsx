import type { ReactNode } from "react";
import { cn } from "../../../lib/utils";

interface GraphWrapperProps {
  children: ReactNode;
  className?: string;
}

export const GraphWrapper = ({ children, className }: GraphWrapperProps) => {
  return (
    <div className="w-full flex justify-center [&_*]:outline-none [&_*]:focus:outline-none [&_*]:border-none [&_*]:focus:border-none select-none">
      <div className={cn("h-72 lg:h-96 w-[90%] lg:w-[50%]", className)}>
        {children}
      </div>
    </div>
  );
};
