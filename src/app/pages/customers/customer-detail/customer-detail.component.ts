import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { CustomersService } from '../customers.service';
import { amazonUrl, checkPage } from 'app/shared/services/global';
import { Store } from '@ngrx/store';
import { URL } from '../../../ngrx-states/model/url.model';
import * as allActions from '../../../ngrx-states/actions';
import { PagerService } from 'app/shared/services/pager.service';
import { NumberLiteralType } from 'typescript';
@Component({
  selector: 'app-customer-detail',
  templateUrl: './customer-detail.component.html',
  styleUrls: ['./customer-detail.component.scss']
})
export class CustomerDetailComponent implements OnInit {
  subscription: Subscription;
  customerDetail:any;
  _id:string;
  amazonImgUrl:string = amazonUrl;
  isBigImg:boolean;
  hiringByCust:Array<any>;
  pager:any = {};
  type:string = 'hiring';
  constructor(private route:ActivatedRoute, private customerService:CustomersService, private store:Store<URL>,
    private pagerService:PagerService) { }

  ngOnInit() {
    this.subscription = this.route.params.subscribe((res:any)=>{
      this._id = res.id;
    })
    this.getSingleCust();
  }
  bigImage(url){
    this.isBigImg = true;
    this.store.dispatch(new allActions.SendUrl(url));
  }
  getSingleCust(){
    this.customerService.getCustById(this._id).subscribe((res:any)=>{
      this.customerDetail = res.data.customer;
      this.getHiringsByCust(null, 1, 10);
    })
  }
  perPage:number;
  status;
  page:number;
  getHiringsByCust(status, page, perPage){
    this.status = status;
    this.perPage = +perPage;
    this.page = page;
    page = checkPage(page, this.pager.totalPages)
    this.customerService.hiringByCustomers(page, perPage, this._id, this.status, this.type)
    .subscribe((res:any)=>{
      this.hiringByCust = res;
      this.pager = this.pagerService.getPager(this.customerDetail.total_hirings, page, perPage);
    }, error=>this.hiringByCust = []);
    
  }
  getWithStatus(value){
    this.status = value;
    this.getHiringsByCust(value, this.page, this.perPage);
  }

  getByStatus(value){
    this.type = value;
    this.getHiringsByCust(this.status, this.page, this.perPage)
  }
}