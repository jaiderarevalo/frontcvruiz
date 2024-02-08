// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { API_KEY, APPID, AUTHDOMAIN, MESSAGINSENDERID, PROJECTID, STORAGEBUCKET } from "./redencialesENV/ENV";
const firebaseConfig = {
  apiKey:API_KEY ,
  authDomain:AUTHDOMAIN,
  projectId:PROJECTID,
  storageBucket: STORAGEBUCKET,
  messagingSenderId:MESSAGINSENDERID ,
  appId: APPID
};

// Initialize Firebase
const appFirebase = initializeApp(firebaseConfig);
export default appFirebase