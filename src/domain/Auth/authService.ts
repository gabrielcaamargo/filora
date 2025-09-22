import { firebaseAuth } from "@lib";
import { userAdapter } from "../User/userAdapter";
import { User } from "../User/userTypes";

export type SignupWithEmailAndPasswordParams = {
  email: string;
  password: string;
};

async function signupWithEmailAndPassword({
  email,
  password,
}: SignupWithEmailAndPasswordParams): Promise<User> {
  try {
    const userCredential = await firebaseAuth.signupWithEmailAndPassword(
      email,
      password
    );

    const user = userAdapter.firebaseAuthToUser(userCredential);

    return user;
  } catch (error) {
    throw error;
  }
}

export const authService = {
  signupWithEmailAndPassword,
};
