import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FinanceService } from '../finance.service';
import { Subscription } from 'rxjs';
declare const $:any;
@Component({
  selector: 'app-hiring-charges',
  templateUrl: './hiring-charges.component.html',
  styleUrls: ['./hiring-charges.component.scss']
})
export class HiringChargesComponent implements OnInit {
  inputId;
  isDisable:boolean = true
  hiringCharges:any = [];
  singleId
  constructor(private financeService:FinanceService, private modalService:NgbModal) { }
  confirmArray = [
    "confirm1", "confirm2", "confirm3", "confirm4", "confirm5", "confirm6",
    "confirm7","confirm8","confirm9","confirm10","confirm11","confirm12",
    "confirm13","confirm14","confirm15","confirm16"
  ]
  ngOnInit() {
    this.getHiringCharges()
    for(let i=0; i<this.confirmArray.length; i++){
      $('#'+this.confirmArray[i]).hide()
    }
  }
  changeDisable(input, icon, confirm){
    $('#'+input).prop('disabled', false)
    $('#'+icon).hide()
    $('#'+confirm).show()
    $('#viewIcon').hide()
  }
  open(content){
    this.modalService.open(content, { windowClass: 'my-class'});
  }
  subscription: Subscription;
  getHiringCharges(){
    this.hiringCharges = []
    this.subscription =  this.financeService.getCharges(2)
    .subscribe((res:any)=>{
      this.hiringCharges = res
    })
  }
  updateCharges(input, confirm, icon , charges_type,api){
    let value = $('#'+input).val()
    if(api.value == value){
      return false
    }else{
      this.financeService.updateDelCharges(value, 2, charges_type, api.bellboy_type._id)
      .subscribe((res:any)=>{
        $('#'+input).prop('disabled', true)
        $('#'+confirm).hide()
        $('#viewIcon').show()
        $('#'+icon).show()
        this.getHiringCharges()
      }, error=>{
        return $('#'+input).val(api.value)
      })
    }
  }
  crossClick(input, confirm,icon, api){
        $('#'+input).prop('disabled', true)
        $('#'+confirm).hide()
        $('#viewIcon').show()
        $('#'+icon).show()
        return $('#'+input).val(api.value)
  }
  ngOnDestroy() {
    this.subscription.unsubscribe()    
    this.financeService.allData = {
      service:[], fuel:[], time:[], waiting:[]
    }
  }
}
