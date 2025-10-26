import { Label } from "../../../components/ui/label";
import { RadioGroup, RadioGroupItem } from "../../../components/ui/radio-group";
import { cn } from "../../../lib/utils";

const durationOptions = [
  { label: "Past 1 Month", value: "1m" },
  { label: "Past 3 Months", value: "3m" },
  { label: "All Time", value: "all" },
];

interface DurationOptionsProps {
  setDuration: (val: string) => void;
  duration: string;
}

export const DurationOptions = ({
  setDuration,
  duration,
}: DurationOptionsProps) => {
  return (
    <RadioGroup
      className="flex w-full justify-center gap-x-4 mt-2"
      onValueChange={(val) => setDuration(val)}
    >
      {durationOptions.map((d) => {
        const isActive = d.value === duration;
        return (
          <div
            key={d.value}
            className="flex items-center space-x-2 text-blue-400 lg:cursor-pointer"
          >
            <RadioGroupItem
              className={cn("bg-blue-50", isActive && "bg-blue-400")}
              value={d.value}
              id={d.value}
            />
            <Label
              className="text-xs lg:text-sm lg:cursor-pointer"
              htmlFor={d.value}
            >
              {d.label}
            </Label>
          </div>
        );
      })}
    </RadioGroup>
  );
};
