import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BellboyTrackingComponent } from './bellboy-tracking.component';
import { AgmCoreModule } from '@agm/core';
import { Routes, RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
const routes:Routes = [{
  path:'', component:BellboyTrackingComponent
}]
@NgModule({
  declarations: [BellboyTrackingComponent],
  imports: [
    CommonModule,
    AgmCoreModule,
    NgbModule,
    RouterModule.forChild(routes) 
  ]
})
export class BellboyTrackingModule { }