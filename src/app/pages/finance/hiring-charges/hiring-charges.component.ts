import { Component, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FinanceService } from '../finance.service';
import { Subscription } from 'rxjs';
import { HiringActionsService } from 'app/pages/hiring-actions/hiring-actions.service';
@Component({
  selector: 'app-hiring-charges',
  templateUrl: './hiring-charges.component.html',
  styleUrls: ['./hiring-charges.component.scss']
})
export class HiringChargesComponent implements OnInit {
  hiringCharges:any = [];
  serviceType:string;
  @Input() category;
  constructor(private financeService:FinanceService, private modalService:NgbModal, 
    private el:ElementRef, private rendrer2:Renderer2, private hiringAction:HiringActionsService) { 
     }
  ngOnInit() {
    this.hiringAction.getMainhiring('').subscribe((res:any)=>{
      res.data.HiringActionTypes.map((response:any)=>{
        if(response.title == 'Ride'){
          this.serviceType = response._id;
          this.getHiringCharges();
        }
      })
    })
  }
  ngAfterViewInit(){
  }
  subscription: Subscription;
  getHiringCharges(){
    this.hiringCharges = [];
    this.subscription =  this.financeService.getCharges(this.serviceType)
    .subscribe((res:any)=>{
      this.hiringCharges = res;
    })
  }
  ngOnDestroy() {
    this.subscription.unsubscribe()    
    this.financeService.allData = {
      service:[], fuel:[], time:[], waiting:[]
    }
  }
}