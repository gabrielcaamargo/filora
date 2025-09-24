import {
  authService,
  LoginWithEmailAndPasswordParams,
  SignupWithEmailAndPasswordParams,
} from "../authService";
import { firebaseAuth } from "@lib";
import { userAdapter } from "../../User/userAdapter";
import { getUserProfile as getUserProfileQuery } from "@database";
import { User } from "../../User/userTypes";
import { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { mockFirebaseAuthUserCredential } from "./mockedData/mockFirebaseAuthUserCredential";
import { mockUser } from "./mockedData/mockUser";

jest.mock("@lib", () => ({
  firebaseAuth: {
    signupWithEmailAndPassword: jest.fn(),
    logOut: jest.fn(),
    logInWithEmailAndPassword: jest.fn(),
  },
}));

jest.mock("../../User/userAdapter", () => ({
  userAdapter: {
    firebaseAuthToUser: jest.fn(),
  },
}));

jest.mock("@database", () => ({
  getUserProfile: jest.fn(),
}));

// Mock types
const mockFirebaseAuth = firebaseAuth as jest.Mocked<typeof firebaseAuth>;
const mockUserAdapter = userAdapter as jest.Mocked<typeof userAdapter>;
const mockGetUserProfileQuery = getUserProfileQuery as jest.MockedFunction<
  typeof getUserProfileQuery
>;

describe("authService", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("signupWithEmailAndPassword", () => {
    const signupParams: SignupWithEmailAndPasswordParams = {
      email: "test@example.com",
      password: "password123",
    };

    it("should successfully signup a user with email and password", async () => {
      mockFirebaseAuth.signupWithEmailAndPassword.mockResolvedValue(
        mockFirebaseAuthUserCredential
      );
      mockUserAdapter.firebaseAuthToUser.mockReturnValue(mockUser);

      const result = await authService.signupWithEmailAndPassword(signupParams);

      expect(mockFirebaseAuth.signupWithEmailAndPassword).toHaveBeenCalledWith(
        signupParams.email,
        signupParams.password
      );
      expect(mockUserAdapter.firebaseAuthToUser).toHaveBeenCalledWith(
        mockFirebaseAuthUserCredential
      );
      expect(result).toEqual(mockUser);
    });

    it("should throw an error when Firebase authentication fails", async () => {
      const firebaseError = new Error("Firebase: Invalid email format");
      mockFirebaseAuth.signupWithEmailAndPassword.mockRejectedValue(
        firebaseError
      );

      await expect(
        authService.signupWithEmailAndPassword(signupParams)
      ).rejects.toThrow("Firebase: Invalid email format");

      expect(mockFirebaseAuth.signupWithEmailAndPassword).toHaveBeenCalledWith(
        "test@example.com",
        "password123"
      );
      expect(mockUserAdapter.firebaseAuthToUser).not.toHaveBeenCalled();
    });

    it("should handle empty email", async () => {
      const emptyEmailParams = { email: "", password: "password123" };
      const firebaseError = new Error("Firebase: Email is required");
      mockFirebaseAuth.signupWithEmailAndPassword.mockRejectedValue(
        firebaseError
      );

      await expect(
        authService.signupWithEmailAndPassword(emptyEmailParams)
      ).rejects.toThrow("Firebase: Email is required");

      expect(mockFirebaseAuth.signupWithEmailAndPassword).toHaveBeenCalledWith(
        "",
        "password123"
      );
    });

    it("should handle empty password", async () => {
      // Arrange
      const emptyPasswordParams = { email: "test@example.com", password: "" };
      const firebaseError = new Error("Firebase: Password is required");
      mockFirebaseAuth.signupWithEmailAndPassword.mockRejectedValue(
        firebaseError
      );

      // Act & Assert
      await expect(
        authService.signupWithEmailAndPassword(emptyPasswordParams)
      ).rejects.toThrow("Firebase: Password is required");

      expect(mockFirebaseAuth.signupWithEmailAndPassword).toHaveBeenCalledWith(
        "test@example.com",
        ""
      );
    });
  });

  describe("getUserProfile", () => {
    const mockUser: User = {
      id: "test-uid-123",
      email: "test@example.com",
      fullName: "John Doe",
      isNewUser: false,
      createdAt: "2024-01-15T10:30:00.000Z",
      emailVerified: true,
    };

    it("should successfully get user profile", async () => {
      mockGetUserProfileQuery.mockResolvedValue(mockUser);

      const result = await authService.getUserProfile();

      expect(mockGetUserProfileQuery).toHaveBeenCalled();
      expect(result).toEqual(mockUser);
    });

    it("should throw an error when user is not authenticated", async () => {
      const authError = new Error("User not authenticated");
      mockGetUserProfileQuery.mockRejectedValue(authError);

      await expect(authService.getUserProfile()).rejects.toThrow(
        "User not authenticated"
      );

      expect(mockGetUserProfileQuery).toHaveBeenCalled();
    });

    it("should throw an error when database query fails", async () => {
      const databaseError = new Error("Failed to fetch user data");
      mockGetUserProfileQuery.mockRejectedValue(databaseError);

      await expect(authService.getUserProfile()).rejects.toThrow(
        "Failed to fetch user data"
      );

      expect(mockGetUserProfileQuery).toHaveBeenCalled();
    });

    it("should throw an error when user document does not exist", async () => {
      const notFoundError = new Error("User document not found");
      mockGetUserProfileQuery.mockRejectedValue(notFoundError);

      await expect(authService.getUserProfile()).rejects.toThrow(
        "User document not found"
      );

      expect(mockGetUserProfileQuery).toHaveBeenCalledWith();
    });
  });

  describe("logOut", () => {
    it("should successfully log out user", async () => {
      mockFirebaseAuth.logOut.mockResolvedValue(undefined);

      await expect(authService.logOut()).resolves.not.toThrow();

      expect(mockFirebaseAuth.logOut).toHaveBeenCalledWith();
    });

    it("should throw an error when Firebase logOut fails", async () => {
      const logOutError = new Error("Failed to log out");
      mockFirebaseAuth.logOut.mockRejectedValue(logOutError);

      await expect(authService.logOut()).rejects.toThrow("Failed to log out");

      expect(mockFirebaseAuth.logOut).toHaveBeenCalledWith();
    });

    it("should throw an error when network connection fails", async () => {
      const networkError = new Error("Network error");
      mockFirebaseAuth.logOut.mockRejectedValue(networkError);

      await expect(authService.logOut()).rejects.toThrow("Network error");

      expect(mockFirebaseAuth.logOut).toHaveBeenCalledWith();
    });

    it("should throw an error when user is not authenticated", async () => {
      const authError = new Error("User not authenticated");
      mockFirebaseAuth.logOut.mockRejectedValue(authError);

      await expect(authService.logOut()).rejects.toThrow(
        "User not authenticated"
      );

      expect(mockFirebaseAuth.logOut).toHaveBeenCalledWith();
    });
  });

  describe("loginWithEmailAndPassword", () => {
    const loginParams: LoginWithEmailAndPasswordParams = {
      email: "test@example.com",
      password: "password123",
    };

    it("should successfully login a user with email and password", async () => {
      mockFirebaseAuth.logInWithEmailAndPassword.mockResolvedValue(
        mockFirebaseAuthUserCredential
      );
      mockUserAdapter.firebaseAuthToUser.mockReturnValue(mockUser);

      const result = await authService.loginWithEmailAndPassword(loginParams);

      expect(mockFirebaseAuth.logInWithEmailAndPassword).toHaveBeenCalledWith(
        loginParams.email,
        loginParams.password
      );
      expect(mockUserAdapter.firebaseAuthToUser).toHaveBeenCalledWith(
        mockFirebaseAuthUserCredential
      );
      expect(result).toEqual(mockUser);
    });

    it("should throw an error when Firebase authentication fails", async () => {
      const firebaseError = new Error("Firebase: Invalid email format");
      mockFirebaseAuth.logInWithEmailAndPassword.mockRejectedValue(
        firebaseError
      );

      await expect(
        authService.loginWithEmailAndPassword(loginParams)
      ).rejects.toThrow("Firebase: Invalid email format");

      expect(mockFirebaseAuth.logInWithEmailAndPassword).toHaveBeenCalledWith(
        loginParams.email,
        loginParams.password
      );
    });

    it("should handle empty email", async () => {
      const emptyEmailParams = { email: "", password: "password123" };
      const firebaseError = new Error("Firebase: Email is required");
      mockFirebaseAuth.logInWithEmailAndPassword.mockRejectedValue(
        firebaseError
      );

      await expect(
        authService.loginWithEmailAndPassword(emptyEmailParams)
      ).rejects.toThrow("Firebase: Email is required");

      expect(mockFirebaseAuth.logInWithEmailAndPassword).toHaveBeenCalledWith(
        "",
        "password123"
      );
    });

    it("should handle empty password", async () => {
      const emptyPasswordParams = { email: "test@example.com", password: "" };
      const firebaseError = new Error("Firebase: Password is required");
      mockFirebaseAuth.logInWithEmailAndPassword.mockRejectedValue(
        firebaseError
      );

      await expect(
        authService.loginWithEmailAndPassword(emptyPasswordParams)
      ).rejects.toThrow("Firebase: Password is required");

      expect(mockFirebaseAuth.logInWithEmailAndPassword).toHaveBeenCalledWith(
        "test@example.com",
        ""
      );
    });
  });
});
