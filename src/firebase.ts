import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: "wavetrace-79ec7.firebaseapp.com",
    projectId: "wavetrace-79ec7",
    storageBucket: "wavetrace-79ec7.appspot.com",
    messagingSenderId: "228888433623",
    appId: "1:228888433623:web:75917ec9606fb471117192",
    measurementId: "G-FZ9GYTJMVX"
  };
  
  // Initialize Firebase
  export const app = initializeApp(firebaseConfig);

  export const auth = getAuth();