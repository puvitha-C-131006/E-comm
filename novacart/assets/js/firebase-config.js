const firebaseConfig = {
  apiKey: "AIzaSyCIKFsa0TspF74zyjbY7Mc4hS9WxJp46ko",
  authDomain: "novacart-841d6.firebaseapp.com",
  projectId: "novacart-841d6",
  storageBucket: "novacart-841d6.firebasestorage.app",
  messagingSenderId: "549815736481",
  appId: "1:549815736481:web:8c6414ace687c9483fb8e0",
  measurementId: "G-5FRJD2NM8Z"
};

// Initialize Firebase
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}
const auth = firebase.auth();
const db = firebase.firestore();
