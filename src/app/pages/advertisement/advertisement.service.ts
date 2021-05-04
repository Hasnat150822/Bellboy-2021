import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { sweetAlert, url } from 'app/shared/services/global';
@Injectable({
  providedIn: 'root'
})
export class AdvertisementService {
  _url = url;
  public onError: Subject<string> = new Subject();
  public allAdvert = new Subject<any>();
  constructor(private http:HttpClient) { 
  }
  postAdvertisement(icon){
    let formData:FormData = new FormData();
    formData.append('image', icon);
    return this.http.post(this._url+'api/admin/advertisement', formData).pipe(
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
    return this.http.get(this._url+'api/admin/advertisement'+status+month).pipe(
      map((res:any)=>{
        return res.data;
      })
    );

  }
  changeStatus(status, id){
    let body:FormData = new FormData();
    body.append('status', status);
    body.append('_id', id);
    return this.http.put(this._url+'api/admin/advertisement', body)
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
    return this.http.delete(url+'api/admin/advertisement/'+id)
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