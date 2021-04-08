import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import Swal from 'sweetalert2';
import { map, tap } from 'rxjs/operators';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GlobalService } from 'app/shared/services/global-service.service';
import { url } from 'app/shared/services/global';
var getAuth; var postAuth;
@Injectable({
  providedIn: 'root'
})
export class HiringActionsService {
  _url = url;
  constructor(private http:HttpClient, private modalService:NgbModal, private gs:GlobalService) {
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
  getHiringActions(status){
    return this.http.get(this._url+'api/admin/hiring-action-type?status='+status, getAuth)
  }
  addHiringActions(form, icon){
    let formData:FormData = new FormData();
    formData.append('title', form.title);
    formData.append('description', form.desc);
    formData.append('icon', icon);
    return this.http.post(this._url+'api/admin/hiring-action-type', formData, getAuth)
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
    return this.http.put(this._url+'api/admin/hiring-action-type', formData, getAuth).pipe(
      tap(()=>{
        sweetAlert('success', 'Status is Changed');
      }, error=>{
        sweetAlert('error', error.error.msg);
      })
    )
  }
}
function sweetAlert(icon, message) {
  Swal.fire({
    icon:icon,
    text: message,
    width:'400px',
    timer:2500,
    showConfirmButton:false
  })
}