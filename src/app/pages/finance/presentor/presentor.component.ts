import { Component, ElementRef, EventEmitter, Input, OnInit, Output, Renderer2 } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ChargesService } from '../charges.service';
import { HiringActionsService } from 'app/pages/hiring-actions/hiring-actions.service';

@Component({
  selector: 'app-presentor',
  templateUrl: './presentor.component.html',
  styleUrls: ['./presentor.component.scss']
})
export class PresentorComponent implements OnInit {
  inputId;
  singleId
  @Input() chargesObjects;
  @Input() actionType:string;
  @Input() actionTitle:string;
  @Output() getHiringCharges = new EventEmitter();
  constructor(private financeService:ChargesService, private modalService:NgbModal, private actionService:HiringActionsService, 
    private rendrer:Renderer2, private el:ElementRef) {   
   }
  ngOnInit() {
  }
  ngOnChanges(){
  }
  changeDisable(input, icon, confirm){
    this.rendrer.removeAttribute(
      this.el.nativeElement.querySelector('#'+input), 'disabled'
      );
    this.rendrer.setStyle(
      this.el.nativeElement.querySelector('#'+icon), 'display', 'none'
      );
    this.rendrer.setStyle(
      this.el.nativeElement.querySelector('#'+confirm), 'display', 'inline-block'
      );
  }
  open(content){
    this.modalService.open(content, { windowClass: 'my-class'});
  }
  
  updateCharges(input, confirm, icon , charges_type,api){
    let value = this.el.nativeElement.querySelector('#'+input).value;
    if(api.inputValue == value){
      return false
    }else{
     this.financeService.updateDelCharges(value, this.actionType, charges_type, '5f5da852abd69550176fad72')
      .subscribe((res:any)=>{
    this.rendrer.setAttribute(
      this.el.nativeElement.querySelector('#'+input), 'disabled', 'true'
      );
    this.rendrer.setStyle(
      this.el.nativeElement.querySelector('#'+icon), 'display', 'inline-block'
      );
    this.rendrer.setStyle(
      this.el.nativeElement.querySelector('#'+confirm), 'display', 'none'
      );
        this.getHiringCharges.next(this.actionType);
      }, error=>{
        return this.el.nativeElement.querySelector('#'+input).value = api.inputValue;
      })
    }
  }
  crossClick(input, confirm,icon, api){
    this.rendrer.setAttribute(
      this.el.nativeElement.querySelector('#'+input), 'disabled', 'true'
      );
    this.rendrer.setStyle(
      this.el.nativeElement.querySelector('#'+icon), 'display', 'inline-block'
      );
    this.rendrer.setStyle(
      this.el.nativeElement.querySelector('#'+confirm), 'display', 'none'
      );
      return this.el.nativeElement.querySelector('#'+input).value = api.inputValue;
        // $('#viewIcon').show()
  }
}
