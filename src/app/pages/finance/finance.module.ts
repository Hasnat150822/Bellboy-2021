import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ChargesComponent } from './delivery-charges/deliver-charges.component';
import { HiringChargesComponent } from './hiring-charges/hiring-charges.component';
import { ResolverService } from 'app/shared/services/resolver.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ViewTimelineComponent } from './view-timeline/view-timeline.component';
import { PersonalAssistComponent } from './personal-assist/personal-assist.component';
import { HouseHoldComponent } from './house-hold/house-hold.component';
const routes:Routes = [
  {
    path:'deliveryCharges', component:ChargesComponent,
    data:{
      text: 'Delivery Charges',
      path:'/deliveryCharges'
    },resolve:{data:ResolverService},
  },
  {
    path:'hiringCharges', component:HiringChargesComponent,
    data:{
      text:'Hiring Charges',
      path:'/hiringCharges'
    },resolve:{data:ResolverService},
  },
  {
    path:'paassist', component:PersonalAssistComponent,
    data:{
      text:'Personal Assistance',
      path:'/paassist'
    },resolve:{data:ResolverService},
  },
  {
    path:'household', component:HiringChargesComponent,
    data:{
      text:'House Hold',
      path:'/household'
    },resolve:{data:ResolverService},
  }
]
@NgModule({
  declarations: [ChargesComponent, HiringChargesComponent, ViewTimelineComponent, PersonalAssistComponent, HouseHoldComponent],
  imports: [
    NgbModule,
    RouterModule.forChild(routes),
    CommonModule
  ]
})
export class FinanceModule { }