import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit, ChangeDetectorRef, Renderer2, ElementRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { HiringService } from './hiring.service';
import { PagerService } from 'app/shared/services/pager.service';
import { NgbCalendar, NgbDate, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, ResolveEnd, Router, RoutesRecognized } from '@angular/router';
import { checkPage, confirmationDialog } from 'app/shared/services/global';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { filter } from 'rxjs/operators';

var hr = 0;
var min = 0;
var sec = 0;
var el; var rendrer;
declare const $:any;
@Component({
  selector: 'app-hiring',
  templateUrl: './hiring.component.html',
  styleUrls: ['./hiring.component.scss']
})
export class HiringComponent implements OnInit, AfterViewInit {
  subscription: Subscription;
  pager: any = {};
  keyword: string = '';
  status = 1;
  cacelled_reason: string;
  spinner: boolean;
  searchDropdown = [
    {
      fieldName:"Id",
      type:'text',
      searchType:'searchById'
    },
    {
      fieldName:"Customer Name", 
      type:'text',
      searchType:'searchByName'
    },
    {
      fieldName:"Cell No", 
      type:'number',
      searchType:'searchByPhone'
    },
    {
      fieldName:"Bellboy Name", 
      type:'text',
      searchType:'searchByBellBoyName'
    },
    {
      fieldName:"Bellboy Type", 
      type:'text',
      searchType:'searchByBellBoyType'
    },
    {
      fieldName:"Actions",
      type:'number',
      searchType:'searchByActions'
    }
  ]
  tabStatus; permArr: any = []; pagedItems: any;
  totalItems: number;
  placeVal: string = "Id";
  singleHiringId: any; 
  searchType:string;
  searchValue:string;
  math = Math;
  togg = true;
  togg2 = true;
  togg3 = true;
  togg4 = true;inputType:string='text';sortBy:string='-created_at';
  perPage:number = 10;today;markDisabled;
  startDate; endDate;
  @ViewChild('tabset', { static: true }) tabset;
  constructor(private hiringService: HiringService, private pagerService: PagerService,
    private modalService: NgbModal, private cdr: ChangeDetectorRef,private calendar:NgbCalendar,
    private rendrer:Renderer2, private el:ElementRef, private router:Router, private activatedRoute:ActivatedRoute) {
  }
  ngOnInit() {
    this.router.events.subscribe((data) => {
      if (data instanceof RoutesRecognized) {
        console.log(data.state.root.firstChild.data, 'data of hiring route  ');
      }
    });
    this.today = this.calendar.getToday(); //date in object formate
    this.markDisabled = (date: NgbDate, current: { month: number }) =>
    (date.day>this.today.day && date.month === this.today.month);
    this.activatedRoute.queryParams.subscribe((res:any)=>{
      if(res.search || res.placeVal || res.status || res.searchType)
        {
          this.searchValue = res.search;
          this.placeVal = res.placeVal;
          this.status = res.status; 
          this.searchType = res.searchType;
        }
        if(res.tabstatus){
          this.tabStatus = res.tabstatus;
        }else{    
          this.tabStatus = 'tab2';
        }
        this.switchTap();
    })
  }
  defaultData(){
    this.router.navigate([]);
    this.startDate=undefined;
    this.endDate=undefined;
    this.searchValue='';
    this.sortBy = '-created_at';
    this.tabset.select('tab2');
    this.getHirings(2, 1);
  }
  interval
  switchTap(){
    switch (this.tabStatus) {
      case 'tab2':
        clearInterval(this.interval)
        this.getHirings(2, 1);
        break;
      case 'tab3':
        clearInterval(this.interval)
        this.getHirings(3, 1);
        break;
      case 'tab4':
        clearInterval(this.interval)
        this.getHirings(4, 1);
        break;
      case 'tab5':
        clearInterval(this.interval)
        this.getHirings(5, 1);
        break;
      case 'tab6':
        clearInterval(this.interval)
        this.getHirings(6, 1);
        break;
      default:
        break;
    }
  }
  ngAfterViewInit() {
    this.tabset.select(this.tabStatus);
    this.cdr.detectChanges();
  }
  errorMessage;
  getHirings(status, page) {
    page = checkPage(page, this.pager.totalPages);
    this.pagedItems = [];
    this.permArr = [];
    this.totalItems = 0;
    this.spinner = true
    this.status = status;
    this.subscription = this.hiringService.getAllHirings(status, page, this.searchType, this.searchValue, this.sortBy, this.perPage, this.startDate, this.endDate)
      .subscribe((res: any) => {
        if (res.success == true) {
          this.permArr = res.data.hirings;
          if(this.permArr.length == 0)
            this.errorMessage = "No Data Found";
          else
            this.errorMessage = undefined;
          this.spinner = false;
          this.totalItems = res.data.count; 
          this.pager = this.pagerService.getPager(res.data.count, page, this.perPage);
        }
      }, error => {
        this.spinner = false
      }, ()=>{
        this.subscription.unsubscribe();
      })
  }
  open(content, reason) {
    this.cacelled_reason = reason
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title', backdrop:'static', keyboard:false})
  }
  sortByNumber() {
    this.togg = this.togg3 = this.togg4 = false;
    this.togg2 = !this.togg2;
    this.renderClass('sortByNumber', this.togg2, 'totalActions')
    .then((sortBy:any)=>{
      this.sortBy = sortBy;
      this.getHirings(this.status, 1);
    })
  }
  sortByDate() {
    this.togg = this.togg2 = this.togg4 = false;
    this.togg3 = !this.togg3;
    this.renderClass('sortByDate', this.togg3, 'created_at')
    .then((sortBy:any)=>{
      this.sortBy = sortBy;
      this.getHirings(this.status, 1);
    })
  }
  cancelReason = new FormGroup({
    cuase:new FormControl('', Validators.required)
  })
  cancelHiring() {
    let reason = this.cancelReason.controls.cuase.value;
    if (reason) {
      confirmationDialog('').then((result:any)=>{
          if(result.value){
            this.hiringService.cancelHiring(this.singleHiringId._id, reason).subscribe(() => {
            this.modalService.dismissAll();
            this.getHirings(this.status, 1);
          }, error => { this.modalService.dismissAll(); })
          }
      })
    }
  }
  searchHiring(){   
    this.router.navigate(
      [], 
      {
        relativeTo: this.activatedRoute,
        queryParams: { search: this.searchValue, status:this.status, placeVal:this.placeVal, searchType:this.searchType},
        queryParamsHandling: 'merge'
      });
      this.getHirings(this.status, 1);
  }
  changeTabStatus(){
    this.router.navigate(
      [], 
      {
        relativeTo: this.activatedRoute,
        queryParams: { tabstatus:this.tabStatus },
        queryParamsHandling: 'merge'
      });
  }
  renderClass(el, value, sortby){
    let chev_up;
    let chev_down
    if(el==''){
      chev_up = this.el.nativeElement.querySelector('span.ft-chevron-up');
      chev_down = this.el.nativeElement.querySelector('span.ft-chevron-down');
      this.rendrer.removeClass(chev_down, "text-orange");
      this.rendrer.removeClass(chev_up, "text-orange");
    }else{
      chev_up = this.el.nativeElement.querySelector('#'+el+' span.ft-chevron-up');
      chev_down = this.el.nativeElement.querySelector('#'+el+' span.ft-chevron-down');
    }
    return new Promise((resolve)=>{
      if (value && sortby) {
        sortby = sortby;
        this.rendrer.removeClass(chev_down, "text-orange");
        this.rendrer.addClass(chev_up, "text-orange");
        resolve(sortby)
      } else if(!value && sortby) {
        sortby = '-'+sortby;
        this.rendrer.addClass(chev_down, "text-orange");
        this.rendrer.removeClass(chev_up, "text-orange");
        resolve(sortby)
      }
    })
  }
  showDatePick(id){
    this.fromDate = null;
    this.toDate = null;
    this.datePickerId = id;
    $("#"+id).toggleClass('d-none');
  }
  datePickerId
  hoveredDate: NgbDate | null = null;
  fromDate: any;
  toDate: any | null = null;
  onDateSelection(date: any) {
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
    }else if(this.fromDate == date){
      let fromDate = new Date;
      $("#"+this.datePickerId).toggleClass('d-none');
      fromDate.setFullYear(this.fromDate.year,this.fromDate.month-1,this.fromDate.day);
      this.startDate = fromDate.toISOString();
      this.getHirings(this.status, 1);
    } else if (this.fromDate && !this.toDate && date.after(this.fromDate)) {
      $("#"+this.datePickerId).toggleClass('d-none');
      this.toDate = date;
      let fromDate = new Date;
      fromDate.setFullYear(this.fromDate.year,this.fromDate.month-1,this.fromDate.day);
      this.startDate = fromDate.toISOString();
      let toDate = new Date;
      toDate.setFullYear(this.toDate.year,this.toDate.month-1,this.toDate.day);
      this.endDate = toDate.toISOString();
      this.getHirings(this.status, 1);
    } 
    else {
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
  pendingCounter;
  showStopWatch(time){ 
    let start_time = new Date(time);
    let currentDate = new Date();
    let result = this.showDiff(start_time, currentDate);
    hr = result[0];
    min = result[1];
    sec = result[2];
    setInterval(()=>{
      this.timerCycle().then((result)=>{
        this.pendingCounter = result;
      })
    }, 1000)
  }
  showDiff(date1, date2){
    var diff = (date2 - date1)/1000;
    diff = Math.abs(Math.floor(diff));
    var days = Math.floor(diff/(24*60*60));
    var leftSec = diff - days * 24*60*60;

    var hrs = Math.floor(leftSec/(60*60));
    var leftSec = leftSec - hrs * 60*60;

    var mins = Math.floor(leftSec/(60));
    var leftSec = leftSec - mins * 60;
    return [hrs, mins, leftSec];
}
  timerCycle() {
    return new Promise((resolve, reject)=>{
      sec = sec + 1;
      if (sec == 60) {
        min = min + 1;
        sec = 0;
      }
      if (min == 60) {
        hr = hr + 1;
        min = 0;
        sec = 0;
      }
      let timer;
      if(hr !== 0){
        timer = `${hr} hrs ${min} mins ${sec} sec`;
      }else{
        timer = `${min} mins ${sec} sec`;
      }
      resolve(timer);
    })
}
}