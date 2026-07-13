"use client";
import { initializeApp, getApps } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCM4bP1u4MRevkMWeASyCZILinv4RVLk4I",
  authDomain: "edugames-f860c.firebaseapp.com",
  projectId: "edugames-f860c",
  storageBucket: "edugames-f860c.firebasestorage.app",
  messagingSenderId: "897443098815",
  appId: "1:897443098815:web:c85626c7842f5f64cf560a",
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();
export default app;
