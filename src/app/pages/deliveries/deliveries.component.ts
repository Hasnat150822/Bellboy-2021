import { Component, OnInit } from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { DeliveriesService } from './deliveries.service';
import { Subscription } from 'rxjs';
import { PagerService } from 'app/shared/services/pager.service';
@Component({
  selector: 'app-deliveries',
  templateUrl: './deliveries.component.html',
  styleUrls: ['./deliveries.component.scss']
})
export class DeliveriesComponent implements OnInit {
  closeResult = '';
  subscription: Subscription;
  allOrders:any[]
  pager:any = {}
  totalItems:number
  keyword:string = ''
  cacelled_reason
  status =2
  spinner:boolean
  constructor(private modalService: NgbModal, private pagerService:PagerService,
    private deliveries:DeliveriesService) { }
  ngOnInit() {
    this.getOrders(this.keyword, this.status, 1)
  }
  getOrders(search, status, page){
    this.spinner = true
    this.status = status
    this.keyword = search
    this.subscription =  this.deliveries.getAllOrders(page, status, search)
    .subscribe((res:any)=>{
      if(res.success == true){
        this.spinner =false
        this.allOrders = res.data.orders
        this.totalItems = res.data.count
        if(this.allOrders.length>0){
          let pager = this.pagerService.getPager(res.data.count, page, 10)
          if(page>pager.totalPages){
            page = pager.totalPages
          }else if(page<0){
            page = 1
          }
          this.pager = this.pagerService.getPager(res.data.count, page, 10)
          
        }
      }else{
        this.spinner = false
      }
    }, error=>{
      this.spinner = false
    })
  }
  open(content, reason) {
    this.cacelled_reason = reason
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'})
  }
}