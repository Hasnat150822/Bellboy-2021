import { Component, OnInit } from '@angular/core';
import { ReportsService } from '../reports.service';

@Component({
  selector: 'app-customer-reports',
  templateUrl: './customer-reports.component.html',
  styleUrls: ['./customer-reports.component.css']
})
export class CustomerReportsComponent implements OnInit {

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
}
}