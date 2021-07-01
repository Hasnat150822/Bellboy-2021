// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here, other Firebase libraries
// are not available in the service worker.
importScripts('https://www.gstatic.com/firebasejs/7.18.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.18.0/firebase-messaging.js');
// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
firebase.initializeApp({
  apiKey: "AIzaSyBIzV2hjFaFt3enV2GfLlcsI6HwvetJRek",
  authDomain: "bellboy-280008.firebaseapp.com",
  databaseURL: "https://bellboy-280008.firebaseio.com",
  projectId: "bellboy-280008",
  storageBucket: "bellboy-280008.appspot.com",
  messagingSenderId: "239717342474",
  appId: "1:239717342474:web:7797ebd7e105ab0f22aef3",
  measurementId: "G-M7XDEFN5VZ"
});
// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();