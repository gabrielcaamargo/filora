import { StateCreator } from "zustand";
import { UserSlice } from "./slices/userSlice";

export type Store = {
  user: UserSlice;
};

export type StoreSlice<T> = StateCreator<
  Store,
  [["zustand/persist", unknown], ["zustand/immer", never]],
  [],
  T
>;
