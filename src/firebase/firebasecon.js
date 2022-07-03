import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
import {getAuth} from "firebase/auth"
const firebaseConfig = {
  apiKey: "AIzaSyC6q7r2fvPo7FQjYMIGYh19VF9OwZwzfWk",
  authDomain: "react-login-233d2.firebaseapp.com",
  projectId: "react-login-233d2",
  storageBucket: "react-login-233d2.appspot.com",
  messagingSenderId: "47263573433",
  appId: "1:47263573433:web:7420d5350533a47d734268",
  measurementId: "G-Q8M6DVRW9T"
};

const app = initializeApp(firebaseConfig);
export const db =getFirestore(app)
export const auth =getAuth(app)