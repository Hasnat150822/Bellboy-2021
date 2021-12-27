import { Component, OnInit} from '@angular/core';
import { NgbCalendar, NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { startDateWeek } from 'app/shared/services/global';
import { PagerService } from 'app/shared/services/pager.service';
import { DashboardService } from './dashboard.service';
declare const $:any;
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers:[DashboardService]
})
export class DashboardComponent implements OnInit  {
  today; 
  markDisabled;
  startDate:any; endDate:any;
  loader:boolean = false;
  daysRecord;
  hiringDetail = [];
  customerDetail = [];
  bellboyDetail = [];
  pager:any = {};
  pager2:any = {};
  pager3:any = {}; 
  hiringItems = [];
  customerItems = [];
  bellboyItems = [];
  datePickerId;
  startDateforRecord; endDateforRecord;
  rangeRecord:boolean;
  rangeGraph:boolean;
  daysData:any;
  hiringResponse;
  constructor(
    private calendar:NgbCalendar, 
    private service:DashboardService, 
    private pagerService:PagerService
    ){}
  ngOnInit(){
    this.defaults();
  }
  graphData;
  defaults(){
    this.startDateforRecord, this.endDateforRecord = undefined;
    this.today = this.calendar.getToday(); //date in object formate
    this.markDisabled = (date: NgbDate, current: { month: number }) =>
    (date.day>this.today.day && date.month === this.today.month);
    var curr = new Date;
    this.startDate = new Date(curr.setDate(curr.getDate() - curr.getDay()+1)); //first day
    this.endDate = new Date(curr.setDate(curr.getDate() - curr.getDay()+7)); // last weekend day
    this.rangeRecord = false;
    this.rangeGraph = false;
    this.getDaysData();
    this.getGraphData();
    this.getDetailData();
  }
  sendStartDate;
  sendEndDate;
  getGraphData(){
    this.loader = true;
    let startDate = this.startDate.toISOString();
    let endDate = this.endDate.toISOString();
    this.service.getGraphRecord(startDate, endDate)
    .subscribe((res:any)=>{
      this.loader = false;
      this.fromDate = null;
      this.toDate = null;
      this.graphData = res;
      this.sendStartDate = this.startDate;
      this.sendEndDate = this.endDate;
    })
  }
  getDaysData(){
    this.loader = true;
    this.service.getDaysRecord(this.startDateforRecord, this.endDateforRecord)
    .subscribe((res:any)=>{
      this.loader = false;
      this.fromDate = null;
      this.toDate = null;
      let data = [];
      data[0] = (res.totalEarningDate/1000).toFixed(1);
      data[1] = res.totalCurrentDayCustomers;
      data[2] = res.totalCurrentDayBellBoys;
      data[3] = res.totalCurrentDayHirings;
      data[4] = res.totalNonAccepted;
      data[5] = res.totalInProgressHirings;
      data[6] = res.totalCompletedHirings;
      data[7] = res.totalCancelledHirings;
      data[8] = (res.totalDeliveries/1000).toFixed(1);
      data[9] = res.totalPersonalAssistants;
      data[10] = res.totalRides;
      data[11] = res.B2B;
      this.daysData = data;
    })
  }
  getDetailData(){
    this.service.getDetailRecord(this.startDateforRecord, this.endDateforRecord)
    .subscribe((res:any)=>{
      this.fromDate = null;
      this.toDate = null;
      this.hiringResponse = res;
      this.getHiringByStatus('hiring');
      this.customerDetail = res.currentDayCustomers;
      this.bellboyDetail = res.currentDayBellBoys;
      this.setPage(1, 'hiring');
      this.setPage(1, 'customer');
      this.setPage(1, 'bellboy');
    })
  }
  getHiringByStatus(status){
    switch (status) {
      case 'hiring':
          this.hiringDetail = this.hiringResponse.currentDayHirings;
        break;
      case 'pa':
          this.hiringDetail = this.hiringResponse.currentDayPersonalAssistants;
        break;
      case 'ride':
          this.hiringDetail = this.hiringResponse.currentDayRides;
        break;
    }
  }
  // pagination
  setPage(page, type){
    // if(page>this.pager.totalPages && this.pager.totalPages!==0){
    //   return;
    // }
    // else if(page<1){
    //   return
    // }
    if(type==="hiring"){
      this.pager = this.pagerService.getPager(this.hiringDetail.length, page, 4);
      this.hiringItems = this.hiringDetail.slice(this.pager.startIndex, this.pager.endIndex+1);
    }else if(type==="customer"){
      this.pager2 = this.pagerService.getPager(this.customerDetail.length, page, 4);
      this.customerItems = this.customerDetail.slice(this.pager2.startIndex, this.pager2.endIndex+1);
    }else{
      this.pager3 = this.pagerService.getPager(this.bellboyDetail.length, page, 4);
      this.bellboyItems = this.bellboyDetail.slice(this.pager3.startIndex, this.pager3.endIndex+1);
    }
  }
  showDatePick(id){
    this.datePickerId = id;
    $("#"+id).toggleClass('d-none');
  }
  // date range
  hoveredDate: NgbDate | null = null;
  fromDate: any;
  toDate: any | null = null;
  onDateSelection(date: any) {
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
    } else if (this.fromDate && !this.toDate && date.after(this.fromDate)) {
      this.toDate = date;
      $("#"+this.datePickerId).toggleClass('d-none');
      let fromDate = new Date;
      fromDate.setFullYear(this.fromDate.year,this.fromDate.month-1,this.fromDate.day);
      let toDate = new Date;
      toDate.setFullYear(this.toDate.year,this.toDate.month-1,this.toDate.day);
      this.startDateforRecord = fromDate;
      this.endDateforRecord = toDate;
      this.getDaysData();
      this.getDetailData();
      this.rangeRecord = true;
    } 
    else {
      this.toDate = null;
      this.fromDate = date;
    }
  }
  selectMonth(event){
    let year = event.target.value.split('-')[0];
    let month = event.target.value.split('-')[1];
    let nextMonth = +month+1;
    this.endDate = new Date(year+'-0'+nextMonth+'-01T00:00:00Z');
    this.endDate.setDate(this.endDate.getDate()-1)
    this.startDate = new Date(year+'-'+month+'-01T00:00:00Z')
    this.rangeGraph = true; 
    this.getGraphData();
  }
  selectWeek(event){
    let year = event.target.value.split('-')[0];
    let week = event.target.value.split('-')[1].split('W')[1];
    this.startDate = startDateWeek(year, week);
    this.endDate = startDateWeek(year, week);
    this.endDate.setDate(startDateWeek(year, week).getDate()+6);
    this.rangeGraph = true;
    this.getGraphData();
  }
  //ngb date selection line
  isHovered(date: NgbDate) {
    return this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) && date.before(this.hoveredDate);
  }
  isInside(date: NgbDate) {
    return this.toDate && date.after(this.fromDate) && date.before(this.toDate);
  }
  isRange(date: NgbDate) {
    return date.equals(this.fromDate) || (this.toDate && date.equals(this.toDate)) || this.isInside(date) || this.isHovered(date);
  }
}