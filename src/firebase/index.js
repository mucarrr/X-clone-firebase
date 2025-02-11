// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth";
import {getStorage} from "firebase/storage";
import {getFirestore} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAArKTpABRwzaHcg2AFHDxQx4q5MtOVabE",
  authDomain: "x-clone-99409.firebaseapp.com",
  projectId: "x-clone-99409",
  storageBucket: "x-clone-99409.firebasestorage.app",
  messagingSenderId: "583923171333",
  appId: "1:583923171333:web:5b22fea0e1c0f19cd81c6c",
  measurementId: "G-MV8CVRMR5J"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider()
export const storage = getStorage(app)
export const db = getFirestore(app)

