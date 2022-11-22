import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyC2ljVogNEvHVjU7MN3Esq-rQcat6_ZIBw",
  authDomain: "shoutouts-40ace.firebaseapp.com",
  projectId: "shoutouts-40ace",
  storageBucket: "shoutouts-40ace.appspot.com",
  messagingSenderId: "158800010406",
  appId: "1:158800010406:web:8858bfc2d20ff3d81fe867",
};
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
const authProvider = new GoogleAuthProvider();

export function signInWithGoogle(): void {
  signInWithPopup(auth, authProvider);
}
export function signOut(): void {
  auth.signOut();
}
export const storage = getStorage(app);
