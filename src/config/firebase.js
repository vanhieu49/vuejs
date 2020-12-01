import firebase from "firebase/app";
import firebaseConfig from './firebaseConfig';
import 'firebase/database';
import 'firebase/auth';

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth()
export const database = firebase.database();


export const tasksRef = database.ref("tasks");
export const userRef = database.ref("users");
// auth.signOut();

console.log("auth.currentUser:",
    auth.currentUser)

setTimeout(() => {
    console.log("auth.currentUser:",
        auth.currentUser)

}, 5000);