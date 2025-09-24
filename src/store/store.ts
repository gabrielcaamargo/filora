import { create } from "zustand";
import { Store } from "./storeTypes";
import { immer } from "zustand/middleware/immer";
import { createJSONStorage, persist } from "zustand/middleware";
import { createUserSlice } from "./slices/userSlice";
import { storage } from "@storage";

export const useStore = create<Store>()(
  immer(
    persist(
      (...params) => ({
        user: createUserSlice(...params),
      }),
      {
        name: "@Store",
        storage: createJSONStorage(() => storage),
        onRehydrateStorage: () => (state) => {
          console.log("Rehydrating store with:", state);
        },
      }
    )
  )
);
