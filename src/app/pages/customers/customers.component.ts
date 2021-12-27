import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CustomersService } from './customers.service';
import { PagerService } from 'app/shared/services/pager.service';
import Swal from 'sweetalert2';
import { flyInOutAnimation } from '../pages-animations';
import { FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { USER_NAME } from 'app/ngrx-states/model/url.model';
import { Subscription } from 'rxjs';
import { checkPage } from 'app/shared/services/global';
import * as countries from '../../../assets/country-codes.json';
import { ActivatedRoute, Router } from '@angular/router';
interface apiParams {
  status: string,
  byName: string,
  byPhone: string
}
interface Countries {
  name: string,
  dial_code: string,
  code: string
}[]
@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss'],
  animations: [
    flyInOutAnimation
  ]
})
export class CustomersComponent implements OnInit, AfterViewInit {
  closeResult = '';
  allcustomers: any[];
  pager: any;
  spinner: boolean;
  count: number;
  apiParams: apiParams;
  keyword; placeVal = "Cell No"; sortBy: string;
  togg = true;
  togg2 = true;
  togg3 = true;  
  togg4 = true;  
  currentPageIds:Array<any>; selectedIds:Array<any>;
  checkedValues:Array<any>=[];
  notificationForm:FormGroup;
  subscription:Subscription;
  selectSenderArea:string = '';
  countryCodeValue:string = "+92";
  @ViewChild('tabset', {static:true}) tabset;
  constructor(private modalService: NgbModal, 
    private pagerService: PagerService,
    private custservice: CustomersService, 
    private rendrer: Renderer2, 
    private el: ElementRef, 
    private store:Store<USER_NAME>, 
    private changeRef:ChangeDetectorRef, 
    private activatedRoute:ActivatedRoute, 
    private router:Router) { 
    }
  
  ngAfterViewInit(){
    this.tabset.select(this.tabStatus);
    this.changeRef.detectChanges();
  }
  currentRole:string = 'Super Admin';
  tabStatus:string;
  countryCodes:Countries = (countries as any).default;
  ngOnInit() {
    this.store.subscribe((res:any)=>{
      if(res.UserData.data!==undefined){
        this.currentRole = res.UserData.data.role.title;
      }
    }, err=>{}, ()=>{this.subscription.unsubscribe()});
    this.getQueryParams();
  }
  searchValue;
  getDefault(){
    this.searchValue = '';
    this.allcustomers = [];
    this.router.navigate([]);
    this.tabset.select('tab1');
  }
  setQueryParams(byName, byPhone, status, sortyBy, perPage){
    if(byPhone[0]==0)
      byPhone = byPhone.slice(1);
    this.searchValue = byPhone || byName;
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams:{ byPhone:byPhone, byName:byName, status, sortyBy, perPage},
      queryParamsHandling:'merge'
    })
  }
  getQueryParams(){
    this.activatedRoute.queryParams.subscribe((res:any)=>{
      this.allcustomers = [];
      if(res.status){ 
        this.searchValue = res.byPhone || res.byName;
        this.sortBy = res.sortyBy;
        this.perPage = res.perPage;
        this.apiParams = {status:res.status, byName:res.byName, byPhone:res.byPhone};
        this.getCustomers(res.byName, res.byPhone, res.status, '1', res.sortyBy);
        switch (res.status) {
          case 'true':
            this.tabStatus = 'tab2';
            break;
          case 'false':
            this.tabStatus = 'tab3';
            break;
          case '':
            this.tabStatus = 'tab1';
            break;
          default:
            break;
        }
      }else{
        this.getCustomers('', '', ' ', 1, '');
      }
    })
  }
  perPage:number = 10;
  // check all values dynamically with rendrer2
  getCustomers(byName, byPhone, status, page, sortBy) {
    this.allcustomers = [];
    this.pager = {};
    this.count = 0;
    page = checkPage(page, this.pager.totalPages);
    this.spinner = true;
    this.sortBy = sortBy;
    this.apiParams = { status, byName, byPhone };
    this.custservice.getCustomers(this.apiParams.byName, this.apiParams.byPhone, this.apiParams.status, page, sortBy, this.perPage)
    .subscribe((res: any) => {
      this.count = res.data.count;
      this.pager = this.pagerService.getPager(this.count, page, this.perPage);
      this.allcustomers = res.data.customers;
      this.currentPageIds = this.allcustomers.map((data:any)=>{
        return data._id;
      })
      this.checkedValues.map((data)=>{
        let index = this.allcustomers.findIndex(e=>e._id===data);
        if(index!==-1){
          this.allcustomers[index]['checked'] = true;
        }
      })
      this.spinner = false;
    }, error => {
      this.spinner = false;
    })
  }
  sort
  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title', backdrop:'static', keyboard:false})
  }
  changeStatus(status, id) {
    Swal.fire({
      icon: 'question',
      text: 'Are you Sure',
      width: '300px',
      showCancelButton: true,
      showConfirmButton: true
    }).then((result: any) => {
      if (result.value == true) {
        this.custservice.changeStatus(status, id).subscribe((res: any) => {
          if (status == 'false') { this.getCustomers('', '', 'true', 1, '') }
          else { this.getCustomers('', '', 'false', 1, '') }
        })
      }
    })
  }
  allSelect(event){
    this.selectSenderArea = event.target.value;
    if(event.target.checked == false){
      this.changeAllChecked(event.target.checked);
      this.checkedValues = [];
    }
    else if(event.target.checked == true){
      this.changeAllChecked(event.target.checked);
      this.checkedValues = this.currentPageIds;
    }
    if(event.target.value=='sendtoPakistaniUsers' && event.target.checked==undefined){
      this.changeAllChecked(false);
      this.checkedValues = [];
    }
  }
  changeAllChecked(value){
    this.allcustomers = this.allcustomers.map((el) =>{
      var o = Object.assign({}, el);
      o.checked = value;
      return o;
    })
  }
  sortByNumber() {
    this.togg = !this.togg;
    let el = this.el.nativeElement.querySelector("#sortByNumber")
    this.renderClass('sortByNumber', this.togg, 'total_hirings')
    .then((sortBy)=>{
      this.setQueryParams(this.apiParams.byPhone, this.apiParams.byName, this.apiParams.status, sortBy, this.perPage)
    });
  }
  sortByName() {
    this.togg2 = !this.togg2;
    this.renderClass('sortByName', this.togg2, 'name')    
    .then((sortBy)=>{
      this.setQueryParams(this.apiParams.byPhone, this.apiParams.byName, this.apiParams.status, sortBy, this.perPage)
    });
  }
  sortByDate() {
    this.togg3 = !this.togg3;
    this.renderClass('sortByDate', this.togg3, 'created_at')
    .then((sortBy)=>{
      this.setQueryParams(this.apiParams.byPhone, this.apiParams.byName, this.apiParams.status, sortBy, this.perPage)
    });
  }
  sortBySpent() {
    this.togg4 = !this.togg4;
    this.renderClass('sortBySpent', this.togg4, 'total_spend')
    .then((sortBy)=>{
      this.setQueryParams(this.apiParams.byPhone, this.apiParams.byName, this.apiParams.status, sortBy, this.perPage)
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
  selectCustomers(event){
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
  submitNotification(values){
    values['userId'] = this.checkedValues;
    if(this.selectSenderArea=='' && this.checkedValues.length>1){
      this.confirmationDialog(this.checkedValues.length+' customers').then((result:any)=>{
        if(result.value){
          this.custservice.sendNotification('customer', values, 'multipledevice')
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
          this.custservice.sendNotification('customer', values, 'singledevice')
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
          this.custservice.sendNotification('customer', values, 'sendtoPakistaniUsers')
          .subscribe(()=>{
            this.resetToDefault();
          }, error=>{
            this.resetToDefault();
          });
        }
      })
    }
  }
  resetToDefault(){
    this.notificationForm.reset();
    this.checkedValues = [];
    this.modalService.dismissAll();
    this.getCustomers('','','', 1, '');
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
  device:string;
  changeDevice(value){
    this.device = value;
  }
  activity:string;
  changeActivity(value){
    this.activity = value;
  }
}