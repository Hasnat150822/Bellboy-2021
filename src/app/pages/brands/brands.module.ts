import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrandsComponent } from './brands.component';
import { Routes, RouterModule } from '@angular/router';
import { BrandDetailComponent } from './brand-detail/brand-detail.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

const routes:Routes  = [
  {
    path:'',
    component:BrandsComponent
  },
  {
    path:'branddetail/:id',
    component:BrandDetailComponent,
    data: {
      text: 'Brand Detail',
      path:'/branddetail/:id'
    }
  }
]
@NgModule({
  declarations: [BrandsComponent, BrandDetailComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    NgbModule,
    ReactiveFormsModule
  ]
})
export class BrandsModule { }