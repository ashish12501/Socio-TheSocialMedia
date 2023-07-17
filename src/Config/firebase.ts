// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import { Firestore, getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyB_P6sZfA0T4HBICBPcGoTGpoRMKm6AqwI",
    authDomain: "socio-thesocialmedia.firebaseapp.com",
    projectId: "socio-thesocialmedia",
    storageBucket: "socio-thesocialmedia.appspot.com",
    messagingSenderId: "472469944462",
    appId: "1:472469944462:web:9ff056c24f088d2a72f1df",
    measurementId: "G-39C9JET6MZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);