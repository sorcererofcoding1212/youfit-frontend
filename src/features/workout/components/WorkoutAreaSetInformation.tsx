interface WorkoutAreaSetInformationProps {
  information: number;
  label: string;
}

export const WorkoutAreaSetInformation = ({
  information,
  label,
}: WorkoutAreaSetInformationProps) => {
  return (
    <div className="font-semibold opacity-80 min-w-14 justify-end flex gap-x-1">
      {information} <span className="text-[10px] lg:text-xs font-normal self-center">{label}</span>
    </div>
  );
};
