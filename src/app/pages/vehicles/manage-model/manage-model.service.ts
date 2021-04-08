import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { GlobalService } from 'app/shared/services/global-service.service';
import { tap } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { url } from 'app/shared/services/global';
var getAuth; var postAuth;
@Injectable({
  providedIn: 'root'
})
export class ManageModelService {

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
  _url = url;
  getVehicleModal(){
   return this.http.get(this._url+'api/admin/vehicleModel', getAuth);
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
    return this.http.get(this._url+'api/admin/vehicleModel/'+id, getAuth);
  }
}
function sweetAlert(icon, message) {
  Swal.fire({
    icon:icon,
    text:message,
    width:'300px',
    timer:2500,
    showConfirmButton:false,
    showCancelButton:false
  })
}