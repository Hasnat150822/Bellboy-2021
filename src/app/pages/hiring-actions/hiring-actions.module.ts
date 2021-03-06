import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HiringActionsComponent } from './hiring-actions/hiring-actions.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'
import { SharedDirectivesModule } from 'app/shared/shared-directives/shared-directives.module';
const route:Routes = [{
  path:'',
  component:HiringActionsComponent
}]
@NgModule({
  declarations: [HiringActionsComponent],
  imports: [
    CommonModule,
    FormsModule,
    SharedDirectivesModule,
    NgbModule,
    ReactiveFormsModule,
    RouterModule.forChild(route)
  ]
})
export class HiringActionsModule { }
