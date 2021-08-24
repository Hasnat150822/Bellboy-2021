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
  [pager]="pager" [walletDetail]="walletDetail">
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
    this.service.getBellboyTransactions(id, page, perpage, this.walletType, type).subscribe((res: any) => {
      this.transactionDetail = res.bellboy_transaction;
      this.totalItems = res.count;
      this.pager = this.pagerService.getPager(this.totalItems, page, perpage);
    })
  }
  getTranscByStatus(type){
    this.getTransaction(this._id, 1, 10, type);
  }
}