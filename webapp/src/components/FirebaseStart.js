// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

const firebase_key = process.env.REACT_APP_FIREBASE_KEY

// Your web app's Firebase configuration
const firebaseConfig = {
apiKey: firebase_key,
authDomain: "wiq5a-3f58f.firebaseapp.com",
projectId: "wiq5a-3f58f",
storageBucket: "wiq5a-3f58f.appspot.com",
messagingSenderId: "604775470186",
appId: "1:604775470186:web:f1b9f7e134e2ced1546613"
};

// Initialize Firebase
const FirebaseStart = initializeApp(firebaseConfig);

export default FirebaseStart;