import { Component, OnInit, OnDestroy } from '@angular/core';
import { FinanceService } from '../finance.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';
declare const $:any;
@Component({
  selector: 'app-charges',
  templateUrl: './deliver-charges.component.html',
  styleUrls: ['./deliver-charges.component.scss']
})
export class ChargesComponent implements OnInit, OnDestroy {
  inputId;
  isDisable:boolean = true
  deliveryCharges:any = []
  constructor(private financeService:FinanceService, private modalService:NgbModal) { }
  confirmArray = [
    "confirm1", "confirm2", "confirm3", "confirm4", "confirm5", "confirm6",
    "confirm7","confirm8","confirm9","confirm10","confirm11","confirm12",
    "confirm13","confirm14","confirm15","confirm16"
  ]
  ngOnInit() {
    this.getDeliveryCharges()
    for(let i=0; i<this.confirmArray.length; i++){
      $('#'+this.confirmArray[i]).hide()
    }
  }
  changeDisable(input, icon, confirm){
    $('#'+input).prop('disabled', false)
    $('#'+icon).hide()
    $('#'+confirm).show()
  }
  subscription: Subscription;
  getDeliveryCharges(){
    this.subscription =  this.financeService.getCharges(1)
    .subscribe((res:any)=>{
      this.deliveryCharges = res
    })
  }
  updateCharges(input, confirm, icon , charges_type,api){
    let value = $('#'+input).val()
    if(api.value == value){
      return false
    }else{
      this.financeService.updateDelCharges(value, 1, charges_type, api.bellboy_type._id)
      .subscribe((res:any)=>{
        $('#'+input).prop('disabled', true)
        $('#'+confirm).hide()
        $('#'+icon).show()
        this.getDeliveryCharges()
        if(res.success == true){
          Swal.fire({
            icon:'success',
            text:'Update',
            width:'300px',
            timer:2500,
            showConfirmButton:false,
            showCancelButton:false
          })
        }else{
          Swal.fire({
            icon:'success',
            text:res.message,
            width:'300px',
            timer:2500,
            showConfirmButton:false,
            showCancelButton:false
          })
          return $('#'+input).val(api.value)
        }
      }, error=>{
        Swal.fire({
          icon:'success',
          text:error.error.message,
          width:'300px',
          timer:2500,
          showConfirmButton:false,
          showCancelButton:false
        })
        return $('#'+input).val(api.value)
      })
    }
  }
  crossClick(input, confirm,icon, api){
        $('#'+input).prop('disabled', true)
        $('#'+confirm).hide()
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