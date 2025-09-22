export type MutationOptions<T = unknown> = {
  onSuccess?: (data: T) => void;
  onError?: (message: string) => void;
};
