import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { url } from 'app/shared/services/global';
import { GlobalService } from 'app/shared/services/global-service.service';
import { map } from 'rxjs/operators';
@Injectable()
export class DashboardService {
  constructor(private http:HttpClient) { 
  }
  getGraphRecord(startDate, endDate){
    return this.http.get(url+'api/admin/dashboard/graphdata?startDateForGraph='+startDate+'&endDateForGraph='+endDate)
    .pipe(
      map((res:any)=>{
        return res.data.graph;
      })
    );
  }
  getDaysRecord(startDate, endDate){
    let urlString = '';
    if(startDate && endDate){
      urlString = '?startDateForRecords='+startDate+'&endDateForRecords'+endDate;
    }
    return this.http.get(url+'api/admin/dashboard/days_records'+urlString)
    .pipe(
      map((res:any)=>{
        return res.data.total;
      })
    );
  }
  getDetailRecord(startDate, endDate){
    let urlString = '';
    if(startDate && endDate){
      urlString = '?startDateForRecords='+startDate+'&endDateForRecords'+endDate;
    }
    return this.http.get(url+'api/admin/dashboard/detailsData'+urlString)
    .pipe(
      map((res:any)=>{
        return res.data;
      })
    );
  }
}