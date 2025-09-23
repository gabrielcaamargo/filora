import { User } from "@domain";
import { StoreSlice } from "../storeTypes";

type UserStore = {
  data: User;
};

type UserActions = {
  setUser: (user: User) => void;
};

export type UserSlice = UserStore & UserActions;

export const createUserSlice: StoreSlice<UserSlice> = (set) => ({
  data: {
    createdAt: "",
    email: "",
    id: "",
    isNewUser: false,
    emailVerified: false,
    fullName: "",
  },
  setUser: (user) =>
    set((prevState) => {
      prevState.user.data = user;
    }),
});
