import firebase from "firebase";
import "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCFuet1rmeiKeUGbchc1BwgO1sbEbG0RUU",

    authDomain: "stockrain-3d18d.firebaseapp.com",
  
    databaseURL: "https://stockrain-3d18d-default-rtdb.asia-southeast1.firebasedatabase.app",
  
    projectId: "stockrain-3d18d",
  
    storageBucket: "stockrain-3d18d.appspot.com",
  
    messagingSenderId: "651787294372",
  
    appId: "1:651787294372:web:0e3217f15940aed3f2f831"
};


if(!firebaseConfig.apiKey) throw new Error("Missing API key");
if(!firebaseConfig.authDomain) throw new Error("Missing auth domain");
if(!firebaseConfig.projectId) throw new Error("Missing projectID");
if(!firebaseConfig.storageBucket) throw new Error("Missing storage bucket");
if(!firebaseConfig.messagingSenderId) throw new Error("Missing messaging sender");
if(!firebaseConfig.appId) throw new Error("Missing appID"); 

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
export { db };