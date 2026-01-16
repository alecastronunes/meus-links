/* eslint-disable @typescript-eslint/no-unused-vars */
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCUgbqdNVVnDWCWZTZ7PDueG_1AJGjM1I4",
  authDomain: "devlinks-c55fb.firebaseapp.com",
  projectId: "devlinks-c55fb",
  storageBucket: "devlinks-c55fb.firebasestorage.app",
  messagingSenderId: "627894234584",
  appId: "1:627894234584:web:fa5f23c785a81c3fd096ad",
  measurementId: "G-6ZBBMGB261",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
