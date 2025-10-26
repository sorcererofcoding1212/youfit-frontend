import { LuChevronLeft, LuChevronRight } from "react-icons/lu";

interface ExerciseModalInputProps {
  label: string;
  value: number;
  onClickIncrease: () => void;
  onClickDecrease: () => void;
  disabled?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const ExerciseModalInput = ({
  label,
  value,
  onClickIncrease,
  onClickDecrease,
  onChange,
  disabled,
}: ExerciseModalInputProps) => {
  return (
    <div className="flex flex-col items-center gap-y-1 w-full px-6 select-none">
      <label
        htmlFor="weight"
        className="border-b-2 text-sm font-semibold pb-1 border-blue-500 w-full"
      >
        {label}
      </label>
      <div className="flex gap-x-4 mt-1 lg:mt-2 items-center">
        <LuChevronLeft
          onClick={onClickDecrease}
          className="text-2xl bg-gray-200 h-14 rounded opacity-50 cursor-pointer"
        />
        <input
          onChange={onChange}
          disabled={disabled}
          className="h-14 bg-white text-2xl font-medium border-b border-zinc-300 outline-none shadow-xs w-20 lg:w-24 text-center"
          type="text"
          value={value}
          min={0}
        />
        <LuChevronRight
          onClick={onClickIncrease}
          className="text-2xl bg-gray-200 h-14 rounded opacity-50 cursor-pointer"
        />
      </div>
    </div>
  );
};
