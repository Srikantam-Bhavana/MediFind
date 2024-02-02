// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import {getAuth} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyCCJtIqxKk7VKVdOkWN-4axJ3K82ImRg5Q",
  authDomain: "medifind-b308b.firebaseapp.com",
  projectId: "medifind-b308b",
  storageBucket: "medifind-b308b.appspot.com",
  messagingSenderId: "420870629868",
  appId: "1:420870629868:web:9b5e8f308259dbbc18b8c9",
  measurementId: "G-98DD0BVD9H"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const database = getFirestore(app);