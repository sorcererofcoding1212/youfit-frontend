import { DropdownMenuItem } from "../../../components/ui/dropdown-menu";
import type { IconType } from "react-icons/lib";

interface WorkoutAreaSetMenuItemProps {
  Icon: IconType;
  onClick: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  label: string;
  disabled?: boolean;
}

export const WorkoutAreaSetMenuItem = ({
  Icon,
  onClick,
  label,
  disabled,
}: WorkoutAreaSetMenuItemProps) => {
  return (
    <DropdownMenuItem
      onClick={(e) => {
        if (disabled) return;
        onClick(e);
      }}
      className="flex px-4 gap-x-3 py-1 hover:outline-none items-center"
    >
      <div>
        <Icon />
      </div>
      <div>{label}</div>
    </DropdownMenuItem>
  );
};
