import { initializeApp } from "firebase/app";
import { getDatabase }  from "firebase/database";


const firebaseConfig = {
    apiKey: "AIzaSyCN--HhaYW0twi1mBcbkD07NGpjOpiiTBA",
    authDomain: "sirri-5dcf3.firebaseapp.com",
    databaseURL: "https://sirri-5dcf3-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "sirri-5dcf3",
    storageBucket: "sirri-5dcf3.appspot.com",
    messagingSenderId: "539693831562",
    appId: "1:539693831562:web:0b286ef54f4bb9d4076473",
    measurementId: "G-DML37WNV5H"
  };

const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);