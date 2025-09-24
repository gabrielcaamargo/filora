import { authService, SignupWithEmailAndPasswordParams } from "../authService";
import { firebaseAuth } from "@lib";
import { userAdapter } from "../../User/userAdapter";
import { getUserProfile as getUserProfileQuery } from "@database";
import { User } from "../../User/userTypes";
import { FirebaseAuthTypes } from "@react-native-firebase/auth";

jest.mock("@lib", () => ({
  firebaseAuth: {
    signupWithEmailAndPassword: jest.fn(),
    updateUserName: jest.fn(),
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
    const mockUserCredential: FirebaseAuthTypes.UserCredential = {
      user: {
        uid: "test-uid-123",
        email: "test@example.com",
        displayName: "John Doe",
        emailVerified: false,
        isAnonymous: false,
        metadata: {
          creationTime: "2024-01-15T10:30:00.000Z",
          lastSignInTime: "2024-01-15T10:30:00.000Z",
        },
        phoneNumber: null,
        photoURL: null,
        providerId: "firebase",
        providerData: [],
        multiFactor: {} as any,
        delete: jest.fn(),
        getIdToken: jest.fn(),
        getIdTokenResult: jest.fn(),
        reload: jest.fn(),
        toJSON: jest.fn(),
        linkWithCredential: jest.fn(),
        linkWithPopup: jest.fn(),
        linkWithRedirect: jest.fn(),
        reauthenticateWithCredential: jest.fn(),
        reauthenticateWithPopup: jest.fn(),
        reauthenticateWithRedirect: jest.fn(),
        sendEmailVerification: jest.fn(),
        unlink: jest.fn(),
        updateEmail: jest.fn(),
        updatePassword: jest.fn(),
        updatePhoneNumber: jest.fn(),
        updateProfile: jest.fn(),
        verifyBeforeUpdateEmail: jest.fn(),
      },
      additionalUserInfo: {
        isNewUser: true,
        providerId: "password",
        profile: {},
        username: undefined,
      },
    };

    const mockUser: User = {
      id: "test-uid-123",
      email: "test@example.com",
      fullName: "John Doe",
      isNewUser: true,
      createdAt: "2024-01-15T10:30:00.000Z",
      emailVerified: false,
    };

    const signupParams: SignupWithEmailAndPasswordParams = {
      email: "test@example.com",
      password: "password123",
    };

    it("should successfully signup a user with email and password", async () => {
      mockFirebaseAuth.signupWithEmailAndPassword.mockResolvedValue(
        mockUserCredential
      );
      mockUserAdapter.firebaseAuthToUser.mockReturnValue(mockUser);

      const result = await authService.signupWithEmailAndPassword(signupParams);

      expect(mockFirebaseAuth.signupWithEmailAndPassword).toHaveBeenCalledWith(
        "test@example.com",
        "password123"
      );
      expect(mockFirebaseAuth.signupWithEmailAndPassword).toHaveBeenCalled();
      expect(mockUserAdapter.firebaseAuthToUser).toHaveBeenCalledWith(
        mockUserCredential
      );
      expect(mockUserAdapter.firebaseAuthToUser).toHaveBeenCalled();
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
});
