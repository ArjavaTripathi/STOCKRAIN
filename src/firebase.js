// Import the functions you need from the SDKs you need
import firebase from "firebase/app";
import "firebase/firestore"; // Import the Firestore service

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCFuet1rmeiKeUGbchc1BwgO1sbEbG0RUU",
  authDomain: "stockrain-3d18d.firebaseapp.com",
  databaseURL: "https://stockrain-3d18d-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "stockrain-3d18d",
  storageBucket: "stockrain-3d18d.appspot.com",
  messagingSenderId: "651787294372",
  appId: "1:651787294372:web:0e3217f15940aed3f2f831"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const db = app.firestore();

// Export the Firebase app instance and the Firestore database instance
export { db, firebaseConfig};
