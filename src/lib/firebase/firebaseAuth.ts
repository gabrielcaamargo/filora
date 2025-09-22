import {
  getAuth,
  createUserWithEmailAndPassword,
  FirebaseAuthTypes,
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

export const firebaseAuth = {
  signupWithEmailAndPassword,
};
