import { LuChevronLeft, LuChevronRight } from "react-icons/lu";
import { cn, formatDate } from "../../../lib/utils";

interface DateViewerProps {
  date: Date;
  currentDate: Date;
  goToPreviousDate: () => void;
  goToNextDate: () => void;
}

export const DateViewer = ({
  date,
  currentDate,
  goToNextDate,
  goToPreviousDate,
}: DateViewerProps) => {
  return (
    <div className="flex h-12 lg:h-14 bg-blue-50 justify-between px-2 lg:px-8 py-2 border-b-2 border-blue-400 lg:py-3 items-center select-none">
      <LuChevronLeft
        className="cursor-pointer text-blue-400 lg:text-blue-500 size-6"
        onClick={goToPreviousDate}
      ></LuChevronLeft>
      <div className="text-blue-400 lg:text-blue-500 font-semibold">
        {formatDate(date)}
      </div>
      <LuChevronRight
        className={cn(
          "cursor-pointer text-blue-400 lg:text-blue-500 size-6",
          currentDate.getDate() === date.getDate() && "opacity-30"
        )}
        onClick={() => {
          if (currentDate.getDate() === date.getDate()) return;
          goToNextDate();
        }}
      ></LuChevronRight>
    </div>
  );
};
