import { useMutation } from "@tanstack/react-query";
import { authService, SignupWithEmailAndPasswordParams } from "../authService";
import { User } from "@domain";
import { MutationOptions } from "@api";
import { useUserSlice } from "@store";
import { useUpdateUserNameUseCase } from "./useUpdateUserNameUseCase";
import { useToast } from "@hooks";

type SignupWithNameParams = SignupWithEmailAndPasswordParams & {
  fullName: string;
};

export function useSignupWithEmailAndPasswordUseCase(
  options: MutationOptions<User>
) {
  const { setUser } = useUserSlice();
  const { updateUserName } = useUpdateUserNameUseCase();
  const { showToast } = useToast();
  const { mutate, isPending } = useMutation<User, Error, SignupWithNameParams>({
    mutationFn: async ({ email, password, fullName }) => {
      const user = await authService.signupWithEmailAndPassword({
        email,
        password,
      });

      updateUserName(fullName);

      const updateUser = {
        ...user,
        fullName,
      };

      return updateUser;
    },
    onSuccess: (data) => {
      setUser(data);

      showToast(
        "success",
        "Conta criada com sucesso",
        "Você agora pode aproveitar o DocuScan"
      );
      options.onSuccess?.(data);
    },

    onError: (error) => {
      options.onError?.(error.message);
    },
  });

  async function signup(email: string, password: string, fullName: string) {
    mutate({ email, password, fullName });
  }

  return {
    signup,
    isPending,
  };
}
