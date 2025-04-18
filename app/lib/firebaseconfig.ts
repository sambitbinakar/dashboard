
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDDddF1mNTJfMvRv58W9Ih6KCMW8XWkZhU",
  authDomain: "aiparkingcamera.firebaseapp.com",
  databaseURL: "https://aiparkingcamera-default-rtdb.firebaseio.com",
  projectId: "aiparkingcamera",
  storageBucket: "aiparkingcamera.firebasestorage.app",
  messagingSenderId: "323243198214",
  appId: "1:323243198214:web:d1f29d9c9153be839e4087"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app)

export {database}