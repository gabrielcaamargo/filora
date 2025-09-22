import {
  sharedAuthProviders,
  sharedAuthMethods,
} from "../../../../workspace/nurse-mobile-app/__mocks__/@react-native-firebase/auth";

const mockAuth = {
  ...sharedAuthMethods,
  onAuthStateChanged: jest.fn((callback) => {
    callback(null); // Simulate no user logged in by default
    return () => {}; // Return unsubscribe function
  }),
};

type FirebaseAuthType = typeof mockAuth & {
  AppleAuthProvider: {
    credential: jest.Mock;
  };
  GoogleAuthProvider: {
    credential: jest.Mock;
  };
};

const auth = Object.assign(
  () => mockAuth,
  sharedAuthProviders
) as unknown as () => FirebaseAuthType;

const firebase = { auth };

export default firebase;
