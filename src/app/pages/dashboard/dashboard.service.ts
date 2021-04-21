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
  getDashboardRecord(startDateGraph, endDateGraph, startDate, endDate){
    return this.http.get(url+'api/admin/dashboard?startDateForGraph='+startDateGraph+'&endDateForGraph='+endDateGraph+'&startDateForRecords='+startDate+'&endDateForRecords='+endDate).pipe(
      map((res:any)=>{
        return res.data;
      })
    );
  }
}