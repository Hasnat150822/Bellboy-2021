import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { NgbCalendar, NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { PagerService } from 'app/shared/services/pager.service';
import { ChartDataSets } from 'chart.js';
import { Color } from 'ng2-charts';
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
  public lineChartData: ChartDataSets[] = [{data: []  }];
  @ViewChild('chart', {static:true}) canvas:ElementRef;
  // chart configuration start
  public lineChartLabels:any = [];
  public lineChartOptions: any = {
    responsive: true,
    scales: {
      xAxes: [{
        gridLines: {
          color: 'rgba(0,0,0,0.3)',
          lineWidth: 0.5
        }
      }],
      yAxes: [{
        gridLines: {
          color: 'rgba(171,171,171,1)',
          lineWidth: 0
        }
      }]
    }
 };
  public lineChartColors: Color[]
  public lineChartLegend = false;
  public lineChartType = 'line';
  public lineChartPlugins = [];
  // chart configuration end
  firstDay:any; lastDay:any; 
  spinner:boolean;
  hiringDetail;customerDetail;bellboyDetail;pagedItems:any;
  pagedItemsCustomer:any;
  pagedItemsBellboy:any;
  today;markDisabled;datePickerId:string;
  workingRecord;
  workingGraph;
  gradient
  dashboardData:dashboard;
  pager:any = {}; pager2:any = {}; pager3:any = {};
  constructor(private service:DashboardService, private pagerService:PagerService,
    private calendar: NgbCalendar, private rendrer2:Renderer2, private el:ElementRef) { }
  ngOnInit() {
    this.getDefault();
    this.today = this.calendar.getToday(); //date in object formate
    this.markDisabled = (date: NgbDate, current: { month: number }) =>
  (date.day>this.today.day && date.month === this.today.month);
  // color schema and background color for charts
    this.gradient = this.canvas.nativeElement.getContext('2d').createLinearGradient(0,0,0,240);
    this.gradient.addColorStop(0, 'rgba(250, 144,8,0.5)');
    this.gradient.addColorStop(1, 'rgba(255, 255, 255, 0.5)');
    this.lineChartColors = [
      {
        backgroundColor: this.gradient,
        borderColor: '#fc4a1a',
        pointBackgroundColor: '#c42a03',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(225,10,24,0.2)'
      },
    ];
  }
  // for reset
  getDefault(){
    var curr = new Date;
    this.firstDay = new Date(curr.setDate(curr.getDate() - curr.getDay())); //first day
    this.lastDay = new Date(curr.setDate(curr.getDate() - curr.getDay()+6)); // last weekend day
    // this.firstDay.setHours(0,0,0,0);
    this.getDashboard(this.firstDay, this.lastDay, null, null);
    // api's parameters values
    this.workingRecord = false;
    this.workingGraph = false;
    this.startDateGraph = null;
    this.endDateGraph = null;
    this.startDateRecord = null;
    this.endDateRecord = null;
  }
  // graph data
  getHirings(){
    this.lineChartData = [{data: []  }];
    for (let i = 0; i < this.lineChartLabels.length; i++) {
      let d = new Date(this.lineChartLabels[i]);
      let date = d.getDate();
      let month = d.getMonth()+1;
      let year = d.getFullYear();
      let count;
      for (let i = 0; i < this.dashboardData.graph.hiringData.length; i++) {
        if(date == this.dashboardData.graph.hiringData[i].date.day && 
          month == this.dashboardData.graph.hiringData[i].date.month &&
          year == this.dashboardData.graph.hiringData[i].date.year){
          count = this.dashboardData.graph.hiringData[i].count;
        }
      }
      if(count!==undefined){
        this.lineChartData[0].data.push(count);
      }else{
        this.lineChartData[0].data.push(0);
      }
    }
  }
  getCustomers(){
    this.lineChartData = [{data: []  }];
    for (let i = 0; i < this.lineChartLabels.length; i++) {
      let d = new Date(this.lineChartLabels[i]);
      let date = d.getDate();
      let month = d.getMonth()+1;
      let year = d.getFullYear();
      let count;
      for (let i = 0; i < this.dashboardData.graph.customerData.length; i++) {
        if(date == this.dashboardData.graph.customerData[i].date.day &&
          month == this.dashboardData.graph.customerData[i].date.month &&
          year == this.dashboardData.graph.customerData[i].date.year){
          count = this.dashboardData.graph.customerData[i].count;
        }
      }
      if(count!==undefined){
        this.lineChartData[0].data.push(count);
      }else{
        this.lineChartData[0].data.push(0);
      }
    }
  }
  getBellboys(){
    this.lineChartData = [{data: []  }];
    for (let i = 0; i < this.lineChartLabels.length; i++) {
      let d = new Date(this.lineChartLabels[i]);
      let date = d.getDate();
      let month = d.getMonth()+1;
      let year = d.getFullYear();
      let count;
      for (let i = 0; i < this.dashboardData.graph.bellboyData.length; i++) {
        if(date == this.dashboardData.graph.bellboyData[i].date.day &&
          month == this.dashboardData.graph.bellboyData[i].date.month &&
          year == this.dashboardData.graph.bellboyData[i].date.year){
          count = this.dashboardData.graph.bellboyData[i].count;
        }
      }
      if(count!==undefined){
        this.lineChartData[0].data.push(count);
      }else{
        this.lineChartData[0].data.push(0);
      }
    }
  }
  // record with date
  getDashboard(startDateGraph,endDateGraph,startDate, endDate){
      this.spinner = true;
      if(startDate && endDate){
        startDate = startDate.toISOString();
        endDate = endDate.toISOString();
      }
      if(!startDateGraph && !endDateGraph){
        startDateGraph = this.firstDay;
        endDateGraph = this.lastDay;
      }
      this.service.getDashboardRecord(startDateGraph.toISOString(), endDateGraph.toISOString(), startDate, endDate)
      .subscribe((res:any)=>{
        this.lineChartLabels = [];
      for (var d = new Date(startDateGraph); d <= new Date(endDateGraph); d.setDate(d.getDate() + 1)) {
        this.lineChartLabels.push(d.toDateString());
      }
      this.dashboardData = res;
      this.spinner = false;
      this.fromDate = null;
      this.toDate = null;
      this.getHirings();
      this.getHiringDetail();
      this.getCustomerDetail();
      this.getBellboyDetail();
    }, error=>{this.spinner = false;});
  }
  // record data
  getHiringDetail(){
    this.hiringDetail = this.dashboardData.totalWithDetail.currentDayHirings;
    this.setPage(1);
  }
  getCustomerDetail(){
    this.customerDetail = this.dashboardData.totalWithDetail.currentDayCustomers;
    this.setPageCustomer(1);
  }
  getBellboyDetail(){
    this.bellboyDetail = this.dashboardData.totalWithDetail.currentDayBellBoys;
    this.setPageBellboy(1);
  }
  // pagination
  setPage(page){
    this.pager = this.pagerService.getPager(this.hiringDetail.length, page, 4);
    this.pagedItems = this.hiringDetail.slice(this.pager.startIndex, this.pager.endIndex+1);
  }
  setPageCustomer(page){
    this.pager2 = this.pagerService.getPager(this.customerDetail.length, page, 4);
    this.pagedItemsCustomer = this.customerDetail.slice(this.pager2.startIndex, this.pager2.endIndex+1);
  }
  setPageBellboy(page){
    this.pager3 = this.pagerService.getPager(this.bellboyDetail.length, page, 4);
    this.pagedItemsBellboy = this.bellboyDetail.slice(this.pager3.startIndex, this.pager3.endIndex+1);
  }
  showDatePick(id){
    this.datePickerId = id;
    $("#"+id).toggleClass('d-none');
  }
  // date range
  hoveredDate: NgbDate | null = null;
  fromDate: any;
  toDate: any | null = null;
  startDateRecord:any;
  endDateRecord:any;
  startDateGraph:any;
  endDateGraph:any;
  onDateSelection(date: any) {
    let el = this.el.nativeElement.querySelector('#li1');
    let el2 = this.el.nativeElement.querySelector('#li2');
    let el3 = this.el.nativeElement.querySelector('#li3');
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
    } else if (this.fromDate && !this.toDate && date.after(this.fromDate)) {
      this.rendrer2.addClass(el, 'active');
      this.rendrer2.removeClass(el2, 'active');
      this.rendrer2.removeClass(el3, 'active');
      this.toDate = date;
      $("#"+this.datePickerId).toggleClass('d-none');
      let fromDate = new Date;
      fromDate.setFullYear(this.fromDate.year,this.fromDate.month-1,this.fromDate.day);
      let toDate = new Date;
      toDate.setFullYear(this.toDate.year,this.toDate.month-1,this.toDate.day);
      if(this.datePickerId == 'datepicker1'){
        this.getDashboard(this.startDateGraph, this.endDateGraph,fromDate, toDate);
        this.startDateRecord = fromDate; this.endDateRecord = toDate;
        this.workingRecord = true;
        this.workingGraph = false;
      }else{
        this.getDashboard(fromDate, toDate,this.startDateRecord, this.endDateRecord);
        this.startDateGraph = fromDate; this.endDateGraph = toDate;
        this.workingGraph = true;
        this.workingRecord = false;
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
  active(id){
    $('ul li').removeClass('active')
    $('#'+id).addClass('active');
  }
}