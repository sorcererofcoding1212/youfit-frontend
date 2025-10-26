import type { ReactNode } from "react";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "./ui/sonner";

export const Provider = ({ children }: { children: Readonly<ReactNode> }) => {
  return (
    <>
      <Toaster />
      <BrowserRouter>{children}</BrowserRouter>
    </>
  );
};
