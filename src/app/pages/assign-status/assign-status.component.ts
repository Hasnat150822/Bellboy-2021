import { Component, OnInit } from '@angular/core';
import { AssignStatusService } from './assign-status.service';
import { Subscription } from 'rxjs';
import { PagerService } from 'app/shared/services/pager.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { HiringService } from '../hiring/hiring.service';

@Component({
  selector: 'app-assign-status',
  templateUrl: './assign-status.component.html',
  styleUrls: ['./assign-status.component.scss']
})
export class AssignStatusComponent implements OnInit {
  keyword:string = '';
  subscription: Subscription;
  pendingOrder:any = [];
  pagedItems:any[];
  pager:any = {};
  tempArr:any;
  totalItems:any;
  searchkey;
  spinner:boolean;
  placeVal:string = "Id";
  bybbType = ''; byTime = ''; byId=''; byAction=''; byName=''; byPhone=''; byBBname='';
  constructor(private assigneStatus:AssignStatusService, private fb:FormBuilder,
    private pagerService:PagerService, private router:Router, private service:HiringService) { 
    }
  ngOnInit() {
    this.getPendingOrder(1);
  }
  getPendingOrder(page){
    this.spinner = true
    // this.service.getAllHirings('1', page,this.bybbType, this.byTime, this.byId, this.byAction, this.byName, this.byPhone, this.byBBname).subscribe((response:any)=>{
    //   this.pendingOrder = response.data.hirings;
    //   this.totalItems = response.data.count;
    //   this.pager = this.pagerService.getPager(response.data.count, page);
    //   this.spinner = false
    // },error=>{
    //   this.spinner = false
    // })
  }
  // setPage(page){
  //   if(page>this.pager.totalPages){
  //     page = this.pager.totalPages
  //   }else if(page<0){
  //     page = 1
  //   } 
  //   this.pager = this.pagerService.getPager(this.tempArr.length, page);
  //   this.pagedItems = this.tempArr.slice(this.pager.startIndex, this.pager.endIndex+1);
  // }
  // search(keyword){
  //   if(keyword.length==0){
  //     this.tempArr = this.pendingOrder;
  //     this.setPage(1)
  //   }else{
  //     this.tempArr =  this.pendingOrder.filter((value)=>{
  //       return value.hiring_id.indexOf(keyword)>-1; 
  //     })
  //     this.setPage(1);
  //   }
  // }
  // searchByName(keyword){
  //   keyword = keyword.toLowerCase();
  //   if(keyword.length==0){
  //     this.tempArr = this.pendingOrder
  //     this.setPage(1);
  //   }else{
  //     this.tempArr =  this.pendingOrder.filter((value)=>{
  //       return value.customer.name.toLowerCase().indexOf(keyword)>-1;
  //     })
  //     this.setPage(1);
  //   }
  // }
  // searchByMobile(keyword){
  //   keyword = +keyword;
  //   if(keyword.length==0){
  //     this.tempArr = this.pendingOrder;
  //     this.setPage(1)
  //   }else{
  //     this.tempArr =  this.pendingOrder.filter((value)=>{
  //       return value.customer.mobile.indexOf(keyword)>-1;
  //     })
  //     this.setPage(1);
  //   }
  // }
  // searchByHour(keyword){
  //   keyword = +keyword;
  //   if(keyword==0){
  //     this.tempArr = this.pendingOrder;
  //     this.setPage(1)
  //   }else{
  //     this.tempArr =  this.pendingOrder.filter((value)=>{
  //       return value.hours == keyword;
  //     })
  //     this.setPage(1);
  //   }
  // }
  // searchByBBType(keyword){
  //   keyword = keyword.toLowerCase();
  //   if(keyword.length==0){
  //     this.tempArr = this.pendingOrder;
  //     this.setPage(1)
  //   }else{
  //     this.tempArr =  this.pendingOrder.filter((value)=>{
  //       return value.bellboyType.title.indexOf(keyword)>-1;
  //     })
  //     this.setPage(1);
  //   }
  // }
  // searchByActions(keyword){
  //   keyword = +keyword;
  //   if(keyword==0){
  //     this.tempArr = this.pendingOrder;
  //     this.setPage(1)
  //   }else{
  //     this.tempArr =  this.pendingOrder.filter((value)=>{
  //       return value.actions.indexOf(keyword)>-1;
  //     })
  //     this.setPage(1);
  //   }
  // }
  detailRoute(item, type){
    if(type === 'Delivery'){
      this.router.navigate(['/assignstatus/assigndetail', item.order_id])
    }else{
      this.router.navigate(['/assignstatus/assigndetailhiring', item.hiring_id])
    }
  }
}
