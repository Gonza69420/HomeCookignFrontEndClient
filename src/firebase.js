// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getStorage} from 'firebase/storage'
const firebaseConfig = {
  apiKey: "AIzaSyC581XCvWjvBoS2pepjUgXkDFD3UHStdnY",
  authDomain: "homecooking-346302.firebaseapp.com",
  projectId: "homecooking-346302",
  storageBucket: "homecooking-346302.appspot.com",
  messagingSenderId: "267124060929",
  appId: "1:267124060929:web:8cc8f7ada8089f02cee100",
  measurementId: "G-M269TVN3XE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const storage = getStorage(app);