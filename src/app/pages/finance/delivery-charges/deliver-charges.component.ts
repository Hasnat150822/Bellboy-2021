import { Component, OnInit} from '@angular/core';
import { HiringActionsService } from 'app/pages/hiring-actions/hiring-actions.service';
import { Subscription } from 'rxjs';
import { ChargesService } from '../charges.service';

@Component({
  selector: 'app-charges',
  templateUrl: './deliver-charges.component.html',
  styleUrls: ['./deliver-charges.component.scss']
})
export class ChargesComponent implements OnInit {
  chargesObjects:any = {};
  actionType:string;
  actionTitle:string;
  isResponse:boolean;
  constructor(private financeService:ChargesService, private actionService:HiringActionsService){}
  ngOnInit(){
    this.chargesObjects['walker'] = [...this.arrayGenerator('')];
    this.chargesObjects['cycle'] = [...this.arrayGenerator(4)];
    this.chargesObjects['bike'] = [...this.arrayGenerator(8)];
    this.chargesObjects['car'] = [...this.arrayGenerator(12)];
    this.actionService.getMainhiring('').subscribe((res:any)=>{
      res.data.HiringActionTypes.forEach(element => {
        if(element.title === 'Deliveries'){
          this.actionTitle = element.title;
          this.actionType = element._id;
          this.getHiringCharges(element._id);
        }
      });
    })  
  }
  *arrayGenerator(dd_value){
    for (let i = 1; i <= 4; i ++) {
      yield {
        input:'input'+(i+dd_value),
        icon:'icon'+(i+dd_value),
        confirm:'confirm'+(i+dd_value),
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