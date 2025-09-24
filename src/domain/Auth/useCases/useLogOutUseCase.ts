import { MutationOptions } from "@api";
import { useToast } from "@hooks";
import { useMutation } from "@tanstack/react-query";
import { authService } from "../authService";
import { useUserSlice } from "@store";

export function useLogOutUseCase({
  onSuccess,
  onError,
}: MutationOptions<void>) {
  const { showToast } = useToast();
  const { clearUser } = useUserSlice();
  const { mutate, isPending } = useMutation<void, Error, void>({
    mutationFn: authService.logOut,
    onSuccess: () => {
      showToast(
        "success",
        "Sessão encerrada com sucesso",
        "Sua sessão foi encerrada. Voltando para a tela de login."
      );
      clearUser();
      onSuccess?.();
    },

    onError: (error) => {
      showToast("error", "Erro ao encerrar sessão", error.message);
      onError?.(error.message);
    },
  });

  function logOut() {
    mutate();
  }

  return {
    logOut,
    isPending,
  };
}
