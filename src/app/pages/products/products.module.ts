import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from './products.component';
import { Routes, RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ProductDetailComponent } from './prodect-detail/product-detail.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
const routes:Routes = [
  {
    path:'',
    component:ProductsComponent
  },
  {
    path:'productdetail/:id',
    component:ProductDetailComponent,
    data:{
      text: 'Product Detail',
      path:'/productdetail/:id'
    }
  }
]
@NgModule({
  declarations: [ProductsComponent, ProductDetailComponent],
  imports: [
    CommonModule,
    NgbModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ProductsModule { }
