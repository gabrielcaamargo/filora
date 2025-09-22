import { User } from "@domain";

type UserStore = {
  data: User;
};

type UserActions = {
  setUser: (user: User) => void;
};

export type UserSlice = UserStore & UserActions;
