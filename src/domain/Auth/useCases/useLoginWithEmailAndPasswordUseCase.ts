import { errorHandler, MutationOptions } from "@api";
import { User } from "../../User/userTypes";
import { authService, LoginWithEmailAndPasswordParams } from "../authService";
import { useToast } from "@hooks";
import { useMutation } from "@tanstack/react-query";
import { useUserSlice } from "@store";
import { saveUser } from "@database";

export function useLoginWithEmailAndPasswordUseCase({
  onSuccess,
  onError,
}: MutationOptions<User>) {
  const { showToast } = useToast();
  const { setUser } = useUserSlice();

  const { mutate, isPending } = useMutation<
    User,
    Error,
    LoginWithEmailAndPasswordParams
  >({
    mutationFn: async (data) => {
      const user = await authService.loginWithEmailAndPassword(data);
      const userProfile = await authService.getUserProfile();

      if (!user.isNewUser) {
        userProfile.isNewUser = false;
        saveUser({
          ...userProfile,
          isNewUser: false,
        });
      }

      return userProfile;
    },
    onSuccess: (data) => {
      showToast(
        "success",
        "Login realizado com sucesso",
        "Você agora pode aproveitar o Filora"
      );
      setUser(data);
      onSuccess?.(data);
    },

    onError: (error) => {
      console.log(error);
      showToast("error", "Erro ao fazer login", errorHandler(error.message));
      onError?.(errorHandler(error.message));
    },
  });

  function login(email: string, password: string) {
    mutate({ email, password });
  }

  return {
    login,
    isPending,
  };
}
