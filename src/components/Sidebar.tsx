import { useState, type ReactNode } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import type { IconType } from "react-icons/lib";
import { LuLogOut, LuCircleUser, LuChartPie } from "react-icons/lu";
import { DottedSeperator } from "./DottedSeperator";
import { useLocation, useNavigate } from "react-router-dom";
import { cn } from "../lib/utils";
import { useUserStore } from "../store/user.store";
import { toast } from "sonner";
import axios from "../lib/axios";

interface SidebarProps {
  children: ReactNode;
  open: boolean;
  setOpen: (val: boolean) => void;
}

interface Route {
  href?: string;
  label: string;
  icon: IconType;
  onClick?: boolean;
}

export const Sidebar = ({ children, open, setOpen }: SidebarProps) => {
  const client = useUserStore((state) => state.client);
  const setClient = useUserStore((state) => state.setClient);

  const routes: Route[] = [
    {
      label: "Logout",
      icon: LuLogOut,
      onClick: true,
    },
    {
      href: `/${client?.id}`,
      label: "Profile",
      icon: LuCircleUser,
    },
    {
      href: `/${client?.id}/statistics`,
      label: "Statistics",
      icon: LuChartPie,
    },
  ];

  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const navigate = useNavigate();

  const logoutHandler = async () => {
    if (!client) return;
    try {
      setIsLoggingOut(true);
      const response = await axios.post("/user/logout");
      if (!response.data.success) {
        toast.error(response.data.msg || "Internal server error");
        return;
      }
      setClient(null);
      navigate("/login");
    } catch (error) {
      toast.error("Some error occured");
      console.log(error);
    } finally {
      setIsLoggingOut(false);
    }
  };
  const { pathname } = useLocation();
  return (
    <Sheet onOpenChange={setOpen} open={open}>
      <SheetTrigger>{children}</SheetTrigger>
      <SheetContent className="py-4 pt-10">
        <SheetHeader className="text-center">
          <SheetTitle className="font-semibold text-2xl opacity-85">
            My Profile
          </SheetTitle>
        </SheetHeader>
        <div className="px-4">
          <DottedSeperator />
        </div>
        <div className="mt-4 flex flex-col gap-y-1">
          {routes.map((route) => {
            const isActive = route.href === pathname;
            return (
              <div
                key={route.label}
                role="button"
                onClick={() => {
                  if (isLoggingOut) return;
                  if (route.onClick) logoutHandler();
                  else if (route.href) {
                    navigate(route.href);
                    setOpen(false);
                  }
                }}
                className={cn(
                  "flex px-8 opacity-80 py-2 gap-x-4 hover:bg-slate-200 cursor-pointer items-center",
                  isActive && "bg-slate-100"
                )}
              >
                <div className="text-xl">
                  <route.icon />
                </div>
                <div className="font-medium">{route.label}</div>
              </div>
            );
          })}
        </div>
      </SheetContent>
    </Sheet>
  );
};
