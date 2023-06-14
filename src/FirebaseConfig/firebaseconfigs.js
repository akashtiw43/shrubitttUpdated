
// import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import {getStorage} from "firebase/storage"





// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD-5Hfdk7z4jelYWssRGLPvY4f_s0KIafg",
  authDomain: "shrubit-41a53.firebaseapp.com",
  projectId: "shrubit-41a53",
  storageBucket: "shrubit-41a53.appspot.com",
  messagingSenderId: "976532160631",
  appId: "1:976532160631:web:ab1a431e8310ff8af9c672"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const firestore = getFirestore(app);
export const db = getStorage(app);
