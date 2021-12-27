import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PagerService } from 'app/shared/services/pager.service';
import { Subscription } from 'rxjs';
import { Notific } from '../model';
import { NotificationService } from '../notification.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {
  allNotific:Notific;
  pager:{};
  subscription:Subscription;
  type;
  constructor(
    private notService:NotificationService, 
    private pagerService:PagerService,
    private activatedRoute:ActivatedRoute) { 
  }

  ngOnInit() {
    let title = this.activatedRoute.snapshot.data.text;
    if(title === 'Customer Notification'){
      this.type = 'customer';
    }else{
      this.type = 'bellboy';
    }
    this.getNotfic(1, this.type);
  }

  getNotfic(page, type){
    this.type = type;
    this.subscription = this.notService.getNotifications(10, page, type) 
    .subscribe((res:any)=>{
      this.allNotific = res.notifications;
      this.pager = this.pagerService.getPager(res.notificationCount, page);
    }, error=>{}, ()=>{this.subscription.unsubscribe();})
  }
  receivePageNumber(currentPage:number){
    this.getNotfic(currentPage, this.type);
  }
}