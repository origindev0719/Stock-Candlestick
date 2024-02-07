// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA5W_bTYhr7hj5eJk3pb9fvFIZboh0bCXw",
  authDomain: "el-parlay-chat.firebaseapp.com",
  projectId: "el-parlay-chat",
  storageBucket: "el-parlay-chat.appspot.com",
  messagingSenderId: "638111536329",
  appId: "1:638111536329:web:ea4be5cfa60b35444a6918",
  measurementId: "G-8RVF166DX9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const firestore = getFirestore(app);
export default app;

// Detect auth state
//auth.onAuthStateChanged(user => {
//  if(user !== null) {
//    console.log('logged in!')
//  } else {
//    console.log('No user')
//  }
//});