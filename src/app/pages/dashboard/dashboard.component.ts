import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { NgbCalendar, NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { PagerService } from 'app/shared/services/pager.service';
import { ChartDataSets } from 'chart.js';
import { Color } from 'ng2-charts';
import { chartColors, chartOptions } from './chart.setting';
import { dashboard } from './dashboard.model';
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
  areaChartColors = chartColors;
  areaChartLegend = true;
  areaChartType = 'line';
  areaChartOptions = chartOptions;
  startDate:any; endDate:any;
  areaChartLabels;
  loader:boolean = false;
  areaChartData;
  daysRecord;
  hiringDetail;
  customerDetail;
  bellboyDetail;
  pager:any = {};
  pager2:any = {};
  pager3:any = {}; 
  hiringItems;
  customerItems;
  bellboyItems;
  datePickerId;
  startDateforRecord; endDateforRecord;
  rangeRecord:boolean;
  rangeGraph:boolean;
  constructor(private calendar:NgbCalendar, private service:DashboardService, private pagerService:PagerService){}
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
    this.startDate = new Date(curr.setDate(curr.getDate() - curr.getDay())); //first day
    this.endDate = new Date(curr.setDate(curr.getDate() - curr.getDay()+6)); // last weekend day
    this.rangeRecord = false;
    this.rangeGraph = false;
    this.getDaysData();
    this.getGraphData();
    this.getDetailData();
  }
  assignChartLabels(startDateGraph, endDateGraph){
    this.areaChartLabels = [];
    for (var d = new Date(startDateGraph); d <= new Date(endDateGraph); d.setDate(d.getDate() + 1)) {
      this.areaChartLabels.push(d.toDateString());
    }
  }
  getGraphData(){
    this.areaChartData = [
      {data: [], label:'' },
      {data: [], label:'' },
      {data: [], label:'' }
    ];
    this.assignChartLabels(this.startDate, this.endDate);
    let startDate = this.startDate.toISOString();
    let endDate = this.endDate.toISOString();
    this.service.getGraphRecord(startDate, endDate)
    .subscribe((res:any)=>{
      this.fromDate = null;
      this.toDate = null;
      this.areaChartData[0]['label'] = 'Hirings';
      this.areaChartData[1]['label'] = 'Customers';
      this.areaChartData[2]['label'] = 'Bellboys';
      this.areaChartLabels.map((value)=>{
        let d = new Date(value);
        let date = d.getDate();
        let month = d.getMonth()+1;
        let year = d.getFullYear();
        let hiringCount = this.returnCount(res.hiringData, date, month, year);
        let customerCount = this.returnCount(res.customerData, date, month, year);
        let bellboyCount = this.returnCount(res.bellboyData, date, month, year);
        if(hiringCount!== undefined){
          this.areaChartData[0].data.push(hiringCount);
        }else{
          this.areaChartData[0].data.push(0);
        }
        if(customerCount!== undefined){
          this.areaChartData[1].data.push(customerCount);
        }else{
          this.areaChartData[1].data.push(0);
        }
        if(bellboyCount!== undefined){
          this.areaChartData[2].data.push(bellboyCount);
        }else{
          this.areaChartData[2].data.push(0);
        }
      })
    })
  }
  returnCount(response, date, month, year){
    let count;
    response.map((e)=>{
      if(date == e.date.day &&
        month == e.date.month &&
        year == e.date.year){
          count = e.count;
      }
    })
    return count;
  }
  getDaysData(){
    this.loader = true;
    this.service.getDaysRecord(this.startDateforRecord, this.endDateforRecord)
    .subscribe((res:any)=>{
      this.fromDate = null;
      this.toDate = null;
      this.loader = false;
      this.daysRecord = res;
    })
  }
  getDetailData(){
    this.service.getDetailRecord(this.startDateforRecord, this.endDateforRecord)
    .subscribe((res:any)=>{
      this.fromDate = null;
      this.toDate = null;
      this.hiringDetail = res.currentDayHirings;
      this.customerDetail = res.currentDayCustomers;
      this.bellboyDetail = res.currentDayBellBoys;
      this.setPage(1);
      this.setPageCustomer(1);
      this.setPageBellboy(1);
    })
  }
  // pagination
  setPage(page){
    this.pager = this.pagerService.getPager(this.hiringDetail.length, page, 4);
    this.hiringItems = this.hiringDetail.slice(this.pager.startIndex, this.pager.endIndex+1);
  }
  setPageCustomer(page){
    this.pager2 = this.pagerService.getPager(this.customerDetail.length, page, 4);
    this.customerItems = this.customerDetail.slice(this.pager2.startIndex, this.pager2.endIndex+1);
  }
  setPageBellboy(page){
    this.pager3 = this.pagerService.getPager(this.bellboyDetail.length, page, 4);
    this.bellboyItems = this.bellboyDetail.slice(this.pager3.startIndex, this.pager3.endIndex+1);
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
      if(this.datePickerId == 'datepicker1'){
        this.startDateforRecord = fromDate;
        this.endDateforRecord = toDate;
        this.getDaysData();
        this.getDetailData();
        this.rangeRecord = true;
      }else{
        this.startDate = fromDate; 
        this.endDate = toDate; 
        this.rangeGraph = true;
        this.getGraphData();
      }
    } else {
      this.toDate = null;
      this.fromDate = date;
    }
  }
  //ngb date selection area
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