import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError, filter, map, retry, tap } from 'rxjs/operators';
import { sweetAlert, url } from 'app/shared/services/global';
import { BellboyHirings } from './modals/bellboy-hirings';
import { Observable, throwError } from 'rxjs';
var postAuth;
@Injectable({
  providedIn: 'root'
})
export class BellboyService {
  _url = url;
  constructor(private http:HttpClient) {
    postAuth = {
      headers:new HttpHeaders({
        'Content-Type':'application/x-www-form-urlencoded'
      })
    }
   }
  getAllBellboy(page, perPage, status,searchType, query){
    let url = this._url+'api/admin/bellboy/?status='+status+'&&perPage='+perPage+'&pageNo='+page;
    if(query!==undefined){
      url = url+'&'+searchType+'='+query;
    }
    return this.http.get(url).pipe(
      map((res:any)=>{
        if(res.success == true){
          return res.data
        }
      })
    );
  }
  getById(id){
    return this.http.get(this._url+'api/admin/bellboy/'+id)
  }
  manageStatusbellboy(id, status){
    let body = new HttpParams()
    .set('bellboy', id)
    .set('status', status)
    return this.http.put(this._url+'api/admin/bellboy/toggle', body.toString(), postAuth)
    .pipe(tap((res:any)=>{
      if(res.success == true){
        sweetAlert('success', 'Done');
      }else{
        sweetAlert('warning', res.message);
      }
    }, error=>{
      sweetAlert('error', error);
    }));
  }
  manageNIC(status, userId){
    let body = new HttpParams()
    .set('status', status)
    .set('userId', userId)
    return this.http.post(this._url+'api/admin/bellboy/approveNIC', body.toString(), postAuth).pipe(
      tap((res:any)=>{
        if(res.success==true){
          sweetAlert('success', 'Done');
        }else{
          sweetAlert('warning', res.message)
        }
      }, error=>{
          sweetAlert('error', error)
      })
    )
  }
  manageLicense(status, userId){
    let body = new HttpParams()
    .set('status', status)
    .set('userId', userId)
    return this.http.post(this._url+'api/admin/bellboy/approveDrivingLicense', body.toString(), postAuth).pipe(
      tap((res:any)=>{
        if(res.success==true){
          sweetAlert('success', 'Done');
        }else{
          sweetAlert('warning', res.message)
        }
      }, error=>{
          sweetAlert('error', error)
      })
    )
  }
  getBellboysHirings(id, page, perpage):Observable<BellboyHirings>{
    return this.http.get<BellboyHirings>(url+"api/admin/bellboy/completedOrder/"+id+"?pageNo="+page+"&perPage="+perpage)
    .pipe(
      map((res:any)=>{
        return res;
      })
    )
  }
  getBellboyOnlineHistory(id, type){
    return this.http.get(url+'api/admin/bellboy/getBellboyActivity/'+id+'?by='+type+'').pipe(
      map((res:any)=>{
        return res.data.activity
      })
    )
  }
  getBellboyOnlineActivity(id){
    return this.http.get(url+'api/admin/bellboy/bellboyactivity/'+id).pipe(
      map((res:any)=>{
        return res
      })
    )
  }
}