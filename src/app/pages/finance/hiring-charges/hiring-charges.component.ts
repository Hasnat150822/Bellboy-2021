import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
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
  constructor(private financeService:FinanceService, private modalService:NgbModal, 
    private el:ElementRef, private rendrer2:Renderer2) { 
     }
  ngOnInit() {
    this.getHiringCharges()
  }
  ngAfterViewInit(){
    for (let i = 1; i <=16; i++) {
      let confirmDiv = this.el.nativeElement.querySelector('#confirm'+i);
      let inputs = this.el.nativeElement.querySelector('.input'+i);
      this.rendrer2.setStyle(confirmDiv, 'visibility','hidden');
      this.rendrer2.setAttribute(inputs, 'disabled', 'true');
    }
  }
  changeDisable(input, icon, confirm){
    let input_el = this.el.nativeElement.querySelector('.'+input);
    let icon_el = this.el.nativeElement.querySelector('#'+icon);
    let confirmDiv = this.el.nativeElement.querySelector('#'+confirm);
    let viewIcon = this.el.nativeElement.querySelector('#viewIcon');
    this.rendrer2.removeAttribute(input_el, 'disabled');
    this.rendrer2.setStyle(icon_el, 'visibility', 'hidden');
    this.rendrer2.setStyle(viewIcon, 'visibility', 'hidden');
    this.rendrer2.setStyle(confirmDiv, 'visibility','visible');
  }
  open(content){
    this.modalService.open(content, { windowClass: 'my-class'});
  }
  subscription: Subscription;
  getHiringCharges(){
    this.hiringCharges = [];
    this.subscription =  this.financeService.getCharges(2)
    .subscribe((res:any)=>{
      this.hiringCharges = res
    })
  }
  updateCharges(input, confirm, icon , charges_type,api){
    let value = this.el.nativeElement.querySelector('.'+input).value;
    if(api.value == value){
      return false
    }else{
      let input_el = this.el.nativeElement.querySelector('.'+input);
      let icon_el = this.el.nativeElement.querySelector('#'+icon);
      let confirmDiv = this.el.nativeElement.querySelector('#'+confirm);
      let viewIcon = this.el.nativeElement.querySelector('#viewIcon');
      this.financeService.updateDelCharges(value, 2, charges_type, api.bellboy_type._id)
      .subscribe((res:any)=>{
        this.rendrer2.setAttribute(input_el, 'disabled', 'true');
        this.rendrer2.setStyle(icon_el, 'visibility', 'visible');
        this.rendrer2.setStyle(viewIcon, 'visibility', 'visible');
        this.rendrer2.setStyle(confirmDiv, 'visibility','hidden');
        this.getHiringCharges()
      }, error=>{
        return this.rendrer2.setValue(input_el, api.value);
      })
    }
  }
  crossClick(input, confirm,icon, api){
        let input_el = this.el.nativeElement.querySelector('.'+input);
        let icon_el = this.el.nativeElement.querySelector('#'+icon);
        let confirmDiv = this.el.nativeElement.querySelector('#'+confirm);
        let viewIcon = this.el.nativeElement.querySelector('#viewIcon');
        this.rendrer2.setAttribute(input_el, 'disabled', 'true');
        this.rendrer2.setStyle(icon_el, 'visibility', 'visible');
        this.rendrer2.setStyle(viewIcon, 'visibility', 'visible');
        this.rendrer2.setStyle(confirmDiv, 'visibility','hidden');
        if(api!==undefined)
          return $('#'+input).val(api.value);
  }
  ngOnDestroy() {
    this.subscription.unsubscribe()    
    this.financeService.allData = {
      service:[], fuel:[], time:[], waiting:[]
    }
  }
}
