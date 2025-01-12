import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDiRiFq9DHxj1zbQBGSe1VzTH0OV1Np1Yo",
  authDomain: "bytebuddy-c99aa.firebaseapp.com",
  projectId: "bytebuddy-c99aa",
  storageBucket: "bytebuddy-c99aa.firebasestorage.app",
  messagingSenderId: "817883905988",
  appId: "1:817883905988:web:39eac4801e6515ddc62e91",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);