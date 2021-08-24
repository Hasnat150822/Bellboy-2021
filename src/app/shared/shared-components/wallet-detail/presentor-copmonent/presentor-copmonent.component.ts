import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { confirmationDialog } from 'app/shared/services/global';
import { PagerService } from 'app/shared/services/pager.service';
import { WalletDetailService } from '../wallet-detail.service';

@Component({
  selector: 'app-presentor-copmonent',
  templateUrl: './presentor-copmonent.component.html',
  styleUrls: ['./presentor-copmonent.component.css']
})
export class PresentorCopmonentComponent implements OnInit {
  
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
  @Input() transactionDetail = [];
  @Input() totalItems:number;
  @Input() pager:number;
  @Input() walletDetail:any
  @Output() getTransactionsByPage = new EventEmitter();
  @Output() getTransactionsByStatus = new EventEmitter();
  loader:boolean;
  _id:string;
  walletType:string;
  statusType:number;
  constructor(private service:WalletDetailService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((value:any)=>{
      this.walletType = value.type;
    })
  }

  ngOnChanges(){
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
    let params = [this.statusType, page]
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
        this.service.topup(this._id, this.topupAmount.value).subscribe(()=>{
          this.loader = false
          this.topupAmount.setValue('');
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
        this.service.withDraw(this._id, this.withDrawAmount.value).subscribe(()=>{
          // this.getTransaction(this._id, 1, 10);
          // this.getWalletDetail(this._id);
          this.loader = false;
          this.withDrawAmount.setValue('');
        }, error=>this.loader = false)
      }else{
        this.loader = false;
      }
    })
  }
}
