<<<<<<< HEAD
import { Component, OnInit} from '@angular/core';
import { HiringActionsService } from 'app/pages/hiring-actions/hiring-actions.service';
import { Subscription } from 'rxjs';
import { ChargesService } from '../charges.service';
=======
import { Component, OnInit } from '@angular/core';
>>>>>>> webfix/bellboy-copy

@Component({
  selector: 'app-personal-assist',
  templateUrl: './personal-assist.component.html',
  styleUrls: ['./personal-assist.component.css']
})
export class PersonalAssistComponent implements OnInit {
<<<<<<< HEAD
  chargesObjects:any = {};
  actionType:string;
  actionTitle:string;
  isResponse:boolean;
  constructor(private financeService:ChargesService, private actionService:HiringActionsService){}
  ngOnInit(){
    // this.chargesObjects['walker'] = [...this.arrayGenerator('')];
    // this.chargesObjects['cycle'] = [...this.arrayGenerator(4)];
    this.chargesObjects['bike'] = [...this.arrayGenerator()];
    // this.chargesObjects['car'] = [...this.arrayGenerator(12)];
    this.actionService.getMainhiring('').subscribe((res:any)=>{
      res.data.HiringActionTypes.forEach(element => {
        if(element.title === 'Personal Assistance'){
          this.actionTitle = element.title;
          this.actionType = element._id;
          this.getHiringCharges(element._id);
        }
      });
    })  
  }
  *arrayGenerator(){
    for (let i = 1; i <= 3; i=i+2) {
      yield {
        input:'input'+i,
        icon:'icon'+i,
        confirm:'confirm'+i,
        inputValue:0,
        charges_type:i
      };
    }
  }
  subscription: Subscription;
  getHiringCharges(id){
    this.subscription =  this.financeService.getCharges(id)
    .subscribe((res:any)=>{
      if(res.data.length>0){
        res.data.map((item:any)=>{
          let title = item.title;
          item.charges.map((charge)=>{
            this.chargesObjects[title].forEach((singleItem)=>{
              if(singleItem.charges_type == charge.charges_type){
                singleItem.inputValue = charge.value;
                singleItem['bellboy_type'] = charge.bellboy_type;
              }
            })
          })
          this.isResponse = true;
        })
      }
    })
  }
}
=======

  constructor() { }

  ngOnInit(): void {
  }

}
>>>>>>> webfix/bellboy-copy
