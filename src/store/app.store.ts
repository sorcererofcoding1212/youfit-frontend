import { create } from "zustand";
import type { Exercise, Set } from "../types/types";

interface IAppStore {
  sessionId: string | null;
  setSessionId: (val: string | null) => void;
  exercise: Exercise | null;
  setExercise: (val: Exercise | null) => void;
  editSet: Set | null;
  editWorkoutId: string | null;
  setEditWorkoutId: (val: string | null) => void;
  setEditSet: (val: null | Set) => void;
  date: Date;
  setDate: (val: Date) => void;
  filteredExercises: Exercise[];
  setFilteredExercises: (val: Exercise[]) => void;
}

export const useAppStore = create<IAppStore>((set) => ({
  sessionId: null,
  setSessionId: (val) => {
    set({ sessionId: val });
  },
  exercise: null,
  setExercise: (val) => {
    set({ exercise: val });
  },
  editSet: null,
  setEditSet: (val) => {
    set({ editSet: val });
  },
  editWorkoutId: null,
  setEditWorkoutId: (val) => {
    set({ editWorkoutId: val });
  },
  date: new Date(),
  setDate: (val) => {
    set({ date: val });
  },
  filteredExercises: [],
  setFilteredExercises: (val) => {
    set({ filteredExercises: val });
  },
}));
