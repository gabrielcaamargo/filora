import { useMutation } from "@tanstack/react-query";
import { authService, SignupWithEmailAndPasswordParams } from "../authService";
import { User } from "@domain";
import { MutationOptions } from "@api";
import { useUserSlice } from "@store";

export function useSignupWithEmailAndPasswordUseCase(
  options: MutationOptions<User>
) {
  const { setUser } = useUserSlice();
  const { mutate, isPending } = useMutation<
    User,
    Error,
    SignupWithEmailAndPasswordParams
  >({
    mutationFn: authService.signupWithEmailAndPassword,
    onSuccess: (data) => {
      setUser(data);
      options.onSuccess?.(data);
    },

    onError: (error) => {
      options.onError?.(error.message);
    },
  });

  async function signup(email: string, password: string) {
    mutate({ email, password });
  }

  return {
    signup,
    isPending,
  };
}
