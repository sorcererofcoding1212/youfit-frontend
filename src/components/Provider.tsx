import type { ReactNode } from "react";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "./ui/sonner";
import { useIsMobile } from "../hooks/use-mobile";

export const Provider = ({ children }: { children: Readonly<ReactNode> }) => {
  const isMobile = useIsMobile();
  return (
    <>
      <Toaster
        position={isMobile ? "top-center" : "bottom-right"}
        style={{ backgroundColor: "red" }}
      />
      <BrowserRouter>{children}</BrowserRouter>
    </>
  );
};
