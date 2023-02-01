import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDYzBTBa1_4QtyNslRbf7LuovkIIa_b6Tk",
  authDomain: "react-job-7639b.firebaseapp.com",
  projectId: "react-job-7639b",
  storageBucket: "react-job-7639b.appspot.com",
  messagingSenderId: "348585978895",
  appId: "1:348585978895:web:d5f764c0990410854b077a",
  measurementId: "G-7PQ7SXL3PP"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);