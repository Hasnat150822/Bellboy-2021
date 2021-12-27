import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PagerService } from 'app/shared/services/pager.service';
import { WalletDetailService } from './wallet-detail.service';

@Component({
  selector: 'app-wallet-detail',
  template: `
  <app-presentor-copmonent (getTransactionsByPage)="setPage($event)"
  (getTransactionsByStatus)="getTranscByStatus($event)"
  [transactionDetail]="transactionDetail" [totalItems]="totalItems" 
<<<<<<< HEAD
  [pager]="pager" [walletDetail]="walletDetail" (date)="getDate($event)"
  (resetRecord)="resetRecord()" (walletDetailR)="getWalletDetail($event)">
=======
  [pager]="pager" [walletDetail]="walletDetail">
>>>>>>> webfix/bellboy-copy
</app-presentor-copmonent>
  `
})
export class WalletDetailComponent implements OnInit {
  walletDetail;
  _id;
  transactionDetail;
  loader: boolean;
  pager: any = {};
  totalItems:number;
  walletType:string;
<<<<<<< HEAD
  startDate = undefined;
  endDate = undefined;
  statusType:string;
=======
>>>>>>> webfix/bellboy-copy
  constructor(private service: WalletDetailService, private activatedRoute: ActivatedRoute, private pagerService: PagerService) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((value:any)=>{
      this.walletType = value.type;
    })
    this._id = this.activatedRoute.params['value'].id
    this.getWalletDetail(this._id);
    this.setPage({'statusType':undefined, 'page':1});
  }
  setPage({statusType, page}) {
    this.getTransaction(this._id, page, 10, statusType);
  }
  getWalletDetail(id) {
    this.service.getBellboyWalletDetail(id, this.walletType).subscribe((res: any) => {
      this.walletDetail = res;
    }, error => {
    })
  }
  getTransaction(id, page, perpage, type) {
<<<<<<< HEAD
    this.statusType = type;
    this.service.getBellboyTransactions(id, page, perpage, this.walletType, type, this.startDate, this.endDate).subscribe((res: any) => {
      this.transactionDetail = res.bellboy_transaction || res.customer_transaction;
      let resultArr = this.transactionDetail;
      resultArr.forEach((singleObject:any)=>{
        let keys = Object.keys(singleObject);
        keys.map((key:any)=>{
          singleObject[key] = singleObject[key]?singleObject[key]:'-';
        })
      })
=======
    this.service.getBellboyTransactions(id, page, perpage, this.walletType, type).subscribe((res: any) => {
      this.transactionDetail = res.bellboy_transaction;
>>>>>>> webfix/bellboy-copy
      this.totalItems = res.count;
      this.pager = this.pagerService.getPager(this.totalItems, page, perpage);
    })
  }
<<<<<<< HEAD
  getDate(event){
    this.startDate = event.startdate;
    this.endDate = event.enddate;
    this.setPage({'statusType':this.statusType, 'page':1});
  }
  getTranscByStatus(type){
    this.getTransaction(this._id, 1, 10, type);
  }
  resetRecord(){
    this.startDate = undefined;
    this.endDate = undefined;
    this.setPage({'statusType':this.statusType, 'page':1});
  }
=======
  getTranscByStatus(type){
    this.getTransaction(this._id, 1, 10, type);
  }
>>>>>>> webfix/bellboy-copy
}