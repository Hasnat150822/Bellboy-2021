import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BellboyTypesComponent } from './bellboy-types/bellboy-types.component';
import { Routes, RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
const routes:Routes = [{
  path:'',
  component:BellboyTypesComponent
}]
@NgModule({
  declarations: [BellboyTypesComponent],
  imports: [
    CommonModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ]
})
export class BellboyTypesModule { }
