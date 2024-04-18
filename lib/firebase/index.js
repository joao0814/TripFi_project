// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyABV2l0P4DJWuAYwipYOS5sR6UHFtZkfnw",
  authDomain: "tripfi.firebaseapp.com",
  projectId: "tripfi",
  storageBucket: "tripfi.appspot.com",
  messagingSenderId: "761189283911",
  appId: "1:761189283911:web:a87a4d952a0a980a9f1962",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { app, db, auth };
