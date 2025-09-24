import {
  getAuth,
  createUserWithEmailAndPassword,
  FirebaseAuthTypes,
  signOut,
  signInWithEmailAndPassword,
} from "@react-native-firebase/auth";

async function signupWithEmailAndPassword(
  email: string,
  password: string
): Promise<FirebaseAuthTypes.UserCredential> {
  const auth = getAuth();

  const userCredentials = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );

  return userCredentials;
}

async function logOut() {
  const auth = getAuth();

  if (!auth.currentUser) {
    throw new Error("User not authenticated");
  }

  await signOut(auth);
}

async function logInWithEmailAndPassword(
  email: string,
  password: string
): Promise<FirebaseAuthTypes.UserCredential> {
  const auth = getAuth();

  const userCredentials = await signInWithEmailAndPassword(
    auth,
    email,
    password
  );

  return userCredentials;
}

export const firebaseAuth = {
  signupWithEmailAndPassword,
  logOut,
  logInWithEmailAndPassword,
};
