// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import "firebase/analytics";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import {
  getFirestore,
  collection,
  enableIndexedDbPersistence,
} from "firebase/firestore";

export default defineNuxtPlugin((nuxtApp) => {
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    // apiKey: "AIzaSyB6IGQL65F2xvqXRa-J4lYUg5F9YvH_1DM",
    // authDomain: "magicai-417212.firebaseapp.com",
    // projectId: "magicai-417212",
    // storageBucket: "magicai-417212.appspot.com",
    // messagingSenderId: "1067770052785",
    // appId: "1:1067770052785:web:11bfd7c45ae692b42ce290",
    // measurementId: "G-7J0GF1P202",
    //001
    // apiKey: "AIzaSyBXUkNByRJwH0mewfLbG8JTVL5y5oJeaaw",
    // authDomain: "nsfwai-cf295.firebaseapp.com",
    // projectId: "nsfwai-cf295",
    // storageBucket: "nsfwai-cf295.appspot.com",
    // messagingSenderId: "419769720965",
    // appId: "1:419769720965:web:00e6d12db31d5f5d3a09ec",
    // measurementId: "G-VH8PQJ6N83",
    apiKey: "AIzaSyBHOAuU2vPAuikI1FGEr4R-DN2xHjKZ8JY",
    authDomain: "easyslimstart.firebaseapp.com",
    projectId: "easyslimstart",
    storageBucket: "easyslimstart.firebasestorage.app",
    messagingSenderId: "359776160829",
    appId: "1:359776160829:web:8d4856cfc97d45fdf5ee54",
    measurementId: "G-84H6VMK3YW",
  };
  /**
   *
   * */

  /**
  *   apiKey: "AIzaSyDHzq4TOoD4fE7b72MJLnsE9jmdr7jXyUA",
  authDomain: "nsfwai-d4c78.firebaseapp.com",
  projectId: "nsfwai-d4c78",
  storageBucket: "nsfwai-d4c78.appspot.com",
  messagingSenderId: "515855932589",
  appId: "1:515855932589:web:c11e21098d716a66d37a24",
  measurementId: "G-995D796EEY",
  */

  // Initialize Firebase
  // export const firebaseApp = initializeApp(firebaseConfig);
  // const app = initializeApp(firebaseConfig);
  // export const firebaseApp = getAnalytics(app);
  let app, auth, db, usersCollection;

  if (process.client) {
    app = initializeApp(firebaseConfig);
    auth = getAuth(app);
    db = getFirestore(app);
    usersCollection = collection(db, "users");

    // Enable offline persistence
    enableIndexedDbPersistence(db).catch((err) => {
      if (err.code == "failed-precondition") {
        console.log("Offline persistence already enabled");
        window.location.reload(true); // 强制刷新页面
      } else if (err.code == "unimplemented") {
        console.log("Offline persistence not available");
      }
    });

    // Load analytics only on client
    import("firebase/analytics").then(({ getAnalytics }) => {
      getAnalytics(app);
    });
  }

  return {
    provide: {
      firebase: {
        app,
        auth,
        db,
      },
    },
  };
});
