import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CustomersService } from './customers.service';
import { PagerService } from 'app/shared/services/pager.service';
import Swal from 'sweetalert2';
import { GlobalService } from 'app/shared/services/global-service.service';
import { flyInOutAnimation } from '../pages-animations';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { USER_NAME } from 'app/ngrx-states/model/url.model';
import { Subscription } from 'rxjs';
interface apiParams {
  status: string,
  byName: string,
  byPhone: string
}
@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss'],
  animations: [
    flyInOutAnimation
  ]
})
export class CustomersComponent implements OnInit {
  closeResult = '';
  allcustomers: any[];
  pager: any = {};
  spinner: boolean;
  count: number;
  defaultArr;
  apiParams: apiParams;
  keyword; placeVal = "Name"; sortBy: string;
  togg = false;
  togg2 = false;
  togg3 = false;  
  type:string;
  currentPageIds:Array<any>; selectedIds:Array<any>;
  checkedValues:Array<any>=[];
  notificationForm:FormGroup;
  subscription:Subscription;
  selectSenderArea:string = '';
  constructor(private modalService: NgbModal, private pagerService: PagerService,
    private custservice: CustomersService, private rendrer: Renderer2, private el: ElementRef,
    private globalService:GlobalService, private fb:FormBuilder, private store:Store<USER_NAME>) { 
      this.notificationForm = this.fb.group({
        title:['', {validators:[Validators.required]}],
        description:['',{validators:[Validators.required, Validators.maxLength(250)]}]
      })
    }
  
  public get title() {
    return this.notificationForm.controls['title'];
  }
  
  public get description() {
    return this.notificationForm.controls['description'];
  }
  currentRole:string;
  ngOnInit() {
    this.store.subscribe((res:any)=>{
      if(res.UserData.data!==undefined){
        this.currentRole = res.UserData.data.role.title;
      }
    }, err=>{}, ()=>{this.subscription.unsubscribe()});
    this.getCustomers('', '', '', 1, '');
  }
  setDefault(){
    this.allcustomers = []; this.count = 0; this.pager = {};
    this.changeAllChecked(false);
    let el = this.el.nativeElement.querySelector('#input');
    this.rendrer.setProperty(el, 'value', '');
  }
  perPage:number = 10;
  // check all values dynamically with rendrer2
  getCustomers(byname, byphone, status, page, sortBy) {
    this.spinner = true;
    this.sortBy = sortBy;
    this.apiParams = { status: status, byName: byname, byPhone: byphone };
    this.setDefault();
    this.custservice.getCustomers(this.apiParams.byName, this.apiParams.byPhone, this.apiParams.status, page, sortBy, this.perPage)
    .subscribe((res: any) => {
      this.count = res.data.count;
      this.pager = this.pagerService.getPager(this.count, page, this.perPage);
      this.defaultArr = res.data.customers;
      this.allcustomers = res.data.customers;
      this.currentPageIds = this.allcustomers.map((data:any)=>{
        return data._id;
      })
      this.checkedValues.map((data)=>{
        let index = this.allcustomers.findIndex(e=>e._id===data);
        if(index!==-1){
          this.allcustomers[index]['checked'] = true;
        }
        // else{
        //   this.allcustomers[index]['checked'] = false;
        // }
      })
      this.spinner = false;
    }, error => {
      this.spinner = false;
    })
  }
  sort
  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title' })
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
  prev5Items(page) {
    if (page < 1) {
      this.getCustomers('', '', this.apiParams.status, 1, '');
    } else {
      this.getCustomers('', '', this.apiParams.status, page, '');
    }
  }
  next5Items(page) {
    if (page > this.pager.totalPages) {
      this.getCustomers('', '', this.apiParams.status, this.pager.totalPages, '');
    } else {
      this.getCustomers('', '', this.apiParams.status, page, '');
    }
  }
  onEnter(event){
    let key = event.keyCode;
    if (key === 13) {
      event.preventDefault();
      this.getCustomers(this.apiParams.byName, this.apiParams.byPhone, this.apiParams.status, 1, this.sortBy)
     }
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
    this.renderClass(el, this.togg, 'total_hirings')
    .then((sortBy)=>{
      this.getCustomers(this.apiParams.byName, this.apiParams.byPhone, this.apiParams.status, 1, sortBy);
    });
  }
  sortByName() {
    this.togg2 = !this.togg2;
    let el = this.el.nativeElement.querySelector("#sortByName")
    this.renderClass(el, this.togg2, 'name')    
    .then((sortBy)=>{
      this.getCustomers(this.apiParams.byName, this.apiParams.byPhone, this.apiParams.status, 1, sortBy);
    });
  }
  sortByDate() {
    this.togg3 = !this.togg3;
    let el = this.el.nativeElement.querySelector("#sortByDate")
    this.renderClass(el, this.togg3, 'created_at')    
    .then((sortBy)=>{
      this.getCustomers(this.apiParams.byName, this.apiParams.byPhone, this.apiParams.status, 1, sortBy);
    });
  }
  renderClass(el, value, sortby) {
    return new Promise((resolve)=>{
          // default remove classes from tags
    let byNumber = this.el.nativeElement.querySelector("#sortByNumber");
    let byName = this.el.nativeElement.querySelector("#sortByName");
    let byDate = this.el.nativeElement.querySelector("#sortByDate");
    this.rendrer.removeClass(byNumber, "ft-chevron-down");
    this.rendrer.removeClass(byNumber, "ft-chevron-up");
    this.rendrer.removeClass(byName, "ft-chevron-down");
    this.rendrer.removeClass(byName, "ft-chevron-up");
    this.rendrer.removeClass(byDate, "ft-chevron-down");
    this.rendrer.removeClass(byDate, "ft-chevron-up");
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
  message
  imgURL
  imageFile:File
 async preview(files){
   this.imageFile = files[0]
    if(files.length===0){
      return false
    }else if(files[0].type.match(/image\/*/) == null){
      this.message = "Only images are supported.";
      return
    }else{
      await base64(files).then((data)=>{
        this.imgURL = data
      })
      this.globalService.compress(this.imgURL, files[0].name).then((res:any)=>{
        let result = res[0]
        if(result.status == true){
          this.imageFile = result.file
          this.imgURL = result.con64
          return
        }
      })
    }
  }
  submitNotification(){
    let values = this.notificationForm.getRawValue();
    values['userId'] = this.checkedValues;
    values['notificationImg'] = this.imageFile;
    console.log(this.notificationForm, 'form');
    if(this.selectSenderArea=='' && this.checkedValues.length>1){
      this.confirmationDialog(this.checkedValues.length+' customers').then((result:any)=>{
        if(result.value){
          this.custservice.sendNotification(values, 'multipledevice')
          .subscribe(()=>{
            this.notificationForm.reset();
            this.checkedValues = [];
            this.modalService.dismissAll();
            this.getCustomers('','','', 1, '');
          }, error=>{
            this.notificationForm.reset();
            this.checkedValues = [];
            this.modalService.dismissAll();
            this.getCustomers('','','', 1, '');
          });
        }
      })
    }else if(this.checkedValues.length==1){
      this.confirmationDialog(' Single Customer').then((result:any)=>{
        if(result.value){
          this.custservice.sendNotification(values, 'singledevice')
          .subscribe(()=>{
            this.notificationForm.reset();
            this.checkedValues = [];
            this.modalService.dismissAll();
            this.getCustomers('','','', 1, '');
          }, error=>{
            this.notificationForm.reset();
            this.checkedValues = [];
            this.modalService.dismissAll();
            this.getCustomers('','','', 1, '');
          });
        }
      });
    }else{
      this.confirmationDialog(' Pakistani customers').then((result:any)=>{
        if(result.value){
          this.custservice.sendNotification(values, 'sendtoPakistaniUsers')
          .subscribe(()=>{
            this.notificationForm.reset();
            this.checkedValues = [];
            this.modalService.dismissAll();
            this.getCustomers('','','', 1, '');
          }, error=>{
            this.notificationForm.reset();
            this.checkedValues = [];
            this.modalService.dismissAll();
            this.getCustomers('','','', 1, '');
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
}
function base64(files){
  return new Promise((resolve, reject)=>{
    const reader = new FileReader();
    reader.readAsDataURL(files[0])
    reader.onload = ()=>resolve(reader.result)
    reader.onerror = error=>reject(error)
 })
}