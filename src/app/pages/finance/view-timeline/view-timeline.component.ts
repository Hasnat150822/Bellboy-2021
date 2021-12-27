import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PagerService } from 'app/shared/services/pager.service';
<<<<<<< HEAD
import { ChargesService } from '../charges.service';
=======
import { FinanceService } from '../finance.service';
>>>>>>> webfix/bellboy-copy

@Component({
  selector: 'app-view-timeline',
  templateUrl: './view-timeline.component.html',
  styleUrls: ['./view-timeline.component.scss']
})
export class ViewTimelineComponent implements OnInit {
<<<<<<< HEAD
  @Input() singleItem;
=======
  @Input() testing;
>>>>>>> webfix/bellboy-copy
  timeLineData;
  pager:any = {};
  pageItems:any;
  spinner:boolean;
<<<<<<< HEAD
  constructor(private modalService:NgbModal, private service:ChargesService, private pagerService:PagerService) { }
=======
  constructor(private modalService:NgbModal, private service:FinanceService, private pagerService:PagerService) { }
>>>>>>> webfix/bellboy-copy

  ngOnInit() {
    this.getTimeline('');
  }
  closeModal(){
    this.modalService.dismissAll();
  }
  getTimeline(status){
    this.spinner = true;
    this.timeLineData = [];
    this.pageItems = [];
<<<<<<< HEAD
    this.service.getTimeLine(this.singleItem.charges_type, this.singleItem.bellboy_type, status).subscribe((res:any)=>{
=======
    this.service.getTimeLine(this.testing, status).subscribe((res:any)=>{
>>>>>>> webfix/bellboy-copy
      this.timeLineData = res;
      this.spinner = false;
      this.setPage(1);
    })
  }
  setPage(page:number){
    if(page>this.pager.totalPages){
      page = this.pager.totalPages
    }else if(page<0){
      page = 1
    }
    this.pager = this.pagerService.getPager(this.timeLineData.length, page, 5)
    this.pageItems = this.timeLineData.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }
}