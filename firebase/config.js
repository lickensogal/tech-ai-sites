// Import the functions you need from the SDKs
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-analytics.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-storage.js";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDVGPIA5OyZ3wasXUVw4bzEdVQHU5Ytyh0",
  authDomain: "tech-ai-site.firebaseapp.com",
  projectId: "tech-ai-site",
  storageBucket: "tech-ai-site.firebasestorage.app",
  messagingSenderId: "906465898441",
  appId: "1:906465898441:web:7e010cf2a8c24f3065c218",
  measurementId: "G-KD801H84FN"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
