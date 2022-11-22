// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries




// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBhAvsGwTr-SVkwSnvTs_-iTMtP1W9n7QU",
  authDomain: "desaisiv-assignment.firebaseapp.com",
  projectId: "desaisiv-assignment",
  storageBucket: "desaisiv-assignment.appspot.com",
  messagingSenderId: "649705086066",
  appId: "1:649705086066:web:a7317b760511ef5f50f6eb"
};

// Initialize Firebase
export const firebase = initializeApp(firebaseConfig);
export const auth = getAuth(firebase);

export default firebase;