// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage'; 
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {getAuth, initializeAuth, getReactNativePersistence, GoogleAuthProvider} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDBgjlhJZBqvw_SJMbqIvXJpzdSvRrv2_E",
  authDomain: "reactnative-login-781a8.firebaseapp.com",
  projectId: "reactnative-login-781a8",
  storageBucket: "reactnative-login-781a8.appspot.com",
  messagingSenderId: "716742929709",
  appId: "1:716742929709:web:8bb3746f5ec5ebf4e377a4"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

//export const auth = getAuth(app);
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

export const db = getFirestore(app);

//Android: 625060658238-8ra0p9hdoa7m2v5tvclhpr6vrevvpk7n.apps.googleusercontent.com