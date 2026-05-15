// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD3bLl6f8aKZvqb6zYjlIQJwmaOBHiBM3s",
  authDomain: "clone-6cb97.firebaseapp.com",
  projectId: "clone-6cb97",
  storageBucket: "clone-6cb97.firebasestorage.app",
  messagingSenderId: "299570170749",
  appId: "1:299570170749:web:b49cca3e4a85142f711a14",
  measurementId: "G-33B2LHKCPF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);
export { auth, db };