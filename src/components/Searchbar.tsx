import { useEffect, useRef, useState } from "react";
import { Input } from "./ui/input";
import { useAppStore } from "../store/app.store";
import axios from "../lib/axios";
import { toast } from "sonner";

interface SearchbarProps {
  setOpenExerciseMenu?: (val: boolean) => void;
}

export const Searchbar = ({ setOpenExerciseMenu }: SearchbarProps) => {
  const [filter, setFilter] = useState("");

  const setFilteredExercises = useAppStore(
    (state) => state.setFilteredExercises
  );

  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  const fetchFilteredExercises = async () => {
    try {
      const response = await axios.get(
        `/app/exercises/search?filter=${filter}`
      );
      if (!response.data.success) {
        toast.error(response.data.msg || "Internal server error");
        return;
      }

      setFilteredExercises(response.data.exercises);
      if (setOpenExerciseMenu) {
        console.log("Dropdown opened");
        setOpenExerciseMenu(true);
      }
    } catch (error) {
      console.log(error)
    }
  };

  const clearFilteredExercises = () => {
    setFilteredExercises([]);
    if (setOpenExerciseMenu) setOpenExerciseMenu(false);
  };

  useEffect(() => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(() => {
      if (filter.length > 0) {
        fetchFilteredExercises();
      } else {
        clearFilteredExercises();
      }
    }, 500);

    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, [filter]);

  return (
    <div className="flex items-center w-full space-x-2 h-12 lg:h-14 mx-auto mb-10 lg:space-x-2 border-b-2 border-blue-400 bg-blue-50 px-4 py-1 lg:py-2 lg:px-8">
      <SearchIcon className="size-4" />
      <Input
        onChange={(e) => setFilter(e.target.value)}
        type="search"
        placeholder="Search exercise"
        className="w-full border-0 h-10 bg-blue-50 shadow-none lg:text-base focus-visible:ring-[0px]"
        value={filter}
      />
    </div>
  );
};

const SearchIcon = (props: { className: string }) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="gray"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.3-4.3" />
  </svg>
);
