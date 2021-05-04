import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { url } from 'app/shared/services/global';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ReportsService {

  constructor(private http:HttpClient) { }

  getReportsByDevice(status){
    return this.http.get(url+'api/admin/reports/customer/reportByDevice?device='+status, {responseType: 'blob' as 'json', headers:{
      'Content-Type':'application/json'
    }});
  }

  getFinanceREport(){
    return this.http.get(url+'api/admin/dashboard/totalRecords').pipe(
      map((res:any)=>{
        return res.data;
      })
    )
  }
}