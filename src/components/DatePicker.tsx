import { type ReactNode } from "react";
import { Calendar } from "./ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { toast } from "sonner";

interface DatePickerProps {
  date: Date;
  open: boolean;
  setDate: (val: Date) => void;
  setOpen: (val: boolean) => void;
  children: ReactNode;
}

export const DatePicker = ({
  date,
  setDate,
  open,
  setOpen,
  children,
}: DatePickerProps) => {
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent className="w-auto overflow-hidden p-0 mx-4" align="start">
        <Calendar
          mode="single"
          selected={date}
          captionLayout="dropdown"
          onSelect={(date) => {
            const currentDate = new Date();
            if (date && date > currentDate) {
              toast.info("Select a valid date");
              setOpen(false);
              return;
            }
            setDate(date || currentDate);
            setOpen(false);
          }}
        />
      </PopoverContent>
    </Popover>
  );
};
