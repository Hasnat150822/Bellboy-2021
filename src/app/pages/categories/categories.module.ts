import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriesComponent } from './categories.component';
import { Routes, RouterModule } from '@angular/router';
import { CategoryDetailComponent } from './category-detail/category-detail.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
const routes:Routes = [
  {
    path:'',
     component:CategoriesComponent
  },
  {
    path:'categorydetail/:id',
    component:CategoryDetailComponent,
    data:{
      text:'Category Detail',
      path:'/categorydetail/:id',
      nav:true,
      breadcrumbs:true
    }
  }
]
@NgModule({
  declarations: [CategoriesComponent, CategoryDetailComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    NgbModule
  ]
})
export class CategoriesModule { }
