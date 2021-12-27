import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { sweetAlert, url } from 'app/shared/services/global';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CommissionsService {

  constructor(private http:HttpClient) { }

  getCommission(){
    return this.http.get(url+'api/admin/commission/current').
    pipe(
      map((res:any)=>{
        return res.data;
      })
    )
  }
  changeCommission(obj){
    return this.http.post(url+'api/admin/commission/add', obj).pipe(
      tap((res:any)=>{
        if(res.success == true){
          sweetAlert('success', 'Updated Successfully')
        }else{
          sweetAlert('warning', res.message)
        }
      }, error=>{sweetAlert('error', error)})
    )
  }
<<<<<<< HEAD
  getEarnings(page){
    return this.http.get(url+'api/admin/app_earning?pageNo='+page);
  }

  totalEarnings(){
   return this.http.get(url+'api/admin/app_earning/total').pipe(
     map((res:any)=>{
      return res.data;
     })
   )
  }

  getEarningsByWeek(){
    return this.http.get(url+'api/admin/app_earning/byWeek')
  }

  getEarningsByMonth(){
    return this.http.get(url+'api/admin/app_earning/byMonth')
  }

  getEarningsByYear(){
    return this.http.get(url+'api/admin/app_earning/byYear')
  }
=======
>>>>>>> webfix/bellboy-copy
}
