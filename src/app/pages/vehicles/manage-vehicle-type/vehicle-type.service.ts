import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { GlobalService } from 'app/shared/services/global-service.service';
import { url } from 'app/shared/services/global';
var getAuth; var postAuth;
@Injectable({
  providedIn: 'root'
})
export class VehicleTypeService {
  _url = url;
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
  getVehicleType(){
    return this.http.get(this._url+'api/admin/vehicleType', getAuth)
  }
  vehicleTyeDetail(id){
    return this.http.get(this._url+'api/admin/vehicleType/'+id, getAuth)
  }
  addVehiceType(title, icon, hasPlate){
    let formData:FormData = new FormData()
    formData.append('title', title)
    formData.append('icon', icon)
    formData.append('hasPlate', hasPlate)
    return this.http.post(this._url+'api/admin/vehicleType', formData, getAuth)
  }
}
