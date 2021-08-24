import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CommissionsService } from './commissions.service';

@Component({
  selector: 'app-commissions',
  templateUrl: './commissions.component.html',
  styleUrls: ['./commissions.component.css']
})
export class CommissionsComponent implements OnInit {
  customerCommission;
  bellboyCommission;
  customerForm = new FormGroup({
    customerValue: new FormControl('', [Validators.required, Validators.min(1)]),
    customerTitle: new FormControl('', [Validators.required])
  })
  bellboyForm = new FormGroup({
    bellboyValue: new FormControl('', [Validators.required, Validators.min(1)]),
    bellboyTitle: new FormControl('', [Validators.required])
  })
  get bellboyValue(){
    return this.bellboyForm.controls.bellboyValue;
  }
  get customerValue(){
    return this.customerForm.controls.customerValue;
  }
  get customerTitle(){
    return this.customerForm.controls.customerTitle;
  }
  get bellboyTitle(){
    return this.bellboyForm.controls.bellboyTitle;
  }
  commissionType;
  constructor(private service:CommissionsService, private ngbModal:NgbModal) { }

  ngOnInit(): void {
    this.getCommission();
  }
  open(content){
    this.ngbModal.open(content, {keyboard:false});
  }
  getCommission(){
    this.service.getCommission().subscribe((res:any)=>{
      this.customerCommission = res.customerCommission;
      this.bellboyCommission = res.bellboyCommission;
    })
  }
  changeCommission(type){
    //1 for bellboy and 2 for customer
    if(type == 1){
      let obj = {
        value:this.bellboyValue.value,
        title:this.bellboyTitle.value,
        type:1
      }
      this.service.changeCommission(obj).subscribe(()=>{
        this.getCommission();
        this.ngbModal.dismissAll();
      })
    }else{
      let obj = {
        value:this.customerValue.value,
        title:this.customerTitle.value,
        type:2
      }
      this.service.changeCommission(obj).subscribe(()=>{
        this.getCommission();
        this.ngbModal.dismissAll();
      })
    }
  }
}