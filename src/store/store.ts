import { create } from "zustand";
import { Store } from "./storeTypes";
import { immer } from "zustand/middleware/immer";
import { createJSONStorage, persist } from "zustand/middleware";
import { createUserSlice } from "./slices/userSlice";
import { storage } from "@storage";

export const useStore = create<Store>()(
  persist(
    immer((...params) => ({
      user: createUserSlice(...params),
    })),
    {
      name: "@Store",
      storage,
    }
  )
);
