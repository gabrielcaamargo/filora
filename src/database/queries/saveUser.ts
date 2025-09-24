import { User } from "@domain";
import firestore from "@react-native-firebase/firestore";
import { DatabaseCollections } from "../databaseTypes";

export async function saveUser(user: User) {
  try {
    await firestore()
      .collection(DatabaseCollections.USERS)
      .doc(user.id)
      .set(
        {
          ...user,
          emailVerified: false,
          createdAt: firestore.FieldValue.serverTimestamp(),
        },
        { merge: true }
      );
  } catch (error) {
    throw error;
  }
}
