import { db } from "./firebasecon";
import {
  collection,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
const userCollectionRef = collection(db, "users");
const adminCollectionRef = collection(db, "acceptUser");
class UserDataService {
  addUsers = (newUser) => {
    return addDoc(userCollectionRef, newUser);
  };
  addUser = (users) => {
    return addDoc(adminCollectionRef, users);
  };
  updateUser = (id, updatedUser) => {
    const userDoc = doc(db, "users", id);
    return updateDoc(userDoc, updatedUser);
  };

  deleteUsers = (id) => {
    const userDocs = doc(db, "users", id);
    return deleteDoc(userDocs);
  };

  getAllUsers = () => {
    return getDocs(userCollectionRef);
  };

  getUser = (id) => {
    const userDoc = doc(db, "users", id);
    return getDoc(userDoc);
  };
}
export default new UserDataService();
