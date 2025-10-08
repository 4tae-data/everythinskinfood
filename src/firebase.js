// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCpV2MYD6FUW3uTn5o4lROfKOKZDHyvf14",
  authDomain: "everythingskinfood.firebaseapp.com",
  projectId: "everythingskinfood",
  storageBucket: "everythingskinfood.firebasestorage.app",
  messagingSenderId: "1046264629081",
  appId: "1:1046264629081:web:6f5ba3b377dcae3f6aee48",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";

export const auth = getAuth(app);
export { signInWithEmailAndPassword, signOut };
