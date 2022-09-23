import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyC6g0b31U3oOBz3eOcw-VldOTWy2rEkiWs",
  authDomain: "vuejs-firebase-01-b0922.firebaseapp.com",
  projectId: "vuejs-firebase-01-b0922",
  storageBucket: "vuejs-firebase-01-b0922.appspot.com",
  messagingSenderId: "700820581586",
  appId: "1:700820581586:web:509a167d0f30a34876d10b",
  measurementId: "G-8GC4EBJ3VG"
};
// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
firebaseApp.firestore().settings({});

export default firebaseApp.firestore();
