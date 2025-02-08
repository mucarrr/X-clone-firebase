// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth";
import {getStorage} from "firebase/storage";
import {getFirestore} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA-vplLyki9Fqd9ldVs5lSCk2kYkYYhpzQ",
  authDomain: "x-clone-9c2e8.firebaseapp.com",
  projectId: "x-clone-9c2e8",
  storageBucket: "x-clone-9c2e8.firebasestorage.app",
  messagingSenderId: "351834212140",
  appId: "1:351834212140:web:da55e46f343fa2dd5dce89",
  measurementId: "G-1M06DQ4F05"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider()
export const storage = getStorage(app)
export const db = getFirestore(app)

