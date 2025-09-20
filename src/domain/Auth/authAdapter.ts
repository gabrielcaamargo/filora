import { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { User } from "./authTypes";

function firebaseAuthToUser(
  userCredential: FirebaseAuthTypes.UserCredential
): User {
  return {
    fullName: userCredential.user.displayName ?? "",
    id: userCredential.user.uid,
    email: userCredential.user.email ?? "",
    isNewUser: userCredential?.additionalUserInfo?.isNewUser ?? false,
    createdAt: userCredential.user.metadata.creationTime ?? "",
  };
}

export const authAdapter = {
  firebaseAuthToUser,
};
