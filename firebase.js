// Import the functions you need from the SDKs you need
import firebase from "firebase";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDVdn1N3uvGvydVTj17F5thIKRCQGF7RKU",
  authDomain: "rn-instagram-clone-28160.firebaseapp.com",
  projectId: "rn-instagram-clone-28160",
  storageBucket: "rn-instagram-clone-28160.appspot.com",
  messagingSenderId: "736983867361",
  appId: "1:736983867361:web:c20d5b295fc30bbf683ca0",
  measurementId: "G-GFENB6EQ8H",
};

// Initialize Firebase
!firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();
const db = firebase.firestore();

export { firebase, db };
