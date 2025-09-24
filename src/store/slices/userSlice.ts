import { User } from "@domain";
import { StoreSlice } from "../storeTypes";

type UserStore = {
  data: User | null;
};

type UserActions = {
  setUser: (user: User) => void;
  clearUser: () => void;
};

export type UserSlice = UserStore & UserActions;

export const createUserSlice: StoreSlice<UserSlice> = (set) => ({
  data: null,
  setUser: (user) =>
    set((prevState) => {
      prevState.user.data = user;
    }),
  clearUser: () =>
    set((prevState) => {
      prevState.user.data = null;
    }),
});
