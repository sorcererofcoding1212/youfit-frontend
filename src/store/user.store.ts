import { create } from "zustand";
import type { IUser } from "../types/types";

interface IUserStore {
  client: IUser | null;
  setClient: (val: IUser | null) => void;
}

export const useUserStore = create<IUserStore>((set) => ({
  client: null,
  setClient: (val) => {
    set({ client: val });
  },
}));
