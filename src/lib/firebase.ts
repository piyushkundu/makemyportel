// Firebase Configuration for MakeMyPortal

import { initializeApp, getApps } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyAerYmFA66PLpis6GE7U0Iw9n9wWOq_F5k",
    authDomain: "makemyportel.firebaseapp.com",
    projectId: "makemyportel",
    storageBucket: "makemyportel.firebasestorage.app",
    messagingSenderId: "160521439713",
    appId: "1:160521439713:web:ba9813d31a000b0dec6aa0",
    measurementId: "G-04HJ927D20"
};

// Initialize Firebase (prevent multiple instances during hot reload)
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

// Initialize Services
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);

export default app;
