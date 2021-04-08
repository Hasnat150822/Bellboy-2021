import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GlobalService } from 'app/shared/services/global-service.service';
import { tap } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { url } from 'app/shared/services/global';
var getAuth; var postAuth;
@Injectable({
  providedIn: 'root'
})
export class ManageBrandService {
  _url= url;
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
  getBrand(){
    return this.http.get(this._url+'api/admin/vehicleBrand', getAuth)
  }
  addBrand(title, icon, vehicleTypes){
    let formdata:FormData = new FormData()
    formdata.append('title', title)
    formdata.append('icon', icon)
    formdata.append('vehicleTypes', vehicleTypes)
    return this.http.post(this._url+'api/admin/vehicleBrand', formdata, getAuth).pipe(
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
    return this.http.get(this._url+'api/admin/vehicleBrand/'+id, getAuth)
  }
}
function sweetAlert(icon, message) {
  Swal.fire({
    icon:icon,
    text:message,
    width:'300px',
    timer:2500,
    showCancelButton:false,
    showConfirmButton:false
  })
}