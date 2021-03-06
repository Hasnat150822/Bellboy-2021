import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core'
import { BellboyService } from './bellboy.service';
import { PagerService } from 'app/shared/services/pager.service';
import { amazonUrl, checkPage, confirmationDialog, sweetAlert } from 'app/shared/services/global';
import { Store } from '@ngrx/store';
import { AngularFireDatabase } from '@angular/fire/database';
import * as allActions from '../../ngrx-states/actions';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
<<<<<<< HEAD
import { NgbCalendar, NgbDate, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CustomersService } from '../customers/customers.service';
import Swal from 'sweetalert2';
declare const $:any;
=======
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CustomersService } from '../customers/customers.service';
import Swal from 'sweetalert2';
>>>>>>> webfix/bellboy-copy
@Component({
  selector: 'app-bellboy',
  templateUrl: './bellboy.component.html',
  styleUrls: ['./bellboy.component.scss']
})
export class BellboyComponent implements OnInit, AfterViewInit{
<<<<<<< HEAD
  pager:any
  spinner:boolean
  inputType:number;  
  today; 
  markDisabled;
  searchValue;
  searchType:string = "name";
=======
  pager:any = {}
  spinner:boolean
  inputType:number;
  searchValue;
  searchType:string = "search";
>>>>>>> webfix/bellboy-copy
  amazonImgUrl:string = amazonUrl;
  placeVal:string = "Name";
  status:number;
  itemPerPage:number;
  totalItems:number;
<<<<<<< HEAD
  hoveredDate: NgbDate | null = null;
  fromDate: any;
  toDate: any;
=======
>>>>>>> webfix/bellboy-copy
  searchDropdown = [
    {
      fieldName:"Name",
      type:'text',
<<<<<<< HEAD
      searchType:'name'
=======
      searchType:'search'
>>>>>>> webfix/bellboy-copy
    },
    {
      fieldName:"Cell No",
      type:'number',
      searchType:'mobile'
    }
  ]
  isBigImg:boolean;
  bellboys:Array<any>;
  tabstatus:string;
  notificationForm:FormGroup;
  @ViewChild('tabset', {static:true}) tabset;
  constructor(private bellboyService:BellboyService, private fb:FormBuilder, private db: AngularFireDatabase,
    private pagerService:PagerService, private store:Store<any>, private router:Router, private activatedRoute:ActivatedRoute, 
<<<<<<< HEAD
    private modalService:NgbModal, private rendrer:Renderer2, private el:ElementRef, private custservice:CustomersService,
    private calendar:NgbCalendar){
=======
    private modalService:NgbModal, private rendrer:Renderer2, private el:ElementRef, private custservice:CustomersService){
>>>>>>> webfix/bellboy-copy
      this.notificationForm = this.fb.group({
        title:['', {validators:[Validators.required]}],
        description:['',{validators:[Validators.required, Validators.maxLength(250)]}]
      })
  }     
  checkedValues:any = [];
<<<<<<< HEAD
  currentRole:string;
  selectSenderArea:any = ' ';
  subscription:Subscription;
  ngOnInit(){
    this.today = this.calendar.getToday(); //date in object formate
    this.markDisabled = (date: NgbDate, current: { month: number }) =>
    (date.day>this.today.day && date.month === this.today.month);
=======
  currentRole:string = 'Super Admin';
  selectSenderArea:any = ' ';
  subscription:Subscription;
  ngOnInit(){
>>>>>>> webfix/bellboy-copy
    // this.store.subscribe((res:any)=>{
    //   if(res.UserData.data!==undefined){
    //     this.currentRole = res.UserData.data.role.title;
    //   }
    // }, err=>{}, ()=>{this.subscription.unsubscribe()});
    // 0 => pending, 1=> approved / active, 2=> reject , 3=> blocked, 4=>all
    this.getQueryParams();
  }
  bigImage(url){
    this.isBigImg = true;
    this.store.dispatch(new allActions.SendUrl(url));
  }
  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title', backdrop:'static', keyboard:false})
  }
  currentPageIds:Array<any>;
  getBellboys(page=1, itemPerPage=10, status=1){
<<<<<<< HEAD
    this.modalService.dismissAll();   
    this.bellboys = [];
    this.pager = {};
    this.totalItems = 0;
=======
    this.bellboys = [];
>>>>>>> webfix/bellboy-copy
    this.spinner = true;
    this.status = status; 
    this.itemPerPage = itemPerPage;
    page = checkPage(page, this.pager.totalPages);
<<<<<<< HEAD
    this.bellboyService.getAllBellboy(page, itemPerPage, status,this.searchType, this.searchValue, this.fromDate, this.toDate, undefined)
    .subscribe((res:any)=>{
      this.spinner = false
      this.totalItems = +res.count;
      this.bellboys = res.bellBoys;
      this.fromDate = undefined;
      this.toDate = undefined;
=======
    this.bellboyService.getAllBellboy(page, itemPerPage, status,this.searchType, this.searchValue)
    .subscribe((res:any)=>{
      this.totalItems = +res.count;
      this.spinner = false
      this.bellboys = res.bellBoys;
>>>>>>> webfix/bellboy-copy
      this.currentPageIds = this.bellboys.map((res:any)=>{
        return res._id;
      })
      this.pager = this.pagerService.getPager(this.totalItems, page, itemPerPage);
    }, err=>this.spinner = false)
  }
  
  allSelect(event){
    if(event.target.value=='on'){
      this.selectSenderArea = ' ';
    }else{
      this.selectSenderArea = event.target.value;
    }
    if(event.target.checked == false){
      this.checkedValues = [];
      this.changeAllChecked(event.target.checked);
    }
    else if(event.target.checked == true){
      this.checkedValues = this.currentPageIds;
      this.changeAllChecked(event.target.checked);
    }
    if(event.target.value=='sendtoPakistaniUsers' && event.target.checked==undefined){
      this.changeAllChecked(false);
      this.checkedValues = [];
    }
  }
  changeAllChecked(value){
    this.bellboys = this.bellboys.map((el) =>{
      var o = Object.assign({}, el);
      o.checked = value;
      return o;
    });
  }
<<<<<<< HEAD
  // range selection start
  onDateSelection(date: NgbDate) {
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
    } else if (this.fromDate && !this.toDate && date && date.after(this.fromDate)) {
      this.toDate = date;
      $("#"+this.datePickerId).toggleClass('d-none');
      this.fromDate = this.fromDate.year+'-'+this.fromDate.month+
      '-'+this.fromDate.day;
      this.toDate = this.toDate.year+'-'+this.toDate.month+
      '-'+this.toDate.day;
      this.getBellboys(1, this.itemPerPage, this.status);
    } else {
      this.toDate = null;
      this.fromDate = date;
    }
  }
  isHovered(date: NgbDate) {
    return this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) && date.before(this.hoveredDate);
  }

  isInside(date: NgbDate) {
    return this.toDate && date.after(this.fromDate) && date.before(this.toDate);
  }

  isRange(date: NgbDate) {
    return date.equals(this.fromDate) || (this.toDate && date.equals(this.toDate)) || this.isInside(date) || this.isHovered(date);
  }

  // ra ge selection over
=======
  
>>>>>>> webfix/bellboy-copy
  submitNotification(values){
    values['userId'] = this.checkedValues;
    if(this.selectSenderArea=='' && this.checkedValues.length>1){
      this.confirmationDialog(this.checkedValues.length+' customers').then((result:any)=>{
        if(result.value){
          this.custservice.sendNotification('bellboy', values, 'multipledevice')
          .subscribe(()=>{
            this.resetToDefault();
          }, error=>{
            this.resetToDefault();
          });
        }
      })
    }else if(this.checkedValues.length==1){
      this.confirmationDialog(' Single Customer').then((result:any)=>{
        if(result.value){
          this.custservice.sendNotification('bellboy', values, 'singledevice')
          .subscribe(()=>{
            this.resetToDefault();
          }, error=>{
            this.resetToDefault();
          });
        }
      });
    }else{
      this.confirmationDialog(' Pakistani customers').then((result:any)=>{
        if(result.value){
          this.custservice.sendNotification('bellboy', values, 'sendtoPakistaniUsers')
          .subscribe(()=>{
            this.resetToDefault();
          }, error=>{
            this.resetToDefault();
          });
        }
      })
    }
  }
  async confirmationDialog(value){
    const result = await Swal.fire({
        icon:"question",
        title:"Are You Sure?",
        text:"You are sending notification to "+value,
        width:'300px',
        showConfirmButton:true,
        showCancelButton:true
      });
    return result;
  }
  resetToDefault(){
    this.notificationForm.reset();
    this.checkedValues = [];
<<<<<<< HEAD
    this.router.navigate([]);
    this.changeAllChecked(false);
    this.modalService.dismissAll();
=======
    this.changeAllChecked(false);
    this.modalService.dismissAll();
    this.setQueryParams(this.searchValue, this.totalItems, this.status, this.searchType);
>>>>>>> webfix/bellboy-copy
  }
  onEnter(event){
    let key = event.keyCode;
    if(key === 13){
      event.preventDefault();
    }
  }
  setQueryParams(searchValue, itemPerPage, status, searchType){
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
<<<<<<< HEAD
      queryParams:{ q:searchValue, perPage:itemPerPage, status:status, searchType },
=======
      queryParams:{ q:searchValue, perPage:itemPerPage, status:status, searchType:searchType },
>>>>>>> webfix/bellboy-copy
      queryParamsHandling:'merge'
    })
  }
  getQueryParams(){
    this.activatedRoute.queryParams.subscribe((res:any)=>{
      if(res.status){
        this.searchValue = res.q;
        this.searchType = res.searchType;
        this.status = res.status;
        this.itemPerPage = res.perPage;
        this.getBellboys(1, res.perPage, res.status);
        switch (res.status) {
          case '1':
            this.tabstatus = 'tab1';
            break;
          case '0':
            this.tabstatus = 'tab2';
            break;
          case '2':
            this.tabstatus = 'tab3';
            break;
          case '3':
            this.tabstatus = 'tab4';
            break;
          case '4':
            this.tabstatus = 'tab5';
            break;
          default:
            break;
        }
      }else{
        this.getBellboys();
      }
    })
  }
  ngAfterViewInit(){
    this.tabset.select(this.tabstatus);
    // this.cdr.detectChanges();
  }
  responseApproval(item, status){
    if(item.legals.nic.approval==0){
      sweetAlert('warning', 'NIC not Approved');
      return false;
    }else{
      confirmationDialog('').then((result)=>{
        if(result.value == true){
          this.bellboyService.manageStatusbellboy(item._id, status).subscribe((res:any)=>{
            if(status==3){
              this.db.list('/bellboys/'+res.data._id).remove();
            }else if(status == 1){
              this.db.database.ref('/bellboys/').child(res.data._id).set({
                geolocation:{
                  latitude:'31.377812808457396',
                  longitude:'74.18572878868932'
                },
                profile:{
                  id:res.data._id,
                  avatar:res.data.avatar.value,
                  name:res.data.name,
                  mobile:res.data.mobile
                },
                initialLocation:{
                  latitude:'31.377812808457396',
                  longitude:'74.18572878868932'
                }
              })
            }
            this.getBellboys(1, this.itemPerPage, this.status);
          })
        }else{
          return false
        }
      })
    }
  }
  selectBellboy(event){
    let el = this.el.nativeElement.querySelector('#allSelect');
    this.rendrer.setProperty(el, 'checked', false);
    if(event.target.checked == false){
      let index = this.checkedValues.indexOf(event.target.value);
      this.checkedValues.splice(index, 1);
    }else{
      let el = this.el.nativeElement.querySelector('#choice');
      this.rendrer.setProperty(el, 'innerHTML', 
      '<option value="">Select Value</option><option value="sendtoPakistaniUsers">Pakistanies</option>');
      this.checkedValues.push(event.target.value);
      this.checkedValues.length==10?this.rendrer.setProperty(el, 'checked', true):this.rendrer.setProperty(el, 'checked', false);
    }
  }
<<<<<<< HEAD
  datePickerId
  showDatePick(id){
    this.datePickerId = id;
    $("#"+id).toggleClass('d-none');
  }
=======
>>>>>>> webfix/bellboy-copy
  }