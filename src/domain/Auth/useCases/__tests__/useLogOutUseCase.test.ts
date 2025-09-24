import { renderHook } from "test-utils";
import { useLogOutUseCase } from "../useLogOutUseCase";
import { authService } from "../../authService";
import { useUserSlice } from "@store";
import { useToast } from "@hooks";
import { MutationOptions } from "@api";
import { useMutation } from "@tanstack/react-query";

jest.mock("../../authService");
jest.mock("@store");
jest.mock("@hooks");

jest.mock("@tanstack/react-query", () => ({
  useMutation: jest.fn(),
  QueryClient: jest.fn().mockImplementation(() => ({
    clear: jest.fn(),
    getQueryCache: jest.fn(),
    getMutationCache: jest.fn(),
    invalidateQueries: jest.fn(),
    setQueryData: jest.fn(),
    getQueryData: jest.fn(),
  })),
}));

const mockAuthService = authService as jest.Mocked<typeof authService>;
const mockUseUserSlice = useUserSlice as jest.MockedFunction<
  typeof useUserSlice
>;
const mockUseToast = useToast as jest.MockedFunction<typeof useToast>;
const mockUseMutation = useMutation as jest.MockedFunction<typeof useMutation>;

describe("useLogOutUseCase", () => {
  const mockClearUser = jest.fn();
  const mockShowToast = jest.fn();
  const mockHideToast = jest.fn();
  const mockMutate = jest.fn();
  const mockOnSuccess = jest.fn();
  const mockOnError = jest.fn();

  const mockOptions: MutationOptions<void> = {
    onSuccess: mockOnSuccess,
    onError: mockOnError,
  };

  beforeEach(() => {
    jest.clearAllMocks();

    mockUseUserSlice.mockReturnValue({
      user: null,
      setUser: jest.fn(),
      clearUser: mockClearUser,
    });

    mockUseToast.mockReturnValue({
      showToast: mockShowToast,
      hideToast: mockHideToast,
    });

    mockUseMutation.mockReturnValue({
      mutate: mockMutate,
      isPending: false,
      isError: false,
      isSuccess: false,
      data: undefined,
      error: null,
      reset: jest.fn(),
      mutateAsync: jest.fn(),
      status: "idle",
      failureCount: 0,
      failureReason: null,
      isIdle: true,
      isPaused: false,
      variables: undefined,
      context: undefined,
      submittedAt: 0,
    } as any);
  });

  describe("initialization", () => {
    it("should initialize with correct dependencies", () => {
      renderHook(() => useLogOutUseCase(mockOptions));

      expect(mockUseToast).toHaveBeenCalled();
      expect(mockUseUserSlice).toHaveBeenCalled();
      expect(mockUseMutation).toHaveBeenCalledWith({
        mutationFn: authService.logOut,
        onSuccess: expect.any(Function),
        onError: expect.any(Function),
      });
    });

    it("should return logOut function and isPending state", () => {
      const { result } = renderHook(() => useLogOutUseCase(mockOptions));

      expect(result.current).toEqual({
        logOut: expect.any(Function),
        isPending: false,
      });
    });
  });

  describe("logOut function", () => {
    it("should call mutate when logOut is invoked", () => {
      const { result } = renderHook(() => useLogOutUseCase(mockOptions));

      result.current.logOut();

      expect(mockMutate).toHaveBeenCalledWith();
    });
  });

  describe("onSuccess callback", () => {
    let onSuccessCallback: Function;

    beforeEach(() => {
      renderHook(() => useLogOutUseCase(mockOptions));
      onSuccessCallback = mockUseMutation.mock.calls[0][0]
        .onSuccess as Function;
    });

    it("should show success toast and clear user", () => {
      onSuccessCallback();

      expect(mockShowToast).toHaveBeenCalledWith(
        "success",
        "Sessão encerrada com sucesso",
        "Sua sessão foi encerrada. Voltando para a tela de login."
      );
      expect(mockClearUser).toHaveBeenCalled();
    });

    it("should call options.onSuccess if provided", () => {
      onSuccessCallback();

      expect(mockOnSuccess).toHaveBeenCalled();
    });

    it("should work when options.onSuccess is not provided", () => {
      const optionsWithoutOnSuccess: MutationOptions<void> = {
        onError: mockOnError,
      };

      renderHook(() => useLogOutUseCase(optionsWithoutOnSuccess));

      const onSuccessCallbackWithoutOptions =
        mockUseMutation.mock.calls[mockUseMutation.mock.calls.length - 1][0]
          .onSuccess;

      expect(() =>
        onSuccessCallbackWithoutOptions?.(undefined, undefined, undefined, {
          client: {} as any,
          meta: {},
        })
      ).not.toThrow();

      expect(mockShowToast).toHaveBeenCalledWith(
        "success",
        "Sessão encerrada com sucesso",
        "Sua sessão foi encerrada. Voltando para a tela de login."
      );
      expect(mockClearUser).toHaveBeenCalled();
    });
  });

  describe("onError callback", () => {
    let onErrorCallback: Function;

    beforeEach(() => {
      renderHook(() => useLogOutUseCase(mockOptions));
      onErrorCallback = mockUseMutation.mock.calls[0][0].onError as Function;
    });

    it("should show error toast and call options.onError", () => {
      const error = new Error("Logout failed");

      onErrorCallback(error, undefined, undefined, {
        client: {} as any,
        meta: {},
      });

      expect(mockShowToast).toHaveBeenCalledWith(
        "error",
        "Erro ao encerrar sessão",
        "Logout failed"
      );
      expect(mockOnError).toHaveBeenCalledWith("Logout failed");
    });

    it("should work when options.onError is not provided", () => {
      const optionsWithoutOnError: MutationOptions<void> = {
        onSuccess: mockOnSuccess,
      };

      renderHook(() => useLogOutUseCase(optionsWithoutOnError));

      const onErrorCallbackWithoutOptions =
        mockUseMutation.mock.calls[mockUseMutation.mock.calls.length - 1][0]
          .onError;

      const error = new Error("Some error");

      expect(() =>
        onErrorCallbackWithoutOptions?.(error, undefined, undefined, {
          client: {} as any,
          meta: {},
        })
      ).not.toThrow();

      expect(mockShowToast).toHaveBeenCalledWith(
        "error",
        "Erro ao encerrar sessão",
        "Some error"
      );
    });

    it("should handle different error types", () => {
      const networkError = new Error("Network error");
      const authError = new Error("Authentication error");

      onErrorCallback(networkError, undefined, undefined, {
        client: {} as any,
        meta: {},
      });
      expect(mockShowToast).toHaveBeenCalledWith(
        "error",
        "Erro ao encerrar sessão",
        "Network error"
      );
      expect(mockOnError).toHaveBeenCalledWith("Network error");

      jest.clearAllMocks();

      onErrorCallback(authError, undefined, undefined, {
        client: {} as any,
        meta: {},
      });
      expect(mockShowToast).toHaveBeenCalledWith(
        "error",
        "Erro ao encerrar sessão",
        "Authentication error"
      );
      expect(mockOnError).toHaveBeenCalledWith("Authentication error");
    });
  });

  describe("isPending state", () => {
    it("should reflect isPending state from useMutation", () => {
      mockUseMutation.mockReturnValue({
        mutate: mockMutate,
        isPending: true,
        isError: false,
        isSuccess: false,
        data: undefined,
        error: null,
        reset: jest.fn(),
        mutateAsync: jest.fn(),
        status: "pending",
        failureCount: 0,
        failureReason: null,
        isIdle: false,
        isPaused: false,
        variables: undefined,
        context: undefined,
        submittedAt: 0,
      } as any);

      const { result } = renderHook(() => useLogOutUseCase(mockOptions));

      expect(result.current.isPending).toBe(true);
    });

    it("should handle isPending false state", () => {
      mockUseMutation.mockReturnValue({
        mutate: mockMutate,
        isPending: false,
        isError: false,
        isSuccess: true,
        data: undefined,
        error: null,
        reset: jest.fn(),
        mutateAsync: jest.fn(),
        status: "success",
        failureCount: 0,
        failureReason: null,
        isIdle: false,
        isPaused: false,
        variables: undefined,
        context: undefined,
        submittedAt: 0,
      } as any);

      const { result } = renderHook(() => useLogOutUseCase(mockOptions));

      expect(result.current.isPending).toBe(false);
    });
  });

  describe("integration scenarios", () => {
    it("should handle complete logout flow", () => {
      const { result } = renderHook(() => useLogOutUseCase(mockOptions));
      const onSuccessCallback = mockUseMutation.mock.calls[0][0]
        .onSuccess as Function;

      // Simulate logout call
      result.current.logOut();
      expect(mockMutate).toHaveBeenCalled();

      // Simulate successful logout
      onSuccessCallback();
      expect(mockShowToast).toHaveBeenCalledWith(
        "success",
        "Sessão encerrada com sucesso",
        "Sua sessão foi encerrada. Voltando para a tela de login."
      );
      expect(mockClearUser).toHaveBeenCalled();
      expect(mockOnSuccess).toHaveBeenCalled();
    });

    it("should handle logout failure flow", () => {
      const { result } = renderHook(() => useLogOutUseCase(mockOptions));
      const onErrorCallback = mockUseMutation.mock.calls[0][0]
        .onError as Function;

      // Simulate logout call
      result.current.logOut();
      expect(mockMutate).toHaveBeenCalled();

      // Simulate logout failure
      const error = new Error("Session expired");
      onErrorCallback(error, undefined, undefined, {
        client: {} as any,
        meta: {},
      });

      expect(mockShowToast).toHaveBeenCalledWith(
        "error",
        "Erro ao encerrar sessão",
        "Session expired"
      );
      expect(mockOnError).toHaveBeenCalledWith("Session expired");
      expect(mockClearUser).not.toHaveBeenCalled();
    });
  });
});
