import { Component, OnInit } from '@angular/core';
import { MessagingService } from './shared/services/messaging.service';
import { GlobalService } from './shared/services/global-service.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { environment } from 'environments/environment';
var Toast = Swal.mixin({
  toast:true,
  position:'top-end',
  showConfirmButton:true,
  showCloseButton:true,
  confirmButtonText:'Assign Bellboy',
  timerProgressBar:true,
  onOpen:(e)=>{
    e.addEventListener('mouseenter', Swal.stopTimer);
    e.addEventListener('mouseleave', Swal.resumeTimer);
  }
})
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  fcmToken
  version:string;
  constructor(private messagingService: MessagingService, private gs:GlobalService, private router:Router,
    private title:Title) { }
  ngOnInit() {
    this.version = environment.appVersion;
    this.title.setTitle(`Bellboy v${this.version}`)
    this.messagingService.getPermission();
    this.messagingService.fcmToken.subscribe((res:any)=>{
      if(res!=null){
      this.fcmToken = res; 
      let token = JSON.stringify(localStorage.getItem('token'));
      if(token!=null){
        this.gs.registerFcmToken(this.fcmToken).subscribe();
        this.messagingService.receiveMessages();
        this.messagingService.currentMessage.subscribe((res:any)=>{
          if(res!=null){
            let message = res.notification;
            let data = res.data
              let audio = new Audio();
              audio.src = '../assets/media/delivery_report.mp3';
              audio.load();
              audio.play().then(()=>{
                Toast.fire({
                  icon: 'success',
                  title: message.title+'<br>',
                  text:message.body
                }).then((result)=>{
                  if(result.value){
                    this.viewDetail(data._id)
                  }
                })
              })
          }
        })
      }
      }
    });
  }
  viewDetail(id){
    this.router.navigate(['/hiring/hiringDetail', id]);
  }
}