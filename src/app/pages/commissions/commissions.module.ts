import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommissionsComponent } from './commissions.component';
import { RouterModule, Routes } from '@angular/router';
import { CompanyEarningsComponent } from './company-earnings/company-earnings.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';

const routes:Routes = [{
  path:'percentage', component:CommissionsComponent
},{
  path:'companyEarnings', component:CompanyEarningsComponent
}]

@NgModule({
  declarations: [CommissionsComponent, CompanyEarningsComponent],
  imports: [
    CommonModule,
    NgbModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ]
})
export class CommissionsModule { }
