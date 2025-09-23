import firestore from "@react-native-firebase/firestore";
import { DatabaseCollections } from "../databaseTypes";
import { getAuth } from "@react-native-firebase/auth";
import { User } from "@domain";

export async function getUserProfile() {
  const userId = getAuth().currentUser?.uid;

  if (!userId) {
    throw new Error("User not authenticated");
  }

  const user = await firestore()
    .collection(DatabaseCollections.USERS)
    .doc(userId)
    .get();
  return user.data() as User;
}
