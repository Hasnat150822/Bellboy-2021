import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommissionsComponent } from './commissions.component';
import { RouterModule, Routes } from '@angular/router';

const routes:Routes = [{
  path:'', component:CommissionsComponent
}]

@NgModule({
  declarations: [CommissionsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class CommissionsModule { }
