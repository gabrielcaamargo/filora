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
      storage: createJSONStorage(() => storage),
      partialize: (state) => ({
        user: { data: state.user.data },
      }),
      merge: (persistedState, currentState) => {
        return {
          user: {
            ...currentState.user,
            ...(persistedState as Store).user,
          },
        };
      },
      onRehydrateStorage: () => (state) => {
        if (__DEV__) {
          console.log("Rehydrating store with:", state);
        }
      },
    }
  )
);
