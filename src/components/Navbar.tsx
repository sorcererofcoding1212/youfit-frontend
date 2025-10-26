import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { useUserStore } from "../store/user.store";
import { LuCircleUserRound } from "react-icons/lu";
import { LuCalendarDays, LuPlus, LuMenu } from "react-icons/lu";
import { useAppStore } from "../store/app.store";
import { DatePicker } from "./DatePicker";
import { useState } from "react";
import { Sidebar } from "./Sidebar";
import { LucideHouse } from "lucide-react";

export const Navbar = () => {
  const client = useUserStore((state) => state.client);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const sessionId = useAppStore((state) => state.sessionId);
  const setDate = useAppStore((state) => state.setDate);
  const [openCalendar, setOpenCalendar] = useState(false);
  const [openSideBar, setOpenSideBar] = useState(false);

  return (
    <nav className="absolute top-0 w-full h-14 lg:h-18 py-2 lg:py-3 px-3 lg:px-6 flex justify-between items-center border-b border-b-primary/10">
      <div className="text-3xl lg:text-[40px] ubuntu-medium">
        Youfit
        <span className="text-red-500">.</span>
      </div>
      {client ? (
        <div>
          {pathname === "/" ? (
            <LuCircleUserRound
              onClick={() => {
                navigate(`/${client.id}`);
              }}
              role="button"
              className="size-6 lg:size-7 active:scale-95 cursor-pointer text-blue-400 lg:text-blue-500"
            />
          ) : (
            <div className="flex gap-x-3 items-center lg:gap-x-4">
              {pathname === `/${client.id}` ? (
                <>
                  {sessionId && (
                    <LuPlus
                      role="button"
                      onClick={() => navigate(`/workout/${sessionId}`)}
                      className="size-6 lg:size-7 active:scale-95 cursor-pointer text-blue-400 lg:text-blue-500"
                    />
                  )}
                  <DatePicker
                    date={new Date()}
                    open={openCalendar}
                    setOpen={setOpenCalendar}
                    setDate={setDate}
                  >
                    <LuCalendarDays className="size-6 lg:size-7 active:scale-95 cursor-pointer text-blue-400 lg:text-blue-500" />
                  </DatePicker>
                </>
              ) : (
                <LucideHouse
                  onClick={() => navigate(`/${client.id}`)}
                  className="size-6 lg:size-7 active:scale-95 cursor-pointer text-blue-400 lg:text-blue-500"
                />
              )}

              <Sidebar open={openSideBar} setOpen={setOpenSideBar}>
                <LuMenu
                  onClick={() => setOpenSideBar(true)}
                  className="size-6 lg:size-7 active:scale-95 cursor-pointer text-blue-400 lg:text-blue-500"
                />
              </Sidebar>
            </div>
          )}
        </div>
      ) : (
        <>
          {pathname === "/" ? (
            <div className="flex gap-x-1 items-center lg:gap-x-2">
              <Button
                onClick={() => {
                  navigate("/login");
                }}
                className="text-blue-500 hover:bg-neutral-100 hover:text-blue-400"
                variant={"ghost"}
                size={"lg"}
              >
                Log in
              </Button>
              <Button
                onClick={() => {
                  navigate("/register");
                }}
                className="bg-blue-500 hover:bg-blue-500/90"
                size={"lg"}
              >
                Sign up
              </Button>
            </div>
          ) : (
            <>
              {pathname === "/login" ? (
                <Button
                  onClick={() => {
                    navigate("/register");
                  }}
                  className="bg-blue-500 hover:bg-blue-500/90"
                  size={"lg"}
                >
                  Sign up
                </Button>
              ) : (
                <Button
                  onClick={() => {
                    navigate("/login");
                  }}
                  className="bg-blue-500 hover:bg-blue-500/90"
                  size={"lg"}
                >
                  Log In
                </Button>
              )}
            </>
          )}
        </>
      )}
    </nav>
  );
};
