import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ChargesComponent } from './delivery-charges/deliver-charges.component';
import { HiringChargesComponent } from './rider/rider.component'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ViewTimelineComponent } from './view-timeline/view-timeline.component';
import { PersonalAssistComponent } from './personal-assist/personal-assist.component';
import { HouseHoldComponent } from './house-hold/house-hold.component';
import { SharedDirectivesModule } from 'app/shared/shared-directives/shared-directives.module';
import { PresentorComponent } from './presentor/presentor.component';
const routes:Routes = [
  {
    path:'deliveryCharges', component:ChargesComponent,
    data:{
      text: 'Delivery Charges',
      path:'/deliveryCharges'
    }
  },
  {
    path:'hiringCharges', component:HiringChargesComponent,
    data:{
      text:'Hiring Charges',
      path:'/hiringCharges'
    }
  },
  {
    path:'paassist', component:PersonalAssistComponent,
    data:{
      text:'Personal Assistance',
      path:'/paassist'
    }
  },
  {
    path:'b2b', component:HouseHoldComponent,
    data:{
      text:'B2B',
      path:'/b2b'
    }
  }
]
@NgModule({
  declarations: [ChargesComponent, HiringChargesComponent, ViewTimelineComponent, PersonalAssistComponent, HouseHoldComponent, PresentorComponent],
  imports: [
    NgbModule,
    RouterModule.forChild(routes),
    CommonModule,
    SharedDirectivesModule
  ]
})
export class ChargesModule { }