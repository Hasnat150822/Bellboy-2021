import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FinanceReportsComponent } from './finance-reports/finance-reports.component';
import { MonitoringReportsComponent } from './monitoring-reports/monitoring-reports.component';
import { Routes, RouterModule } from '@angular/router';
import { ResolverService } from 'app/shared/services/resolver.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CustomerReportsComponent } from './customer-reports/customer-reports.component';
const routes:Routes = [{
  path:'financeReport', component:FinanceReportsComponent,
  data:{
    text:'Finance Report',
    path:'/financeReport',
    nav:true,
    breadcrumbs:true
  },resolve:{data:ResolverService},
},
{
  path:'monitoringReport', component:MonitoringReportsComponent,
  data:{
    text:'Monitoring Report',
    path:'/monitoringReport',
    nav:true,
    breadcrumbs:true
  },resolve:{data:ResolverService},
},
{
  path:'customerReports', component:CustomerReportsComponent,
  data:{
    text:'Monitoring Report',
    path:'/customerReports',
    nav:true,
    breadcrumbs:true
  },resolve:{data:ResolverService},
}]
@NgModule({
  declarations: [FinanceReportsComponent, MonitoringReportsComponent, CustomerReportsComponent],
  imports: [
    NgbModule,
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class ReportsModule { }