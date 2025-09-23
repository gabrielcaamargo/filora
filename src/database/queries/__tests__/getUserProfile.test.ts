import { getUserProfile } from "../getUserProfile";
import { User } from "@domain";
import firestore from "@react-native-firebase/firestore";
import { getAuth } from "@react-native-firebase/auth";
import { DatabaseCollections } from "../../databaseTypes";

const {
  clearMockData,
  setMockData,
} = require("@react-native-firebase/firestore");

jest.mock("@react-native-firebase/auth");

describe("getUserProfile", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    clearMockData();

    const authInstance = getAuth();
    authInstance.currentUser = null;
  });

  const mockUser: User = {
    id: "test-user-123",
    email: "test@example.com",
    fullName: "John Doe",
    isNewUser: false,
    emailVerified: true,
    createdAt: "2024-01-15T10:30:00.000Z",
  };

  it("should successfully get user profile when user is authenticated", async () => {
    const authInstance = getAuth();
    authInstance.currentUser = {
      uid: "test-user-123",
    } as any;

    setMockData(DatabaseCollections.USERS, "test-user-123", mockUser);

    const result = await getUserProfile();

    expect(result).toEqual(mockUser);
  });

  it("should throw error when user is not authenticated", async () => {
    const authInstance = getAuth();
    authInstance.currentUser = null;

    await expect(getUserProfile()).rejects.toThrow("User not authenticated");
  });

  it("should throw error when currentUser is undefined", async () => {
    const authInstance = getAuth();
    authInstance.currentUser = undefined as any;

    await expect(getUserProfile()).rejects.toThrow("User not authenticated");
  });

  it("should throw error when user uid is undefined", async () => {
    const authInstance = getAuth();
    authInstance.currentUser = {
      uid: undefined,
    } as any;

    await expect(getUserProfile()).rejects.toThrow("User not authenticated");
  });

  it("should throw error when user uid is empty string", async () => {
    const authInstance = getAuth();
    authInstance.currentUser = {
      uid: "",
    } as any;

    await expect(getUserProfile()).rejects.toThrow("User not authenticated");
  });

  it("should handle user document that does not exist", async () => {
    const authInstance = getAuth();
    authInstance.currentUser = {
      uid: "non-existent-user",
    } as any;

    const result = await getUserProfile();

    expect(result).toBeUndefined();
  });

  it("should return user data with all properties", async () => {
    const complexUser: User = {
      id: "complex-user-456",
      email: "complex@example.com",
      fullName: "Complex User Name",
      isNewUser: true,
      emailVerified: false,
      createdAt: "2023-12-01T08:00:00.000Z",
    };

    const authInstance = getAuth();
    authInstance.currentUser = {
      uid: "complex-user-456",
    } as any;

    setMockData(DatabaseCollections.USERS, "complex-user-456", complexUser);

    const result = await getUserProfile();

    expect(result).toEqual(complexUser);
  });

  it("should return user data with minimal properties", async () => {
    const minimalUser: User = {
      email: "",
      fullName: "",
      isNewUser: false,
      emailVerified: false,
    };

    const authInstance = getAuth();
    authInstance.currentUser = {
      uid: "minimal-user-789",
    } as any;

    setMockData(DatabaseCollections.USERS, "minimal-user-789", minimalUser);

    const result = await getUserProfile();

    expect(result).toEqual(minimalUser);
  });

  it("should handle Firestore errors", async () => {
    const authInstance = getAuth();
    authInstance.currentUser = {
      uid: "test-user-123",
    } as any;

    const mockFirestoreInstance = firestore();
    const originalCollection = mockFirestoreInstance.collection;
    mockFirestoreInstance.collection = jest.fn().mockImplementation(() => {
      throw new Error("Firestore connection failed");
    });

    await expect(getUserProfile()).rejects.toThrow(
      "Firestore connection failed"
    );

    mockFirestoreInstance.collection = originalCollection;
  });

  it("should handle partial user data", async () => {
    const partialUser = {
      email: "partial@example.com",
      fullName: "Partial User",
    };

    const authInstance = getAuth();
    authInstance.currentUser = {
      uid: "partial-user",
    } as any;

    setMockData(DatabaseCollections.USERS, "partial-user", partialUser);

    const result = await getUserProfile();

    expect(result).toEqual(partialUser);
  });

  it("should type cast result as User", async () => {
    const authInstance = getAuth();
    authInstance.currentUser = {
      uid: "type-test-user",
    } as any;

    setMockData(DatabaseCollections.USERS, "type-test-user", mockUser);

    const result = await getUserProfile();

    expect(typeof result?.email).toBe("string");
    expect(typeof result?.fullName).toBe("string");
    expect(typeof result?.isNewUser).toBe("boolean");
    expect(typeof result?.emailVerified).toBe("boolean");
  });
});
