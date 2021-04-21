import { Injectable } from '@angular/core';
import { GlobalService } from 'app/shared/services/global-service.service';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { sweetAlert, url } from 'app/shared/services/global';
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
          sweetAlert('success', 'Added Successfully');
        }else{
          sweetAlert('warning', res.message);
        }
      }, error=>{
        sweetAlert('error', error.error.message);
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
        sweetAlert('success', 'Updated Successfully');
      }else{
        sweetAlert('warning', res.message);
      }
    }, error=>{
      sweetAlert('error', error.error.message);
    }))
  }
  deleteAdvert(id){
    return this.http.delete(url+'api/admin/advertisement/5f5da805abd69550176fad6f', getAuth)
    .pipe(
      tap((res:any)=>{
        if(res.success == true){
          sweetAlert('success', 'Successfully Deleted');
        }else{
          sweetAlert('warning', 'Someting went Wrong');
        }
      }, error=>sweetAlert('error', 'Someting went Wrong'))
    )
  }
}