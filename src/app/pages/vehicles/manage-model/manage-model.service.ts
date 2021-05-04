import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { sweetAlert, url } from 'app/shared/services/global';
var postAuth;
@Injectable({
  providedIn: 'root'
})
export class ManageModelService {

  constructor(private http:HttpClient) {
      postAuth = {
        headers:new HttpHeaders({
          'Content-Type':'application/x-www-form-urlencoded'
        })
      }
   }
  _url = url;
  getVehicleModal(){
   return this.http.get(this._url+'api/admin/vehicleModel');
  }
  addVehicleModal(title, vehicleBrand, vehicleType){
    let body = new HttpParams()
    .set('title', title)
    .set('vehicleBrand', vehicleBrand)
    .set('vehicleType', vehicleType)
    return this.http.post(this._url+'api/admin/vehicleModel' , body.toString(), postAuth).pipe(
      tap((res:any)=>{
        if(res.success == true){
          sweetAlert('success', 'Added');
        }else{
          sweetAlert('warning', res.message);
        }
      },error=>{
        sweetAlert('error', error.error.message)
      })
    );
  }
  getVehicleModelById(id){
    return this.http.get(this._url+'api/admin/vehicleModel/'+id);
  }
}