import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { GlobalService } from 'app/shared/services/global-service.service';
import { sweetAlert, url } from 'app/shared/services/global';
var getAuth; var postAuth;
@Injectable({
  providedIn: 'root'
})
export class ManageVehicleService {
  _url=url;
  constructor(private http:HttpClient, private gs:GlobalService) {
    this.gs.token.subscribe((res:any)=>{
      let token = res;
      getAuth = {
        headers:new HttpHeaders({
          'Authorization':'bearer '+token
        })
      }
      postAuth = {
        headers:new HttpHeaders({
          'Content-Type':'application/x-www-form-urlencoded',
          'Authorization':'bearer '+token
        })
      }
    })
   }
  getVehicles(nextAddr){
    return this.http.get(this._url+'api/admin/vehicle'+nextAddr, getAuth);
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
        sweetAlert('error', error.error.message);
      })
    )
  }
  getVehicleById(id){
    return this.http.get(this._url+'api/admin/vehicle/'+id, getAuth)
  }
  searchVehicle(number){
    return this.http.get(this._url+'api/admin/vehicle?search='+number, getAuth)
  }
  searchVehicleByStatus(number, approval){
    return this.http.get(this._url+'api/admin/vehicle?approval='+approval+'&search='+number, getAuth)
  }
}