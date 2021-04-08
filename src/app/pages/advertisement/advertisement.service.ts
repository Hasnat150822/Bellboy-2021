import { Injectable } from '@angular/core';
import { GlobalService } from 'app/shared/services/global-service.service';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import { map } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { url } from 'app/shared/services/global';
var getAuth;
@Injectable({
  providedIn: 'root'
})
export class AdvertisementService {
  _url = url;
  public onError: Subject<string> = new Subject();
  public allAdvert = new Subject<any>();
  constructor(private gs:GlobalService, private http:HttpClient) { 
    this.gs.token.subscribe((res:any)=>{
      let token = res;
      getAuth = {
        headers:new HttpHeaders({
          'Authorization':'bearer '+token
        })
      }
    })
  }
  postAdvertisement(icon){
    let formData:FormData = new FormData();
    formData.append('image', icon);
    return this.http.post(this._url+'api/admin/advertisement', formData, getAuth).pipe(
      map((res:any)=>{
        if(res.success == true){
          sweetalert('success', 'Added Successfully');
        }else{
          sweetalert('warning', res.message);
        }
      }, error=>{
        sweetalert('error', error.error.message);
      })
    )
  }
  getAdvertisement(status){
    if(status!=null){
      return this.http.get(this._url+'api/admin/advertisement?status='+status, getAuth).pipe(
        map((res:any)=>{
          return res.data;
        })
      );
    }else{
      return this.http.get(this._url+'api/admin/advertisement', getAuth).pipe(
        map((res:any)=>{
          return res.data;
        })
      );
    }

  }
  changeStatus(status, id){
    let body:FormData = new FormData();
    body.append('status', status);
    body.append('_id', id);
    return this.http.put(this._url+'api/admin/advertisement', body, getAuth)
    .pipe(map((res:any)=>{
      if(res.success == true){
        sweetalert('success', 'Updated Successfully');
      }else{
        sweetalert('warning', res.message);
      }
    }, error=>{
      sweetalert('error', error.error.message);
    }))
  }
}
function sweetalert(icon, text){
  Swal.fire({
    icon:icon,
    text:text,
    width:'300px',
    timer:2500,
    showConfirmButton:false
  })
}