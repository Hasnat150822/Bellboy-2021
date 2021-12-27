import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PagerService } from 'app/shared/services/pager.service';
import { ChargesService } from '../charges.service';

@Component({
  selector: 'app-view-timeline',
  templateUrl: './view-timeline.component.html',
  styleUrls: ['./view-timeline.component.scss']
})
export class ViewTimelineComponent implements OnInit {
  @Input() singleItem;
  timeLineData;
  pager:any = {};
  pageItems:any;
  spinner:boolean;
  constructor(private modalService:NgbModal, private service:ChargesService, private pagerService:PagerService) { }

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
    this.service.getTimeLine(this.singleItem.charges_type, this.singleItem.bellboy_type, status).subscribe((res:any)=>{
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