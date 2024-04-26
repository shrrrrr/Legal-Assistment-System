import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAJaB74lT_xSNag4bV-fufr4AW1uO-qDTw",
    authDomain: "mobilee-c46ff.firebaseapp.com",
    projectId: "mobilee-c46ff",
    storageBucket: "mobilee-c46ff.appspot.com",
    messagingSenderId: "989134185064",
    appId: "1:989134185064:web:cc8be5183a1b95d7fc11dd",
    measurementId: "G-WXS90ZB22D"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
