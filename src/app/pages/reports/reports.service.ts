import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { url } from 'app/shared/services/global';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ReportsService {

  constructor(private http:HttpClient) { }

  getFinanceREport(){
    return this.http.get(url+'api/admin/dashboard/totalRecords').pipe(
      map((res:any)=>{
        return res.data;
      })
    )
  }
  getBellboyTotalReports(status, fromDate, toDate, otherParams){
    let baseUrl = 'api/admin/reports/bellboy/total?'+status;
    if(fromDate && toDate)
      baseUrl= baseUrl+'&startdate='+fromDate+'&enddate='+toDate;
    if(otherParams){
      baseUrl= 'api/admin/reports/bellboy/total?'+otherParams;  
      if(fromDate && toDate)
        baseUrl= baseUrl+'&startdate='+fromDate+'&enddate='+toDate;
    }
    return this.http.get(url+baseUrl).pipe(
      map((res:any)=>{
        return res.data.download;
      })
    )
  }
  getHiringTotalReport(fromDate, toDate, otherParams, hiringType, isSpecificBellboy){
    let baseUrl = `api/admin/reports/${hiringType}/total?`;
    if(isSpecificBellboy){
      baseUrl = `api/admin/reports/${hiringType}/specificbellboy/${isSpecificBellboy}?`
    }
    if(fromDate && toDate)
      baseUrl= baseUrl+'&startdate='+fromDate+'&enddate='+toDate;
    if(otherParams!==undefined)
      baseUrl= baseUrl+'&'+otherParams;  
    return this.http.get(url+baseUrl).pipe(
      map((res:any)=>{
        return res.data.download;
      })
    )
  }

  getCustomerTotalReports(status, fromDate, toDate, otherParams){
    let baseUrl = 'api/admin/reports/customer/total?';
    if(fromDate && toDate)
      baseUrl= baseUrl+'&startdate='+fromDate+'&enddate='+toDate;
    if(otherParams){
      baseUrl= 'api/admin/reports/customer/total?'+otherParams;  
      if(fromDate && toDate)
        baseUrl= baseUrl+'&startdate='+fromDate+'&enddate='+toDate;
    }
    if(status)
      baseUrl = baseUrl+status;
    return this.http.get(url+baseUrl).pipe(
      map((res:any)=>{
        return res.data.download;
      })
    )
  }
}