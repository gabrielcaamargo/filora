import { useMutation } from "@tanstack/react-query";
import { authService, SignupWithEmailAndPasswordParams } from "../authService";
import { User } from "@domain";
import { MutationOptions } from "@api";

export function signupWithEmailAndPasswordUseCase(
  options: MutationOptions<User>
) {
  const { mutate, isPending, data } = useMutation<
    User,
    Error,
    SignupWithEmailAndPasswordParams
  >({
    mutationFn: authService.signupWithEmailAndPassword,
    onSuccess: (data) => {
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
