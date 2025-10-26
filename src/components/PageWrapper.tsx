import type { ReactNode } from "react";
import { cn } from "../lib/utils";

interface PageWrapperProps {
  children: ReactNode;
  className?: string;
}

export const PageWrapper = ({ children, className }: PageWrapperProps) => {
  return (
    <div className={cn("pt-14 lg:pt-18 bg-gray-50 h-screen", className)}>
      {children}
    </div>
  );
};
