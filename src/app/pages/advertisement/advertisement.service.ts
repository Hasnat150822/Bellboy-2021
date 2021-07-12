import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { sweetAlert, url } from 'app/shared/services/global';
@Injectable({
  providedIn: 'root'
})
export class AdvertisementService {
  _url;
  public typeComponent = new Subject();
  constructor(private http:HttpClient) { 
    this.typeComponent.subscribe({
      next: (v) => {
        if(v=='customer'){
          this._url=url+'api/admin/advertisement';
        }else{
          this._url=url+'api/admin/bellboyAdvertisement';
        }
      }
    })
  }
  postAdvertisement(icon, title, desc){
    let formData:FormData = new FormData();
    formData.append('image', icon);
    if(title!==''){formData.append('title', title)}
    if(desc!==''){formData.append('description', desc)}
    return this.http.post(this._url, formData).pipe(
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
  getAdvertisement(status, year, month){
    if(status!=null){
      status = '?status='+status;
    }else{
      status = '';
    }
    if(year!==null && month!==null){
      month = '?year='+year+'&month='+month;
    }else{
      month='';
    }
    return this.http.get(this._url+status+month).pipe(
      map((res:any)=>{
        return res.data;
      })
    );

  }
  changeStatus(status, id){
    let body:FormData = new FormData();
    body.append('status', status);
    body.append('_id', id);
    return this.http.put(this._url, body)
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
    return this.http.delete(url+id)
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