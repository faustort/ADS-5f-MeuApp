import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBsT0S5F68CEsdS8Pllw2j4StDz-iQV56k",
  authDomain: "appregistro5f.firebaseapp.com",
  projectId: "appregistro5f",
  storageBucket: "appregistro5f.appspot.com",
  messagingSenderId: "1023499054233",
  appId: "1:1023499054233:web:81458117ba54a954bfdc08",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth, app };
