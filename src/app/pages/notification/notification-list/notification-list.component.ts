import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Notific } from '../model';
import { amazonUrl } from 'app/shared/services/global';
@Component({
  selector: 'app-notification-list',
  templateUrl: './notification-list.component.html',
  styleUrls: ['./notification-list.component.css']
})
export class NotificationListComponent implements OnInit, AfterViewInit {
  @Input() lists:Notific;
  @Input() pager:any = {};
  @Output() sendPageNumber = new EventEmitter<number>()
  shortDescription:boolean = false;
  amazonImgUrl:string = amazonUrl;
  constructor() {
   }

  ngOnInit(): void {
  }
  ngAfterViewInit(){
  }
  sendPage(page){
    if(page<1){
      page = 1;
    }else if(page>this.pager.totalPages){
      page = this.pager.totalPages
    }
    this.sendPageNumber.emit(page);
  }
}
