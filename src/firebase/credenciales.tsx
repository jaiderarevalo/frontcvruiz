// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCL1A0gy_Gs7oQwjgQAiHKnf_p64LWx91U",
  authDomain: "images-storage-e2566.firebaseapp.com",
  projectId: "images-storage-e2566",
  storageBucket: "images-storage-e2566.appspot.com",
  messagingSenderId: "142598027436",
  appId: "1:142598027436:web:653aad5b7ecb9b2f8c8709"
};

// Initialize Firebase
const appFirebase = initializeApp(firebaseConfig);
export default appFirebase