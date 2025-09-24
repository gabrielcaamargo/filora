import { saveUser } from "../saveUser";
import { User } from "@domain";
import firestore from "@react-native-firebase/firestore";
import { DatabaseCollections } from "../../databaseTypes";

// Import the helper functions from our mock
const {
  clearMockData,
  getMockData,
} = require("@react-native-firebase/firestore");

// The firestore mock is automatically loaded from __mocks__ folder
const mockServerTimestamp = (firestore as any).FieldValue.serverTimestamp;

describe("saveUser", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    clearMockData();
    mockServerTimestamp.mockReturnValue("__SERVER_TIMESTAMP__");
  });

  const mockUser: User = {
    id: "test-user-123",
    email: "test@example.com",
    fullName: "John Doe",
    isNewUser: true,
    emailVerified: true, // This should be overridden to false
    createdAt: "2024-01-15T10:30:00.000Z", // This should be overridden with serverTimestamp
  };

  it("should successfully save user with correct data transformation", async () => {
    await saveUser(mockUser);

    // Verify data was saved correctly in the mock
    const savedData = getMockData(DatabaseCollections.USERS, "test-user-123");
    expect(savedData).toEqual({
      id: "test-user-123",
      email: "test@example.com",
      fullName: "John Doe",
      isNewUser: true,
      emailVerified: false, // Should be overridden to false
      createdAt: "__SERVER_TIMESTAMP__", // Should be overridden with serverTimestamp
    });

    expect(mockServerTimestamp).toHaveBeenCalled();
  });

  it("should always override emailVerified to false", async () => {
    const userWithVerifiedEmail: User = {
      id: "test-user-456",
      email: "verified@example.com",
      fullName: "Verified User",
      isNewUser: false,
      emailVerified: true, // This should be overridden
    };

    await saveUser(userWithVerifiedEmail);

    const savedData = getMockData(DatabaseCollections.USERS, "test-user-456");
    expect(savedData.emailVerified).toBe(false);
  });

  it("should always set createdAt to serverTimestamp", async () => {
    const userWithExistingCreatedAt: User = {
      id: "test-user-789",
      email: "existing@example.com",
      fullName: "Existing User",
      isNewUser: false,
      emailVerified: false,
      createdAt: "2023-01-01T00:00:00.000Z", // This should be overridden
    };

    await saveUser(userWithExistingCreatedAt);

    const savedData = getMockData(DatabaseCollections.USERS, "test-user-789");
    expect(savedData.createdAt).toBe("__SERVER_TIMESTAMP__");
    expect(mockServerTimestamp).toHaveBeenCalled();
  });

  it("should preserve all other user properties", async () => {
    const complexUser: User = {
      id: "complex-user-123",
      email: "complex@example.com",
      fullName: "Complex User Name",
      isNewUser: true,
      emailVerified: true,
      createdAt: "2024-01-01T00:00:00.000Z",
    };

    await saveUser(complexUser);

    const savedData = getMockData(
      DatabaseCollections.USERS,
      "complex-user-123"
    );
    expect(savedData).toEqual({
      id: "complex-user-123",
      email: "complex@example.com",
      fullName: "Complex User Name",
      isNewUser: true,
      emailVerified: false, // Overridden
      createdAt: "__SERVER_TIMESTAMP__", // Overridden
    });
  });

  it("should handle errors from Firestore operations", async () => {
    // Mock the firestore instance to throw an error
    const mockFirestoreInstance = firestore();
    const originalCollection = mockFirestoreInstance.collection;
    mockFirestoreInstance.collection = jest.fn().mockImplementation(() => {
      throw new Error("Firestore connection failed");
    });

    await expect(saveUser(mockUser)).rejects.toThrow(
      "Firestore connection failed"
    );

    // Restore the original function
    mockFirestoreInstance.collection = originalCollection;
  });
});
