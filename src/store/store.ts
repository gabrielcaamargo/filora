import { create } from "zustand";
import { Store } from "./storeTypes";
import { immer } from "zustand/middleware/immer";

export const useStore = create<Store>()(
  immer((set) => ({
    user: {
      data: {
        createdAt: "",
        email: "",
        id: "",
        isNewUser: false,
      },
      setUser: (user) =>
        set((state) => {
          state.user.data = user;
        }),
    },
  }))
);
