import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeliveriesComponent } from './deliveries.component';
import { Routes, RouterModule } from '@angular/router';
import { DeliveriesDetailComponent } from './deliveries-detail/deliveries-detail.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
const routes:Routes = [
  {
    path:'',
    component:DeliveriesComponent
  },
  {
    path:'deliverydetail/:id',
    component:DeliveriesDetailComponent,
    data:{
      text:'Delivery Detail',
      path:'/deliverydetail/:id',
      nav:true,
      breadcrumbs:true
    }
  }
]
@NgModule({
  declarations: [DeliveriesComponent, DeliveriesDetailComponent],
  imports: [
    CommonModule,
    PerfectScrollbarModule,
    RouterModule.forChild(routes),
    NgbModule
  ]
})
export class DeliveriesModule { }
