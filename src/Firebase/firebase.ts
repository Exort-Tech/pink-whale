import * as firebase from 'firebase';


const firebaseConfig = {
  apiKey: "AIzaSyBgOoYuSle4mtIfN-y61fogW7sbImRTYQ0",
  authDomain: "pink-whale-b3e3c.firebaseapp.com",
  databaseURL: "https://pink-whale-b3e3c.firebaseio.com",
  projectId: "pink-whale-b3e3c",
  storageBucket: "pink-whale-b3e3c.appspot.com",
  messagingSenderId: "992567108785",
  appId: "1:992567108785:web:d2a56ee96724a09b26ae90"
};


const Firebase = firebase.initializeApp(firebaseConfig);

export default Firebase
