import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAjBztFNL_DZStaN1Eq7dXsnv7xU7u6-9Q",
  authDomain: "jobs-cde29.firebaseapp.com",
  projectId: "jobs-cde29",
  storageBucket: "jobs-cde29.appspot.com",
  messagingSenderId: "992854116233",
  appId: "1:992854116233:web:e7b49e9e1ef91680250358",
  measurementId: "G-7B1TKC1JVZ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
