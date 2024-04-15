import firebase from 'firebase/compat/app'
import 'firebase/compat/database'

const firebaseConfig = {
  apiKey: "AIzaSyBHZkBAxe18ZD1uDPxXZ91RMpOksBMfUQA",
  authDomain: "firebse-react2.firebaseapp.com",
  projectId: "firebse-react2",
  storageBucket: "firebse-react2.appspot.com",
  messagingSenderId: "648692457327",
  appId: "1:648692457327:web:d23ba59e2e5d871a09d29a"
};

  firebase.initializeApp(firebaseConfig);
  export const dataRef = firebase.database();
  export default firebase;