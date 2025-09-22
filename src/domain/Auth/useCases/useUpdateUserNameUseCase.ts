import { useMutation } from "@tanstack/react-query";
import { authService } from "../authService";
import { MutationOptions } from "@api";

export function useUpdateUserNameUseCase({
  onSuccess,
  onError,
}: MutationOptions<void> = {}) {
  const { mutate, isPending } = useMutation<void, Error, string>({
    mutationFn: authService.updateUserName,
    retry: 3,
    retryDelay: 500,
    onSuccess,
    onError: (error) => {
      onError?.(error.message);
    },
  });

  function updateUserName(name: string) {
    mutate(name);
  }

  return {
    updateUserName,
    isPending,
  };
}
