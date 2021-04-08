import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs'
import * as firebase from 'firebase/app';
import 'firebase/messaging'
import Swal from 'sweetalert2';
@Injectable()
export class MessagingService {
private messaging;
currentMessage = new BehaviorSubject(null); 
fcmToken = new BehaviorSubject(null);
    constructor() {
        firebase.initializeApp({
            apiKey: "AIzaSyBIzV2hjFaFt3enV2GfLlcsI6HwvetJRek",
            authDomain: "bellboy-280008.firebaseapp.com",
            databaseURL: "https://bellboy-280008.firebaseio.com",
            projectId: "bellboy-280008",
            storageBucket: "bellboy-280008.appspot.com",
            messagingSenderId: "239717342474",
            appId: "1:239717342474:web:7797ebd7e105ab0f22aef3",
            measurementId: "G-M7XDEFN5VZ"
        })
        this.messaging = firebase.messaging();
    }
      getPermission() {
    this.messaging.requestPermission()
    .then(() => {
      return this.messaging.getToken()
    })
    .then(token => {
      this.fcmToken.next(token);
    })
    .catch((err) => {
        Swal.fire({
            icon:'warning',
            title:'Please allow notification',
            text:'Something went wrong',
            width:'300px',
            timer:2500,
            showConfirmButton:false
        })
    });
  }
  // used to show message when app is open
  receiveMessages() {
    this.messaging.onMessage(payload => {
     this.currentMessage.next(payload);
   });
  }
}