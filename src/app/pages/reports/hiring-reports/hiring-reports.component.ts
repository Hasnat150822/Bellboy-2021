import { Component, OnInit } from '@angular/core';
import { HiringService } from 'app/pages/hiring/hiring.service';
import { downLoadFile } from 'app/shared/services/global';
import { PagerService } from 'app/shared/services/pager.service';
import { ReportsService } from '../reports.service';

@Component({
  selector: 'app-hiring-reports',
  templateUrl: './hiring-reports.component.html',
  styleUrls: ['./hiring-reports.component.css']
})
export class HiringReportsComponent implements OnInit {
  pager = {};
  specificBellboy:boolean = false;
  hiringData;
  status;
  page = 1;
  fromDate;
  toDate;
  otherParams;
  hiringType = 'hiring';
  isDownloading:boolean = false;
  totalHiringHeadins = [
    "ID", "Hiring ID", "Customer Name", "Customer Mobile No", "Bellboy Name", "Bellboy Mobile No", "Bellboy Type", "Start Time", "End Time", "Create Date", "Amount"
  ];
  searchType:string = 'searchByBellBoyName';
  searchValue:string;
  bellboyId:string;
  constructor(private hiringService:HiringService, private pagerService:PagerService, private service:ReportsService) { }

  ngOnInit(){
    this.getTotalHiring();
  }

  getDate(event:{fromDate, toDate}){
    this.fromDate = event.fromDate.split('T')[0];
    this.toDate = event.toDate.split('T')[0];
    this.getTotalHiring();
  }

  getPager(event){
    this.page = +event;
    this.getTotalHiring();
  }

  getTotalHiring(){
    this.hiringService.getAllHirings(this.status, this.page, this.searchType, this.searchValue, undefined,10, this.fromDate, this.toDate, this.hiringType)
    .subscribe((res:any)=>{
      if(this.searchValue){
        this.bellboyId = res.data.hirings[0]?.bellboy?._id;  
        console.log(this.bellboyId, '==>> bellboy id');
      }
      let tableRowData = [];
      res.data.hirings.forEach((el:any, i)=>{
        tableRowData.push(this.generateArray(el));
      })
      this.hiringData = tableRowData;
      this.pager = this.pagerService.getPager(res.data.count, this.page, 10);
    })
  }

  generateArray(el){
    return [
      {
        type:'default',
        value:el._id
      }, 
      {
        type:'default',
        value:el.hiring_id
      },
      {
        type:'default',
        value:el.customer.name
      },
      {
        type:'default',
        value:el.customer.mobile
      },
      {
        type:'default',
        value:el?.bellboy?.name
      },
      {
        type:'default',
        value:el?.bellboy?.mobile
      },
      {
        type:'default',
        value:el.bellboyType.title
      }, 
      {
        type:'date',
        value:el.start_time
      },
      {
        type:'date',
        value:el.end_time
      },
      {
        type:'date',
        value:el.created_at
      },
      {
        type:'default',
        value:el.amount
      }
    ]
  }

  downloadReport(){
    this.isDownloading = true;
    this.service.getHiringTotalReport(this.fromDate, this.toDate, this.otherParams, this.hiringType, this.bellboyId)
    .subscribe((res:any)=>{
      downLoadFile(res, 'Total Hirings');
      this.isDownloading = false;
    })
  }

  todayHirings(){
    let date = new Date();
    this.fromDate = date.toISOString().split('T')[0];
    this.toDate = date.toISOString().split('T')[0];
    this.specificBellboy = false;
    this.getTotalHiring();
  }

  searchBellboy(){
    this.fromDate = undefined;
    this.toDate = undefined;
    this.getTotalHiring()
  }

  totalHirings(){
    this.fromDate = undefined;
    this.toDate = undefined;
    this.specificBellboy = false;
    this.getTotalHiring();
  }

  resetDate(){
    this.fromDate = undefined;
    this.toDate = undefined;
    this.getTotalHiring();
  }
}
