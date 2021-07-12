import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { sweetAlert, url } from 'app/shared/services/global';
var postAuth;
@Injectable({
  providedIn: 'root'
})
export class HiringActionsService {
  _url = url;
  constructor(private http:HttpClient, private modalService:NgbModal) {
      postAuth = {
        headers:new HttpHeaders({
          'Content-Type':'application/x-www-form-urlencoded'
        })
      }
  }
  getMainhiring(status){
    return this.http.get(this._url+'api/admin/hiring-main-action-type?status='+status);
  }
  getHiringActions(status){
    return this.http.get(this._url+'api/admin/hiring-action-type?status='+status)
  }
  getSubActions(id, status){
    return this.http.get(this._url+'api/admin/hiring-main-action-type/'+id+'?status='+status)
  }
  addHiringActions(form, icon, type){
    let formData:FormData = new FormData();
    let observable;
    formData.append('title', form.title);
    formData.append('description', form.desc);
    formData.append('type', form.category);
    formData.append('icon', icon);
    if(type=='create'){
      observable = this.http.post(this._url+'api/admin/hiring-action-type', formData)
    }else{
      observable = this.http.put(this._url+'api/admin/hiring-action-type', formData)
    }
    return observable
    .pipe(
      map((res:any)=>{
        if(res.success == true){
          sweetAlert('success', 'Added')
        }else{
          sweetAlert('error', res.msg)
        }
        return res
      }, error=>{
        sweetAlert('error', error.error.msg)
      })
    )
  }
  assignLabel(hiringActionType,label,locale){
    let body = new HttpParams()
    .set('label', label)
    .set('hiringActionType', hiringActionType)
    .set('locale', locale)
    return this.http.post(this._url+'api/admin/hiring-action-type/assignLabel', body.toString(), postAuth)
    .pipe(
      map((res:any)=>{
        if(res.code == 200){
          sweetAlert('success', 'Label Successfully Added')
          this.modalService.dismissAll();
        }else{
          sweetAlert('error', res.msg)
          this.modalService.dismissAll();
        }
        return res;
      }, error=>{
        sweetAlert('error', error.error.msg);
        this.modalService.dismissAll();
      })
    )
  }
  changeStatus(status, id){
    let formData:FormData = new FormData();
    formData.append('status', status)
    formData.append('action_type_id', id)
    return this.http.put(this._url+'api/admin/hiring-action-type', formData).pipe(
      tap(()=>{
        sweetAlert('success', 'Status is Changed');
      }, error=>{
        sweetAlert('error', error.error.msg);
      })
    )
  }
}