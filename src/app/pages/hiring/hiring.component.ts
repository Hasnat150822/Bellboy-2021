import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit, ChangeDetectorRef, Renderer2, ElementRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { HiringService } from './hiring.service';
import { PagerService } from 'app/shared/services/pager.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';
import { confirmationDialog } from 'app/shared/services/global';
import { FormControl, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-hiring',
  templateUrl: './hiring.component.html',
  styleUrls: ['./hiring.component.scss']
})
export class HiringComponent implements OnInit, OnDestroy, AfterViewInit {
  subscription: Subscription;
  pager: any = {};
  keyword: string = '';
  status = { num: 2 };
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
  togg = false;
  togg2 = false;
  togg3 = false;
  togg4 = false;inputType:string='text';sortBy:string='-created_at';
  perPage:number = 10;
  @ViewChild('tabset', { static: true }) tabset;
  constructor(private hiringService: HiringService, private pagerService: PagerService,
    private modalService: NgbModal, private cdr: ChangeDetectorRef,
    private rendrer:Renderer2, private el:ElementRef, private router:Router, private activatedRoute:ActivatedRoute) {
  }
  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((res:any)=>{
      if(res.search || res.placeVal || res.status)
        {
          this.searchValue = res.search;
          this.placeVal = res.placeVal;
          this.status = res.status; 
        }
        if(res.tabstatus){
          this.tabStatus = res.tabstatus;
        }else{    
          this.subscription = this.hiringService.tabStatus.subscribe((res: any) => {
          this.tabStatus = res;
        })
        }
        this.switchTap();
    })
  }
  switchTap(){
    switch (this.tabStatus) {
      case 'tab1':
        this.getHirings(1, 1);
        break;
      case 'tab2':
        this.getHirings(2, 1);
        break;
      case 'tab3':
        this.getHirings(3, 1);
        break;
      case 'tab4':
        this.getHirings(4, 1);
        break;
      case 'tab5':
        this.getHirings(5, 1);
      default:
        break;
    }
  }
  ngAfterViewInit() {
    this.tabset.select(this.tabStatus);
    this.cdr.detectChanges();
  }
  getHirings(status, page) {
    this.pagedItems = [];
    this.permArr = [];
    this.totalItems = 0;
    this.spinner = true
    this.status = status;
    this.subscription = this.hiringService.getAllHirings(status, page, this.searchType, this.searchValue, this.sortBy, this.perPage)
      .subscribe((res: any) => {
        if (res.success == true) {
          this.permArr = res.data.hirings;
          this.spinner = false;
          this.totalItems = res.data.count;
          this.pager = this.pagerService.getPager(res.data.count, page, this.perPage);
        }
      }, error => {
        this.spinner = false
      })
  }
  open(content, reason) {
    this.cacelled_reason = reason
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title' })
  }
  ngOnDestroy() {
    this.hiringService.tabStatus.next(this.tabStatus);
    this.subscription.unsubscribe();
  }
  prev5(page) {
    if (page < 1) {
      this.getHirings(this.status, 1);
    } else {
      this.getHirings(this.status, page);
    }
  }
  next5(page) {
    if (page > this.pager.totalPages) {
      this.getHirings(this.status, this.pager.totalPages);
    } else {
      this.getHirings(this.status, page);
    }
  }
  sortByNumber() {
    this.togg = this.togg3 = this.togg4 = false;
    this.togg2 = !this.togg2;
    let el = this.el.nativeElement.querySelector("#sortByNumber");
    this.renderClass(el, this.togg2, 'totalActions')
    .then((sortBy:any)=>{
      this.sortBy = sortBy;
      this.getHirings(this.status, 1);
    })
  }
  sortByDate() {
    this.togg = this.togg2 = this.togg4 = false;
    this.togg3 = !this.togg3;
    let el = this.el.nativeElement.querySelector("#sortByDate");
    this.renderClass(el, this.togg3, 'created_at')
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
      confirmationDialog().then((result:any)=>{
          if(result.value){
            this.hiringService.cancelHiring(this.singleHiringId._id, reason).subscribe(() => {
            this.modalService.dismissAll();
            this.getHirings(this.status, 1);
          }, error => { this.modalService.dismissAll(); })
          }
      })
    }
  }
  onEnter(event){   
    let key = event.keyCode;
    if(key === 13){
      event.preventDefault();
      this.router.navigate(
        [], 
        {
          relativeTo: this.activatedRoute,
          queryParams: { search: this.searchValue, status:this.status, placeVal:this.placeVal},
          queryParamsHandling: 'merge'
        });
      this.getHirings(this.status, 1);
    }
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
  renderClass(el, value, sortby) {
    return new Promise((resolve)=>{
          // default remove classes from tags
    let byNumber = this.el.nativeElement.querySelector("#sortByNumber");
    let byName = this.el.nativeElement.querySelector("#sortByCustName");
    let byDate = this.el.nativeElement.querySelector("#sortByDate");
    let bybbName = this.el.nativeElement.querySelector("#sortByBBName");
    this.rendrer.removeClass(byNumber, "ft-chevron-down");
    this.rendrer.removeClass(byNumber, "ft-chevron-up");
    this.rendrer.removeClass(byName, "ft-chevron-down");
    this.rendrer.removeClass(byName, "ft-chevron-up");
    this.rendrer.removeClass(byDate, "ft-chevron-down");
    this.rendrer.removeClass(byDate, "ft-chevron-up");
    this.rendrer.removeClass(bybbName, "ft-chevron-down");
    this.rendrer.removeClass(bybbName, "ft-chevron-up");
    // add classes conditionally
    if (value && sortby) {
      sortby = sortby;
      this.rendrer.addClass(el, "ft-chevron-up");
      this.rendrer.removeClass(el, "ft-chevron-down");
      resolve(sortby)
    } else if(!value && sortby) {
      sortby = '-'+sortby;
      this.rendrer.addClass(el, "ft-chevron-down");
      this.rendrer.removeClass(el, "ft-chevron-up");
      resolve(sortby)
    }
    })
  }
}