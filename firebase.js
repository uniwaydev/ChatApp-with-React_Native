import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyA_VYvGTjbUQvgNtG-BzWnEqGxz0OLUT1Y",
  authDomain: "signal-clone-b0181.firebaseapp.com",
  projectId: "signal-clone-b0181",
  storageBucket: "signal-clone-b0181.appspot.com",
  messagingSenderId: "771530258",
  appId: "1:771530258:web:8c16ac236aab5a375dc2cb",
  measurementId: "G-YMDSNGT3ZT",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
export { db, auth };
