import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManageBrandComponent } from './manage-brand.component';
import { Routes, RouterModule } from '@angular/router';
import { ManageBrandDetailComponent } from './manage-brand-detail/manage-brand-detail.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ResolverService } from 'app/shared/services/resolver.service';
const routes:Routes = [
  {
    path:'',component:ManageBrandComponent
  },
  {
    path:'manageBrandDetail/:id',
    component:ManageBrandDetailComponent,
    resolve:{data:ResolverService},
    data:{
      text: 'Manage Vehicle Brand',
      path:'/manageBrandDetail/:id'
    }
  }
]
@NgModule({
  declarations: [
    ManageBrandComponent,
    ManageBrandDetailComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgbModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ]
})
export class ManageBrandModule { }
