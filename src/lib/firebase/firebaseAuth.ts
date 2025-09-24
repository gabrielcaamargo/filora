import {
  getAuth,
  createUserWithEmailAndPassword,
  FirebaseAuthTypes,
  updateProfile,
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

async function updateUserName(name: string) {
  const auth = getAuth();

  if (!auth.currentUser) {
    throw new Error("User not authenticated");
  }

  await updateProfile(auth.currentUser, { displayName: name });
}

export const firebaseAuth = {
  signupWithEmailAndPassword,
  updateUserName,
};
