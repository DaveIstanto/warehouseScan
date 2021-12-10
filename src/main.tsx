import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

// Firebase init
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCoslUIj-ZiwCVtXuBSJzIUL4DRGQCR2UQ",
  authDomain: "warehousescan-7cfce.firebaseapp.com",
  projectId: "warehousescan-7cfce",
  storageBucket: "warehousescan-7cfce.appspot.com",
  messagingSenderId: "1081021814919",
  appId: "1:1081021814919:web:b007b4888ef3ebe1c74022",
  measurementId: "${config.measurementId}",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
getAnalytics(app);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
