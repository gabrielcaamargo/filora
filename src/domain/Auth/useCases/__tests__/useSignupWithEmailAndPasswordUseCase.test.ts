import { renderHook } from "test-utils";
import { useSignupWithEmailAndPasswordUseCase } from "../useSignupWithEmailAndPasswordUseCase";
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
}));

const mockAuthService = authService as jest.Mocked<typeof authService>;
const mockSaveUser = saveUser as jest.MockedFunction<typeof saveUser>;
const mockUseUserSlice = useUserSlice as jest.MockedFunction<
  typeof useUserSlice
>;
const mockUseToast = useToast as jest.MockedFunction<typeof useToast>;

const mockUseMutation = useMutation as jest.MockedFunction<typeof useMutation>;

describe("useSignupWithEmailAndPasswordUseCase", () => {
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
    isNewUser: true,
    emailVerified: false,
    createdAt: "2024-01-15T10:30:00.000Z",
  };

  const mockUserProfile: User = {
    id: "test-user-123",
    email: "test@example.com",
    fullName: "John Doe",
    isNewUser: false,
    emailVerified: false,
    createdAt: "2024-01-15T10:30:00.000Z",
  };

  const mockOptions: MutationOptions<User> = {
    onSuccess: mockOnSuccess,
    onError: mockOnError,
  };

  beforeEach(() => {
    jest.clearAllMocks();

    mockUseUserSlice.mockReturnValue({
      data: mockUser,
      setUser: mockSetUser,
    });

    // Mock toast hook
    mockUseToast.mockReturnValue({
      showToast: mockShowToast,
      hideToast: mockHideToast,
    });

    // Mock useMutation
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
      renderHook(() => useSignupWithEmailAndPasswordUseCase(mockOptions));

      expect(mockUseUserSlice).toHaveBeenCalled();
      expect(mockUseToast).toHaveBeenCalled();
      expect(mockUseMutation).toHaveBeenCalledWith({
        mutationFn: expect.any(Function),
        onSuccess: expect.any(Function),
        onError: expect.any(Function),
      });
    });

    it("should return signup function and isPending state", () => {
      const { result } = renderHook(() =>
        useSignupWithEmailAndPasswordUseCase(mockOptions)
      );

      expect(result.current).toEqual({
        signup: expect.any(Function),
        isPending: false,
      });
    });
  });

  describe("signup function", () => {
    it("should call mutate with correct parameters", () => {
      const { result } = renderHook(() =>
        useSignupWithEmailAndPasswordUseCase(mockOptions)
      );

      result.current.signup("test@example.com", "password123", "John Doe");

      expect(mockMutate).toHaveBeenCalledWith({
        email: "test@example.com",
        password: "password123",
        fullName: "John Doe",
      });
    });

    it("should handle different parameter combinations", () => {
      const { result } = renderHook(() =>
        useSignupWithEmailAndPasswordUseCase(mockOptions)
      );

      result.current.signup("user@test.com", "mypassword", "Jane Smith");

      expect(mockMutate).toHaveBeenCalledWith({
        email: "user@test.com",
        password: "mypassword",
        fullName: "Jane Smith",
      });
    });
  });

  describe("mutationFn", () => {
    let mutationFn: Function;

    beforeEach(() => {
      renderHook(() => useSignupWithEmailAndPasswordUseCase(mockOptions));
      mutationFn = mockUseMutation.mock.calls[0][0].mutationFn as Function;
    });

    it("should execute signup flow successfully", async () => {
      mockAuthService.signupWithEmailAndPassword.mockResolvedValue(mockUser);
      mockSaveUser.mockResolvedValue(undefined);
      mockAuthService.getUserProfile.mockResolvedValue(mockUserProfile);

      const result = await mutationFn({
        email: "test@example.com",
        password: "password123",
        fullName: "John Doe",
      });

      expect(mockAuthService.signupWithEmailAndPassword).toHaveBeenCalledWith({
        email: "test@example.com",
        password: "password123",
      });
      expect(mockSaveUser).toHaveBeenCalledWith({
        ...mockUser,
        fullName: "John Doe",
      });
      expect(mockAuthService.getUserProfile).toHaveBeenCalled();
      expect(result).toEqual(mockUserProfile);
    });

    it("should handle authService.signupWithEmailAndPassword failure", async () => {
      const signupError = new Error("Email already exists");
      mockAuthService.signupWithEmailAndPassword.mockRejectedValue(signupError);

      await expect(
        mutationFn({
          email: "existing@example.com",
          password: "password123",
          fullName: "John Doe",
        })
      ).rejects.toThrow("Email already exists");

      expect(mockAuthService.signupWithEmailAndPassword).toHaveBeenCalledWith({
        email: "existing@example.com",
        password: "password123",
      });
      expect(mockSaveUser).not.toHaveBeenCalled();
      expect(mockAuthService.getUserProfile).not.toHaveBeenCalled();
    });

    it("should handle saveUser failure", async () => {
      mockAuthService.signupWithEmailAndPassword.mockResolvedValue(mockUser);
      const saveError = new Error("Failed to save user to database");
      mockSaveUser.mockRejectedValue(saveError);

      await expect(
        mutationFn({
          email: "test@example.com",
          password: "password123",
          fullName: "John Doe",
        })
      ).rejects.toThrow("Failed to save user to database");

      expect(mockAuthService.signupWithEmailAndPassword).toHaveBeenCalled();
      expect(mockSaveUser).toHaveBeenCalledWith({
        ...mockUser,
        fullName: "John Doe",
      });
      expect(mockAuthService.getUserProfile).not.toHaveBeenCalled();
    });

    it("should handle getUserProfile failure", async () => {
      mockAuthService.signupWithEmailAndPassword.mockResolvedValue(mockUser);
      mockSaveUser.mockResolvedValue(undefined);
      const profileError = new Error("Failed to get user profile");
      mockAuthService.getUserProfile.mockRejectedValue(profileError);

      await expect(
        mutationFn({
          email: "test@example.com",
          password: "password123",
          fullName: "John Doe",
        })
      ).rejects.toThrow("Failed to get user profile");

      expect(mockAuthService.signupWithEmailAndPassword).toHaveBeenCalled();
      expect(mockSaveUser).toHaveBeenCalled();
      expect(mockAuthService.getUserProfile).toHaveBeenCalled();
    });

    it("should preserve user data and add fullName", async () => {
      const userWithoutFullName: User = {
        id: "test-user-456",
        email: "test2@example.com",
        fullName: "",
        isNewUser: true,
        emailVerified: false,
      };

      mockAuthService.signupWithEmailAndPassword.mockResolvedValue(
        userWithoutFullName
      );
      mockSaveUser.mockResolvedValue(undefined);
      mockAuthService.getUserProfile.mockResolvedValue(mockUserProfile);

      await mutationFn({
        email: "test2@example.com",
        password: "password456",
        fullName: "Jane Smith",
      });

      expect(mockSaveUser).toHaveBeenCalledWith({
        id: "test-user-456",
        email: "test2@example.com",
        fullName: "Jane Smith", // Should override the empty fullName
        isNewUser: true,
        emailVerified: false,
      });
    });
  });

  describe("onSuccess callback", () => {
    let onSuccessCallback: Function;

    beforeEach(() => {
      renderHook(() => useSignupWithEmailAndPasswordUseCase(mockOptions));
      onSuccessCallback = mockUseMutation.mock.calls[0][0]
        .onSuccess as Function;
    });

    it("should set user in store and show success toast", async () => {
      await onSuccessCallback(mockUserProfile);

      expect(mockSetUser).toHaveBeenCalledWith(mockUserProfile);
      expect(mockShowToast).toHaveBeenCalledWith(
        "success",
        "Conta criada com sucesso",
        "Você agora pode aproveitar o DocuScan"
      );
    });

    it("should call options.onSuccess if provided", async () => {
      await onSuccessCallback(mockUserProfile);

      expect(mockOnSuccess).toHaveBeenCalledWith(mockUserProfile);
    });

    it("should work when options.onSuccess is not provided", async () => {
      const optionsWithoutOnSuccess: MutationOptions<User> = {
        onError: mockOnError,
      };

      const { rerender } = renderHook(() =>
        useSignupWithEmailAndPasswordUseCase(optionsWithoutOnSuccess)
      );

      const onSuccessCallbackWithoutOptions =
        mockUseMutation.mock.calls[mockUseMutation.mock.calls.length - 1][0]
          .onSuccess;

      if (onSuccessCallbackWithoutOptions) {
        await expect(
          onSuccessCallbackWithoutOptions(mockUserProfile, {}, undefined, {
            client: {} as any,
            meta: {},
          })
        ).resolves.not.toThrow();
      }

      expect(mockSetUser).toHaveBeenCalledWith(mockUserProfile);
      expect(mockShowToast).toHaveBeenCalled();
    });
  });

  describe("onError callback", () => {
    let onErrorCallback: Function;

    beforeEach(() => {
      renderHook(() => useSignupWithEmailAndPasswordUseCase(mockOptions));
      onErrorCallback = mockUseMutation.mock.calls[0][0].onError as Function;
    });

    it("should call options.onError with error message", () => {
      const error = new Error("Authentication failed");

      onErrorCallback(error, {}, undefined, { client: {} as any, meta: {} });

      expect(mockOnError).toHaveBeenCalledWith("Authentication failed");
    });

    it("should work when options.onError is not provided", () => {
      const optionsWithoutOnError: MutationOptions<User> = {
        onSuccess: mockOnSuccess,
      };

      renderHook(() =>
        useSignupWithEmailAndPasswordUseCase(optionsWithoutOnError)
      );

      const onErrorCallbackWithoutOptions =
        mockUseMutation.mock.calls[mockUseMutation.mock.calls.length - 1][0]
          .onError;

      const error = new Error("Some error");

      if (onErrorCallbackWithoutOptions) {
        expect(() =>
          onErrorCallbackWithoutOptions(error, {}, undefined, {
            client: {} as any,
            meta: {},
          })
        ).not.toThrow();
      }
    });

    it("should handle different error types", () => {
      const stringError = new Error("String error message");
      const emptyError = new Error("");

      onErrorCallback(stringError, {}, undefined, {
        client: {} as any,
        meta: {},
      });
      expect(mockOnError).toHaveBeenCalledWith("String error message");

      jest.clearAllMocks();
      onErrorCallback(emptyError, {}, undefined, {
        client: {} as any,
        meta: {},
      });
      expect(mockOnError).toHaveBeenCalledWith("");
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

      const { result } = renderHook(() =>
        useSignupWithEmailAndPasswordUseCase(mockOptions)
      );

      expect(result.current.isPending).toBe(true);
    });

    it("should handle isPending false state", () => {
      mockUseMutation.mockReturnValue({
        mutate: mockMutate,
        isPending: false,
        isError: false,
        isSuccess: true,
        data: mockUserProfile,
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

      const { result } = renderHook(() =>
        useSignupWithEmailAndPasswordUseCase(mockOptions)
      );

      expect(result.current.isPending).toBe(false);
    });
  });
});
