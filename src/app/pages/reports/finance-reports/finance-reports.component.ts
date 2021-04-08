import { Component, OnInit } from '@angular/core';
import { DashboardService } from 'app/pages/dashboard/dashboard.service';

@Component({
  selector: 'app-finance-reports',
  templateUrl: './finance-reports.component.html',
  styleUrls: ['./finance-reports.component.scss'],
  providers:[DashboardService]
})
export class FinanceReportsComponent implements OnInit {
  totalRecords:{};
  spinner:boolean;
  constructor(private dashboardService:DashboardService) {

  }

  ngOnInit() {
    this.getTotalRecord();
  }

  getTotalRecord(){
    this.spinner = true;
    this.dashboardService.getDashboardRecord('', '', '', '')
    .subscribe((res:any)=>{
      this.totalRecords = res.total;
      this.spinner = false;
    })
  }
}
