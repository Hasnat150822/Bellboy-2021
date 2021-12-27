import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { sweetAlert, url } from 'app/shared/services/global';
var postAuth;
@Injectable({
  providedIn: 'root'
})
export class ManageVehicleService {
  _url=url;
  constructor(private http:HttpClient) {
      postAuth = {
        headers:new HttpHeaders({
          'Content-Type':'application/x-www-form-urlencoded'
        })
      }
   }
  getVehicles(nextAddr){
    return this.http.get(this._url+'api/admin/vehicle'+nextAddr);
  }
  changeVehicleStatus(vehicle, approval){
    let body = new HttpParams()
    .set('vehicle', vehicle)
    .set('approval', approval)
    return this.http.post(this._url+'api/admin/vehicle/approval', body.toString(), postAuth).pipe(
      tap((res:any)=>    {
        if(res.success == true){
          sweetAlert('success', 'Done');
          return res;
        }else{
          sweetAlert('warning', res.message);
        }
      }, error=>{
        sweetAlert('error', error);
      })
    )
  }
  getVehicleById(id){
    return this.http.get(this._url+'api/admin/vehicle/'+id)
  }
  searchVehicle(number){
    return this.http.get(this._url+'api/admin/vehicle?search='+number)
  }
  searchVehicleByStatus(number, approval){
    return this.http.get(this._url+'api/admin/vehicle?approval='+approval+'&search='+number)
  }
}