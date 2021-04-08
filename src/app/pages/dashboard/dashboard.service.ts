import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { url } from 'app/shared/services/global';
import { GlobalService } from 'app/shared/services/global-service.service';
import { map } from 'rxjs/operators';
var getAuth;
@Injectable()
export class DashboardService {
  _url = url;
  constructor(private http:HttpClient, private gs:GlobalService) { 
    this.gs.token.subscribe((res:any)=>{
      getAuth = {
        headers:new HttpHeaders({
          'Authorization':'bearer '+res
        })
      }
    })
  }
  // getDashboard(startDate, endDate){
  //   return this.http.get(this._url+'api/admin/dashboard?startDateForGraph='+startDate+'&endDateForGraph='+endDate, getAuth).pipe(
  //     map((res:any)=>{
  //       return res.data;
  //     })
  //   );
  // }
  getDashboardRecord(startDateGraph, endDateGraph, startDate, endDate){
    return this.http.get(this._url+'api/admin/dashboard?startDateForGraph='+startDateGraph+'&endDateForGraph='+endDateGraph+'&startDateForRecords='+startDate+'&endDateForRecords='+endDate, getAuth).pipe(
      map((res:any)=>{
        return res.data;
      })
    );
  }
}