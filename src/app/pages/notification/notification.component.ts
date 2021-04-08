import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { PagerService } from 'app/shared/services/pager.service';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { Notific } from './model';
import { NotificationService } from './notification.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {
  allNotific:Notific;
  pager:{};
  subscription:Subscription;
  constructor(private notService:NotificationService, private pagerService:PagerService) { 
  }

  ngOnInit() {
    this.getNotfic(1);
  }

  getNotfic(page){
    this.subscription = this.notService.getNotifications(10, page) 
    .subscribe((res:any)=>{
      this.allNotific = res.notifications;
      this.pager = this.pagerService.getPager(res.notificationCount, page);
    }, error=>{}, ()=>{this.subscription.unsubscribe();})
  }
  receivePageNumber(currentPage:number){
    this.getNotfic(currentPage);
  }
}
