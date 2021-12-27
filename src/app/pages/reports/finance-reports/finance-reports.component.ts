import { Component, OnInit } from '@angular/core';
<<<<<<< HEAD
import { DashboardService } from 'app/layouts/full/dashboard/dashboard.service';
=======
import { DashboardService } from 'app/pages/dashboard/dashboard.service';
>>>>>>> webfix/bellboy-copy
import { ReportsService } from '../reports.service';

@Component({
  selector: 'app-finance-reports',
  templateUrl: './finance-reports.component.html',
  styleUrls: ['./finance-reports.component.scss'],
  providers:[DashboardService]
})
export class FinanceReportsComponent implements OnInit {
  totalRecords:{};
  spinner:boolean;
  constructor(private service:ReportsService) {

  }

  ngOnInit() {
    this.getTotalRecord();
  }

  getTotalRecord(){
    this.spinner = true;
    this.service.getFinanceREport()
    .subscribe((res:any)=>{
      this.totalRecords = res;
      this.spinner = false;
    })
  }
}
