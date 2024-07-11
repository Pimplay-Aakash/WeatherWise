// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCcJIAtmQvvIrhY0frq1f9cDX0WhRpa-ZM",
  authDomain: "weather-40426.firebaseapp.com",
  projectId: "weather-40426",
  storageBucket: "weather-40426.appspot.com",
  messagingSenderId: "717350349830",
  appId: "1:717350349830:web:e54b34a26d0191bf286787"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);