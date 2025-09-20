import { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { User } from "./userTypes";

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

export const userAdapter = {
  firebaseAuthToUser,
};
