import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FinanceReportsComponent } from './finance-reports/finance-reports.component';
import { MonitoringReportsComponent } from './monitoring-reports/monitoring-reports.component';
import { Routes, RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CustomerReportsComponent } from './customer-reports/customer-reports.component';
import { BellboyReportsComponent } from './bellboy-reports/bellboy-reports.component';
import { TableComponent } from './shared-components/table/table.component';
import { TablePaginationComponent } from './shared-components/table-pagination/table-pagination.component';
import { TimeConvertModule } from 'app/shared/pipes/time-convert/time-convert.module';
import { DateRangeButtonModule } from 'app/shared/shared-components/date-range-button/date-range-button.module';
import { HiringReportsComponent } from './hiring-reports/hiring-reports.component';

const routes:Routes = [{
  path:'financeReport', component:FinanceReportsComponent,
  data:{
    text:'Finance Report',
    path:'/financeReport',
    nav:true,
    breadcrumbs:true
  }
},
{
  path:'monitoringReport', component:MonitoringReportsComponent,
  data:{
    text:'Monitoring Report',
    path:'/monitoringReport',
    nav:true,
    breadcrumbs:true
  }
},
{
  path:'customerReports', component:CustomerReportsComponent,
  data:{
    text:'Customer Reports',
    path:'/customerReports',
    nav:true,
    breadcrumbs:true
  }
}, {
  path:'bellboyReports', component:BellboyReportsComponent, 
  data:{
    text:'Bellboy Report',
    path:'/bellboyReports',
    nav:true,
    breadcrumbs:true
  }
}, {
  path:'hiringReports', component:HiringReportsComponent, 
  data:{
    text:'Hiring Report',
    path:'/hiringReports',
    nav:true,
    breadcrumbs:true
  }
}]
@NgModule({
  declarations: [
    FinanceReportsComponent, 
    MonitoringReportsComponent, 
    CustomerReportsComponent, 
    BellboyReportsComponent, TableComponent, TablePaginationComponent, HiringReportsComponent
  ],
  imports: [
    NgbModule,
    CommonModule,
    TimeConvertModule,
    DateRangeButtonModule,
    RouterModule.forChild(routes)
  ]
})
export class ReportsModule { }