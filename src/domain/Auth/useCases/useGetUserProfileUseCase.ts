import { QueryKeys } from "@api";
import { useQuery } from "@tanstack/react-query";
import { authService } from "../authService";

export function useGetUserProfileUseCase() {
  const { data, isPending } = useQuery({
    queryKey: [QueryKeys.USER_PROFILE],
    queryFn: authService.getUserProfile,
    retry: 3,
    retryDelay: 500,
  });

  return {
    data,
    isPending,
  };
}
