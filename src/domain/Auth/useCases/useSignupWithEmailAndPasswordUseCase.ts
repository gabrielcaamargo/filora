import { useMutation } from "@tanstack/react-query";
import { authService, SignupWithEmailAndPasswordParams } from "../authService";
import { User } from "@domain";
import { errorHandler, MutationOptions } from "@api";
import { useUserSlice } from "@store";
import { useToast } from "@hooks";
import { saveUser } from "@database";

type SignupWithNameParams = SignupWithEmailAndPasswordParams & {
  fullName: string;
};

export function useSignupWithEmailAndPasswordUseCase(
  options: MutationOptions<User>
) {
  const { setUser } = useUserSlice();
  const { showToast } = useToast();

  const { mutate, isPending } = useMutation<User, Error, SignupWithNameParams>({
    mutationFn: async ({ email, password, fullName }) => {
      const user = await authService.signupWithEmailAndPassword({
        email,
        password,
      });

      await saveUser({
        ...user,
        fullName,
      });

      const userProfile = await authService.getUserProfile();

      return userProfile;
    },
    onSuccess: async (data) => {
      setUser(data);

      showToast(
        "success",
        "Conta criada com sucesso",
        "Você agora pode aproveitar o Filora"
      );
      options.onSuccess?.(data);
    },

    onError: (error) => {
      showToast("error", "Erro ao criar conta", errorHandler(error.message));
      options.onError?.(errorHandler(error.message));
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
