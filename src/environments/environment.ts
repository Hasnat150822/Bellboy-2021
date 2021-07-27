export const environment = {
  production: false,
  appVersion: require('../../package.json').version + '-dev',
  // apiUrl:'http://192.168.100.5:3000/',
  apiUrl:'https://debugapi.bellboy.co/',
  // apiUrl:'https://api.bellboy.co/',
  firebase: {
      apiKey: "AIzaSyBIzV2hjFaFt3enV2GfLlcsI6HwvetJRek",
      authDomain: "bellboy-280008.firebaseapp.com",
      databaseURL: "https://bellboy-280008.firebaseio.com",
      projectId: "bellboy-280008",
      storageBucket: "bellboy-280008.appspot.com",
      messagingSenderId: "239717342474",
      appId: "1:239717342474:web:7797ebd7e105ab0f22aef3",
      measurementId: "G-M7XDEFN5VZ"
    }
  };