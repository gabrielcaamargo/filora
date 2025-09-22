import { useStore } from "../store";

export function useUserSlice() {
  const data = useStore((state) => state.user.data);
  const setUser = useStore((state) => state.user.setUser);

  return {
    data,
    setUser,
  };
}
