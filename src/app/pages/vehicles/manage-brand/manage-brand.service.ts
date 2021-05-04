import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { sweetAlert, url } from 'app/shared/services/global';
@Injectable({
  providedIn: 'root'
})
export class ManageBrandService {
  _url= url;
  constructor(private http:HttpClient) {
   }
  getBrand(){
    return this.http.get(this._url+'api/admin/vehicleBrand')
  }
  addBrand(title, icon, vehicleTypes){
    let formdata:FormData = new FormData()
    formdata.append('title', title)
    formdata.append('icon', icon)
    formdata.append('vehicleTypes', vehicleTypes)
    return this.http.post(this._url+'api/admin/vehicleBrand', formdata).pipe(
      tap((res:any)=>{
        if(res.success == true){
          sweetAlert('success', 'Added');
        }else{
          sweetAlert('warning', res.message);
        }
      },error=>{
        sweetAlert('error', error.error.message);
      })
    )
  }
  getBrandById(id){
    return this.http.get(this._url+'api/admin/vehicleBrand/'+id)
  }
}