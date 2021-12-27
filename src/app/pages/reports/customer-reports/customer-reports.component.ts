import { Component, OnInit } from '@angular/core';
<<<<<<< HEAD
import { CustomersService } from 'app/pages/customers/customers.service';
import { downLoadFile } from 'app/shared/services/global';
import { PagerService } from 'app/shared/services/pager.service';
=======
>>>>>>> webfix/bellboy-copy
import { ReportsService } from '../reports.service';

@Component({
  selector: 'app-customer-reports',
  templateUrl: './customer-reports.component.html',
  styleUrls: ['./customer-reports.component.css']
})
export class CustomerReportsComponent implements OnInit {
<<<<<<< HEAD
  page:number = 1;
  pager = {};
  customerData;
  status:string = ' ';
  fromDate:string; 
  toDate:string;
  otherParams:string;
  totalCustomersHeadins = [
    "ID", "Name", "Email", "Gender", "Status", "Total Logins", "Mobile", "Last Seen", "Joining Date", "Total Hiring"
  ]
  constructor(
    private service:ReportsService, 
    private custService:CustomersService,
    private pagerService:PagerService) { }

  ngOnInit(): void {
    this.getCustomers();
  }

getTotalCustomers(){
  this.service.getCustomerTotalReports(this.status, this.fromDate, this.toDate, this.otherParams)
  .subscribe((response:any)=>{
    downLoadFile(response, 'Customer')
  })
}

getCustomers(){
  this.custService.getCustomers('', '', this.status, 1, '', 10).subscribe((res:any)=>{
    let tableRowData = [];
    res.data.customers.forEach((el:any, i)=>{
      tableRowData.push(this.generateArray(el));
    })
    this.customerData = tableRowData; 
    this.pager = this.pagerService.getPager(res.data.count, this.page, 10)
  });
}

getByDefualt(){
  this.status = undefined;
  this.otherParams = undefined;
  this.fromDate = undefined;
  this.toDate = undefined;
  this.custService.dateObject.next({});
  this.custService.otherParams.next(undefined);
  this.getCustomers();
}

getByStatus(value, type){
  this.fromDate = undefined;
  this.toDate = undefined;
  this.custService.dateObject.next({})
  switch (type) {
    case 'status':
        this.status = '&'+value;
        this.custService.otherParams.next(undefined)
      break;
    case 'other':
        this.otherParams = '&'+value;
        this.custService.otherParams.next(this.otherParams)
      break;
  }
  this.getCustomers();
}

getTodayCustomers(){
  let date = new Date();
  this.fromDate = date.toISOString().split('T')[0];
  this.toDate = date.toISOString().split('T')[0];
  this.custService.dateObject.next({
    fromDate:this.fromDate,
    toDate:this.toDate
  });
  this.getCustomers();
}

generateArray(el){
  return [
    {
      type:'default',
      value:el._id
    }, 
    {
      type:'default',
      value:el.name
    },
    {
      type:'default',
      value:el.email
    }, 
    {
      type:'default',
      value:el.gender
    },
    {
      type:'bbStatus',
      value:el.status
    },
    {
      type:'default',
      value:el.total_logins
    }, 
    {
      type:'default',
      value:el.mobile
    }, 
    {
      type:'date',
      value:el.last_seen
    }, 
    {
      type:'date',
      value:el.created_at
    }, 
      {
      type:'default',
      value:el.total_hirings
    }
  ]
}

getDate($event){
  this.custService.dateObject.next($event);
  this.getCustomers();
}
getPager($event){

=======

  constructor(private service:ReportsService) { }

  ngOnInit(): void {
  }
getCustomerByDevice(status){
  this.service.getReportsByDevice(status).subscribe((res:any)=>{
    this.downLoadFile(res, res.type)
  });
}
downLoadFile(data: any, type: string) {
  let dataType = type;
  let binaryData = [];
  binaryData.push(data);
  let downloadLink = document.createElement('a');
  downloadLink.href = window.URL.createObjectURL(new Blob(binaryData, {type: dataType}));
  downloadLink.setAttribute('download', `Customer Report`);
  document.body.appendChild(downloadLink);
  downloadLink.click();
>>>>>>> webfix/bellboy-copy
}
}