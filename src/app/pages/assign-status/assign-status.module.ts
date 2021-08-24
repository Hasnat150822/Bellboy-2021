import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AssignStatusComponent } from './assign-status.component';
import { Routes, RouterModule } from '@angular/router';
import { AssignStatusDetailComponent, AssignDetailHiringComponent } from './assign-status-detail/assign-status-detail.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AgmCoreModule } from '@agm/core';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
const routes:Routes = [
  {
    path:'',
    component:AssignStatusComponent
  },
  {
    path:'assigndetail/:id',
    component:AssignStatusDetailComponent,
    data:{
      text:'Assign Status Detail Delivery',
      path:'/assigndetail/:id',
      nav:true,
      breadcrumbs:true
    }
  },
  {
    path:'assigndetailhiring/:id',
    component:AssignDetailHiringComponent,
    data:{
      text:'Assign Status Detail Hiring',
      path:'/assigndetailhiring/:id',
      nav:true,
      breadcrumbs:true
    }
  }
]
@NgModule({
  declarations: [AssignStatusComponent, AssignStatusDetailComponent,
    AssignDetailHiringComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    AgmCoreModule,
    PerfectScrollbarModule,
    RouterModule.forChild(routes)
  ]
})
export class AssignStatusModule { }
