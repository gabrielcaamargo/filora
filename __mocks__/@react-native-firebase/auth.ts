export interface User {
  uid: string;
  email: string | null;
}

export const mockUser: User = {
  uid: "test-uid",
  email: "test@example.com",
};

export const sharedAuthProviders = {
  AppleAuthProvider: {
    credential: jest.fn().mockImplementation((token, nonce) => ({
      token,
      nonce,
      providerId: "apple.com",
    })),
  },
  GoogleAuthProvider: {
    credential: jest.fn().mockImplementation((idToken) => ({
      idToken,
      providerId: "google.com",
    })),
  },
};

export const sharedAuthMethods = {
  signInWithCredential: jest
    .fn()
    .mockImplementation(() => Promise.resolve({ user: mockUser })),
  signOut: jest.fn().mockImplementation(() => Promise.resolve()),
  fetchSignInMethodsForEmail: jest
    .fn()
    .mockImplementation(() => Promise.resolve(["google.com"])),
};

export interface FirebaseAuthTypes {
  User: User;
}

const authInstance = {
  currentUser: mockUser,
  signInWithEmailAndPassword: jest
    .fn()
    .mockImplementation(() => Promise.resolve({ user: mockUser })),
  createUserWithEmailAndPassword: jest
    .fn()
    .mockImplementation(() => Promise.resolve({ user: mockUser })),
  ...sharedAuthMethods,
  ...sharedAuthProviders,
};

export const getAuth = () => authInstance;

export const signInWithEmailAndPassword =
  authInstance.signInWithEmailAndPassword;
export const createUserWithEmailAndPassword =
  authInstance.createUserWithEmailAndPassword;
export const signOut = authInstance.signOut;
export const signInWithCredential = authInstance.signInWithCredential;
export const AppleAuthProvider = authInstance.AppleAuthProvider;
export const GoogleAuthProvider = authInstance.GoogleAuthProvider;

const auth = () => authInstance;
auth.AppleAuthProvider = authInstance.AppleAuthProvider;
auth.GoogleAuthProvider = authInstance.GoogleAuthProvider;

export default auth;
