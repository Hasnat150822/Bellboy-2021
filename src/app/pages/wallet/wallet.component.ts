import { Component, OnInit } from '@angular/core';
import { PagerService } from 'app/shared/services/pager.service';
import { WalletService } from './wallet.service';
interface topupWithdraw {
  totalTopUp:number,
  totalWithDraw:number
}
@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.css']
})
export class WalletComponent implements OnInit {
  transactionDetail = [];
  totalItems:number;
  pager = {}
  totlaTopupWithdraw:any={};
  constructor(private service:WalletService, private pagerService:PagerService) { }

  ngOnInit(){
    this.setPage(1);
    this.getTopupWithdraw();
  }

  getTopupWithdraw(){
    this.service.getTotalTopupWithdraw().subscribe((res:any)=>{
      res.map((res:any)=>{
        if(res._id == 2){
          this.totlaTopupWithdraw['totalTopUp'] = res.total;
        }else{
          this.totlaTopupWithdraw['totalWithDraw'] = res.total;
        }
      })
    })
  }
  setPage(page){
    this.getTransaction(page, 10);
  }
  getTransaction(page, perpage){
    this.service.getAdminTransactions(page, perpage).subscribe((res:any)=>{
      this.transactionDetail = res.admin_transaction;
      let resultArr = this.transactionDetail;
      resultArr.forEach((singleObject:any)=>{
        let keys = Object.keys(singleObject);
        keys.map((key:any)=>{
          singleObject[key] = singleObject[key]?singleObject[key]:'-';
        })
      })
      this.totalItems = res.count;
      this.pager = this.pagerService.getPager(res.count, page, perpage);
    })
  }
}