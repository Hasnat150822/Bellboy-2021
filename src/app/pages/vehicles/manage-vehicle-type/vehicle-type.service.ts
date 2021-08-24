import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { sweetAlert, url } from 'app/shared/services/global';
import { tap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class VehicleTypeService {
  _url = url;
  constructor(private http:HttpClient) { 
  }
  getVehicleType(){
    return this.http.get(this._url+'api/admin/vehicleType')
  }
  vehicleTyeDetail(id){
    return this.http.get(this._url+'api/admin/vehicleType/'+id)
  }
  addVehiceType(title, icon, hasPlate){
    let formData:FormData = new FormData()
    formData.append('title', title)
    formData.append('icon', icon)
    formData.append('hasPlate', hasPlate)
    return this.http.post(this._url+'api/admin/vehicleType', formData).pipe(
      tap((res:any)=>{
        if(res.status == true){
          sweetAlert('success', 'Added')
        }else{
          sweetAlert('warning', res.message)
        }
      }, error=>{
        sweetAlert('error', error)
      })
    )
  }
}
