//@ts-nocheck
import { initializeApp } from "firebase/app"
import { getDatabase } from "firebase/database"
import { getAuth } from "firebase/auth"
import { getStorage } from "firebase/storage"


// Your web app's Firebase configuration
const firebaseConfig = {
   apiKey: "AIzaSyD3khzq4Z0Wy1DuYXFW30k5cxqLtVBzkYM",
   authDomain: "dzemych-16240.firebaseapp.com",
   databaseURL: "https://dzemych-16240-default-rtdb.europe-west1.firebasedatabase.app",
   projectId: "dzemych-16240",
   storageBucket: "dzemych-16240.appspot.com",
   messagingSenderId: "652028084207",
   appId: "1:652028084207:web:cc2ea3cad4d96b6c59401a"
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

export const db = getDatabase(app)
export const storage = getStorage(app)
export const auth = getAuth(app)
