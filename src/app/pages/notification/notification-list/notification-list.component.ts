import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Notific } from '../model';
import { amazonUrl, checkPage } from 'app/shared/services/global';
import * as allActions from '../../../ngrx-states/actions';
import { Store } from '@ngrx/store';
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
  isBig:boolean = false;
  constructor(private store:Store<URL>) {
   }

  ngOnInit(): void {
  }
  ngAfterViewInit(){
  }
  bigImage(url){
    this.isBig = true;
    this.store.dispatch(new allActions.SendUrl(url));
  }
  sendPage(page){
    page = checkPage(page, this.pager.totalPages);
    this.sendPageNumber.emit(page);
  }
}
