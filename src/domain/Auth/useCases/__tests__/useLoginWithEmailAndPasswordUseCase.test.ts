import { renderHook } from "test-utils";
import { useLoginWithEmailAndPasswordUseCase } from "../useLoginWithEmailAndPasswordUseCase";
import { authService } from "../../authService";
import { saveUser } from "@database";
import { useUserSlice } from "@store";
import { useToast } from "@hooks";
import { User } from "@domain";
import { MutationOptions } from "@api";
import { useMutation } from "@tanstack/react-query";

jest.mock("../../authService");
jest.mock("@database");
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
const mockSaveUser = saveUser as jest.MockedFunction<typeof saveUser>;
const mockUseUserSlice = useUserSlice as jest.MockedFunction<
  typeof useUserSlice
>;
const mockUseToast = useToast as jest.MockedFunction<typeof useToast>;
const mockUseMutation = useMutation as jest.MockedFunction<typeof useMutation>;

describe("useLoginWithEmailAndPasswordUseCase", () => {
  const mockSetUser = jest.fn();
  const mockShowToast = jest.fn();
  const mockHideToast = jest.fn();
  const mockMutate = jest.fn();
  const mockOnSuccess = jest.fn();
  const mockOnError = jest.fn();

  const mockUser: User = {
    id: "test-user-123",
    email: "test@example.com",
    fullName: "John Doe",
    isNewUser: false,
    emailVerified: true,
    createdAt: "2024-01-15T10:30:00.000Z",
  };

  const mockOptions: MutationOptions<User> = {
    onSuccess: mockOnSuccess,
    onError: mockOnError,
  };

  beforeEach(() => {
    jest.clearAllMocks();

    mockUseUserSlice.mockReturnValue({
      user: null,
      setUser: mockSetUser,
      clearUser: jest.fn(),
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
      renderHook(() => useLoginWithEmailAndPasswordUseCase(mockOptions));

      expect(mockUseUserSlice).toHaveBeenCalled();
      expect(mockUseToast).toHaveBeenCalled();
      expect(mockUseMutation).toHaveBeenCalledWith({
        mutationFn: expect.any(Function),
        onSuccess: expect.any(Function),
        onError: expect.any(Function),
      });
    });

    it("should return login function and isPending state", () => {
      const { result } = renderHook(() =>
        useLoginWithEmailAndPasswordUseCase(mockOptions)
      );

      expect(result.current).toEqual({
        login: expect.any(Function),
        isPending: false,
      });
    });
  });

  describe("login function", () => {
    it("should call mutate with correct parameters", () => {
      const { result } = renderHook(() =>
        useLoginWithEmailAndPasswordUseCase(mockOptions)
      );

      result.current.login("test@example.com", "password123");

      expect(mockMutate).toHaveBeenCalledWith({
        email: "test@example.com",
        password: "password123",
      });
    });
  });

  describe("mutationFn", () => {
    let mutationFn: Function;
    const mockUserProfile: User = {
      id: "test-user-123",
      email: "test@example.com",
      fullName: "John Doe Updated",
      isNewUser: false,
      emailVerified: true,
      createdAt: "2024-01-15T10:30:00.000Z",
    };

    beforeEach(() => {
      renderHook(() => useLoginWithEmailAndPasswordUseCase(mockOptions));
      mutationFn = mockUseMutation.mock.calls[0][0].mutationFn as Function;
    });

    it("should execute login flow successfully for existing user", async () => {
      mockAuthService.loginWithEmailAndPassword.mockResolvedValue(mockUser);
      mockAuthService.getUserProfile.mockResolvedValue(mockUserProfile);

      const result = await mutationFn({
        email: "test@example.com",
        password: "password123",
      });

      expect(mockAuthService.loginWithEmailAndPassword).toHaveBeenCalledWith({
        email: "test@example.com",
        password: "password123",
      });
      expect(mockAuthService.getUserProfile).toHaveBeenCalled();
      expect(mockSaveUser).toHaveBeenCalledWith({
        ...mockUserProfile,
        isNewUser: false,
      });
      expect(result).toEqual(mockUserProfile);
    });

    it("should handle login failure", async () => {
      const loginError = new Error(
        "[auth/invalid-credential] Invalid credentials"
      );
      mockAuthService.loginWithEmailAndPassword.mockRejectedValue(loginError);

      await expect(
        mutationFn({
          email: "test@example.com",
          password: "wrongpassword",
        })
      ).rejects.toThrow("[auth/invalid-credential] Invalid credentials");

      expect(mockAuthService.getUserProfile).not.toHaveBeenCalled();
      expect(mockSaveUser).not.toHaveBeenCalled();
    });
  });

  describe("onSuccess callback", () => {
    let onSuccessCallback: Function;
    const mockUserProfile: User = {
      id: "test-user-123",
      email: "test@example.com",
      fullName: "John Doe Updated",
      isNewUser: false,
      emailVerified: true,
      createdAt: "2024-01-15T10:30:00.000Z",
    };

    beforeEach(() => {
      renderHook(() => useLoginWithEmailAndPasswordUseCase(mockOptions));
      onSuccessCallback = mockUseMutation.mock.calls[0][0]
        .onSuccess as Function;
    });

    it("should set user in store and show success toast", () => {
      onSuccessCallback(mockUserProfile);

      expect(mockSetUser).toHaveBeenCalledWith(mockUserProfile);
      expect(mockShowToast).toHaveBeenCalledWith(
        "success",
        "Login realizado com sucesso",
        "Você agora pode aproveitar o Filora"
      );
      expect(mockOnSuccess).toHaveBeenCalledWith(mockUserProfile);
    });
  });

  describe("onError callback", () => {
    let onErrorCallback: Function;

    beforeEach(() => {
      renderHook(() => useLoginWithEmailAndPasswordUseCase(mockOptions));
      onErrorCallback = mockUseMutation.mock.calls[0][0].onError as Function;
    });

    it("should show error toast with processed error message", () => {
      const error = new Error("[auth/invalid-credential] Invalid credentials");

      onErrorCallback(error, undefined, undefined, {
        client: {} as any,
        meta: {},
      });

      expect(mockShowToast).toHaveBeenCalledWith(
        "error",
        "Erro ao fazer login",
        "Credenciais inválidas"
      );
      expect(mockOnError).toHaveBeenCalledWith("Credenciais inválidas");
    });
  });
});
