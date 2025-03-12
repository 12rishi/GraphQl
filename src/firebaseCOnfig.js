import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyA_CtSBFHid3n1BvP35-iUR6k8HZuiAWco",
  authDomain: "graphql-885ee.firebaseapp.com",
  projectId: "graphql-885ee",
  storageBucket: "graphql-885ee.firebasestorage.app",
  //   messagingSenderId: "418961359125",
  appId: "1:418961359125:web:afb87c88619bf1aa0d291c",
  measurementId: "G-GK290BSMKQ",
};
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
