import { Component, OnInit } from '@angular/core';
import { MessagingService } from './shared/services/messaging.service';
import { GlobalService } from './shared/services/global-service.service';
import Swal from 'sweetalert2';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { environment } from 'environments/environment';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { ResolverService } from './shared/services/resolver.service';
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
  subscription: Subscription;
  constructor(private messagingService: MessagingService, private gs:GlobalService, private router:Router,
    private title:Title, private route:ActivatedRoute, private resolver:ResolverService) { }
  ngOnInit() {
    this.subscription = this.router.events
        .pipe(
            filter(event => event instanceof NavigationEnd)
        )
        .subscribe(() => {
          let _root = this.route.root.children[0].children[0];
          this.resolver.sendRouteData(_root)
          this.resolver.currentUserCheck();
          return window.scrollTo(0, 0)
        });
    this.version = environment.appVersion;
    this.title.setTitle(`Bellboy v${this.version}`)
    this.messagingService.getPermission();
    this.messagingService.fcmToken.subscribe((res:any)=>{
      if(res!=null){
      this.fcmToken = res; 
      let token = JSON.stringify(localStorage.getItem('token'));
      if(token!=null || token !== undefined){
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