import { create } from "zustand";
import { Store } from "./storeTypes";
import { immer } from "zustand/middleware/immer";
import { createUserSlice } from "./slices/userSlice";

export const useStore = create<Store>()(
  immer((...params) => ({
    user: createUserSlice(...params),
  }))
);
