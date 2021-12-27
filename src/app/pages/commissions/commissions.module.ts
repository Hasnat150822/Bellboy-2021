import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommissionsComponent } from './commissions.component';
import { RouterModule, Routes } from '@angular/router';
import { CompanyEarningsComponent } from './company-earnings/company-earnings.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { DecodeHiringTypePipe } from './company-earnings/pipes/decode-hiring-type.pipe';
import { ChartsModule } from 'ng2-charts';

const routes:Routes = [{
  path:'percentage', component:CommissionsComponent
},{
  path:'companyEarnings', component:CompanyEarningsComponent
}]

@NgModule({
  declarations: [
    CommissionsComponent, 
    CompanyEarningsComponent, 
    DecodeHiringTypePipe],
  imports: [
    CommonModule,
    ChartsModule,
    NgbModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ]
})
export class CommissionsModule { }
