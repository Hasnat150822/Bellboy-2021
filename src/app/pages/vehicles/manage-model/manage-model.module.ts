import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManageModelComponent } from './manage-model.component';
import { Routes, RouterModule } from '@angular/router';
import { ManageModelDetailComponent } from './manage-model-detail/manage-model-detail.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ResolverService } from 'app/shared/services/resolver.service';
const routes:Routes = [
  {
    path:'',
    component:ManageModelComponent
  },
  {
    path:'manageModel/:id',
    component:ManageModelDetailComponent,
    resolve:{data:ResolverService},
    data:{
      text: 'Manage Model Detail',
      path:'/manageModel/:id'
    }
  }
]
@NgModule({
  declarations: [
    ManageModelComponent,
    ManageModelDetailComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgbModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ]
})
export class ManageModelModule { }
