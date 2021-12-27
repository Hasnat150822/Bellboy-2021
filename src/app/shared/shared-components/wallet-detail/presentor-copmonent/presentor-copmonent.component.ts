<<<<<<< HEAD
import { Component, ElementRef, EventEmitter, Input, OnInit, Output, Renderer2 } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { amazonUrl, confirmationDialog, startDateWeek } from 'app/shared/services/global';
// import { PagerService } from 'app/shared/services/pager.service';
=======
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { confirmationDialog } from 'app/shared/services/global';
import { PagerService } from 'app/shared/services/pager.service';
>>>>>>> webfix/bellboy-copy
import { WalletDetailService } from '../wallet-detail.service';

@Component({
  selector: 'app-presentor-copmonent',
  templateUrl: './presentor-copmonent.component.html',
<<<<<<< HEAD
  styleUrls: ['./presentor-copmonent.component.scss']
})
export class PresentorCopmonentComponent implements OnInit {
  filterForm:FormGroup;
  dateValue:string;
=======
  styleUrls: ['./presentor-copmonent.component.css']
})
export class PresentorCopmonentComponent implements OnInit {
  
>>>>>>> webfix/bellboy-copy
  transactionForm = new FormGroup({
    topupAmount:new FormControl('', [Validators.required]),
    withDrawAmount:new FormControl('', [Validators.required])
  });
  get topupAmount(){
    return this.transactionForm.controls.topupAmount;
  }
  get withDrawAmount(){
    return this.transactionForm.controls.withDrawAmount;
  }
<<<<<<< HEAD
  get filter(){
    return this.filterForm.controls.filter;
  }
=======
>>>>>>> webfix/bellboy-copy
  @Input() transactionDetail = [];
  @Input() totalItems:number;
  @Input() pager:number;
  @Input() walletDetail:any
  @Output() getTransactionsByPage = new EventEmitter();
  @Output() getTransactionsByStatus = new EventEmitter();
<<<<<<< HEAD
  @Output() date = new EventEmitter();
  @Output() resetRecord = new EventEmitter();
  @Output() walletDetailR = new EventEmitter();
  loader:boolean;
  _id:string;
  walletType:string;
  statusType:number = +'';
  amazonImgUrl:string = amazonUrl;
  constructor(private service:WalletDetailService, 
    private activatedRoute: ActivatedRoute, 
    private router:Router,
    private el:ElementRef, 
    private rendrer2:Renderer2, 
    private fb:FormBuilder) { 
    this.filterForm = this.fb.group({
      filter:''
    })
   }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((res:any)=>{
      this._id = res.id;
    })
=======
  loader:boolean;
  _id:string;
  walletType:string;
  statusType:number;
  constructor(private service:WalletDetailService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
>>>>>>> webfix/bellboy-copy
    this.activatedRoute.queryParams.subscribe((value:any)=>{
      this.walletType = value.type;
    })
  }

  ngOnChanges(){
<<<<<<< HEAD
    this.walletDetail;
=======
>>>>>>> webfix/bellboy-copy
    this.fillEmptyValues()
  }
  fillEmptyValues(){
    if(this.transactionDetail){
      let resultArr = this.transactionDetail;
      resultArr.forEach((singleObject:any)=>{
        let keys = Object.keys(singleObject);
        keys.map((key:any)=>{
          singleObject[key] = singleObject[key]?singleObject[key]:'-';
        })
      })
    }else{
      this.transactionDetail = [];
    }
  }
  getByPage(page){
<<<<<<< HEAD
=======
    let params = [this.statusType, page]
>>>>>>> webfix/bellboy-copy
    this.getTransactionsByPage.next({'statusType':this.statusType, page});
  }
  getByStatus(statusType){
    this.statusType = statusType;
    this.getTransactionsByStatus.next(statusType);
  }
  topUp(){
    this.loader = true;
    confirmationDialog('TopUp Amount : '+this.topupAmount.value+'/-').then((result)=>{
      if(result.value){
<<<<<<< HEAD
        this.service.topup(this._id, this.topupAmount.value, this.walletType).subscribe(()=>{
          this.loader = false
          this.topupAmount.setValue('');
          this.walletDetailR.emit(this._id);
          this.getByStatus(this.statusType);
=======
        this.service.topup(this._id, this.topupAmount.value).subscribe(()=>{
          this.loader = false
          this.topupAmount.setValue('');
>>>>>>> webfix/bellboy-copy
        },error=>this.loader=false)
      }else{
        this.loader = false;
      }
    })
  }
  withDraw(){
    this.loader = true;
    confirmationDialog('WithDraw Amount : '+this.withDrawAmount.value+'/-').then((result)=>{
      if(result.value){
<<<<<<< HEAD
        this.service.withDraw(this._id, this.withDrawAmount.value, this.walletType).subscribe(()=>{
          this.loader = false;
          this.withDrawAmount.setValue('');
          this.walletDetailR.emit(this._id);
          this.getByStatus(this.statusType);
=======
        this.service.withDraw(this._id, this.withDrawAmount.value).subscribe(()=>{
          // this.getTransaction(this._id, 1, 10);
          // this.getWalletDetail(this._id);
          this.loader = false;
          this.withDrawAmount.setValue('');
>>>>>>> webfix/bellboy-copy
        }, error=>this.loader = false)
      }else{
        this.loader = false;
      }
    })
  }
<<<<<<< HEAD
  openClose(id){
    let el = this.el.nativeElement.querySelector('#'+id);
    if(el.className.includes('d-none')){
      this.rendrer2.removeClass(el, 'd-none');
    }else{
      this.rendrer2.addClass(el, 'd-none');
    }
  }
  searchByDate(){
    if(this.filter.value=='byDay'){
      let dateObj = {
        startdate:this.dateValue,
        enddate:this.dateValue
      }
      this.date.next(dateObj);
      this.openClose('filterOpt')
    }else if(this.filter.value == 'byWeek'){
      let year = this.dateValue.split('-')[0];
      let week = this.dateValue.split('-')[1].split('W')[1];
      let startDate = startDateWeek(year, week);
      let endDate = startDateWeek(year, week);
      endDate.setDate(startDateWeek(year, week).getDate()+6);
      let dateObj = {
        startdate:startDate.toISOString(),
        enddate:endDate.toISOString()
      }
      this.date.next(dateObj)
      this.openClose('filterOpt')
    }else{
      let startDate = new Date(
        +this.dateValue.split('-')[0], 
        +this.dateValue.split('-')[1]-1, 
        2);
      let endDate = new Date(
        +this.dateValue.split('-')[0], 
        +this.dateValue.split('-')[1],
        1);
      // let lastDate = new Date(year, month, 0);
      // 2021, 12
      let dateObj = {
        startdate:startDate.toISOString().split('T')[0],
        enddate:endDate.toISOString().split('T')[0]
      }
      this.date.next(dateObj);
      this.openClose('filterOpt');
    }
  }
  reset(){
    this.resetRecord.emit();
    this.dateValue = '';
    this.filterForm.reset();
    this.openClose('filterOpt')
  }
  whichId(item){
    if(item.ride){
      return item.ride?.hiring_id;
    }else if(item.pa){
      return item.pa?.hiring_id;
    }else{
      return item.hiring?.hiring_id;
    }
  }
  routeToMain(item){
    if(item?.admin){
      // '/hiring/hiringDetail/' ,,,, item.hiring?.hiring_id
      this.router.navigate(['/myprofile/', item?.admin?._id]);
    }else{
      if(item.ride){
        this.router.navigate(['/hiring/hiringDetail/', item?.ride?.hiring_id], {
          queryParams:{
            hiringType:'ride'
          }
        });
      }else if(item.pa){
        this.router.navigate(['/hiring/hiringDetail/', item?.pa?.hiring_id], {
          queryParams:{
            hiringType:'pa'
          }
        });
      }else{
        this.router.navigate(['/hiring/hiringDetail/', item?.hiring?.hiring_id], {
          queryParams:{
            hiringType:'hiring'
          }
        });
      }
    }
  }
=======
>>>>>>> webfix/bellboy-copy
}
