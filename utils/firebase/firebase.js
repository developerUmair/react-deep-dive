import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyDWFDRZLN5bnzhKACHGXj9wPL4EbPFrX1Y",
    authDomain: "todolist-69fdd.firebaseapp.com",
    projectId: "todolist-69fdd",
    storageBucket: "todolist-69fdd.appspot.com",
    messagingSenderId: "194884092614",
    appId: "1:194884092614:web:1fae91931232870dc68dc7"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
