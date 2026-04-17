import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBRO5nI9iM8y3RAkqmJT8yOHS2Vuotok28",
    authDomain: "prova0417.firebaseapp.com",
    projectId: "prova0417",
    storageBucket: "prova0417.firebasestorage.app",
    messagingSenderId: "628228333252",
    appId: "1:628228333252:web:ef4bcb8454966a8d76f391"
  };
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  
  export const auth = getAuth(app);
  export const db = getFirestore(app);