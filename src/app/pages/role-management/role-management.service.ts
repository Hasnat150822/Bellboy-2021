import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { sweetAlert, url } from 'app/shared/services/global';
var postAuth;
@Injectable({
  providedIn: 'root'
})
export class RoleManagementService {
  _url = url;
  constructor(private http:HttpClient) { 
      postAuth = {
        headers:new HttpHeaders({
          'Content-Type':'application/x-www-form-urlencoded'
        })
      }
  }
  getRole(){
    return this.http.get(this._url+'api/admin/role')
  }
  createRole(title, permission){
    let body = new HttpParams()
    .set('title', title)
    .set('permissions', permission);
    return this.http.post(this._url+'api/admin/role', body.toString(), postAuth)
  }
  updateRole(id, title, permissions){
    let body = new HttpParams()
    .set('_id', id)
    .set('title', title)
    .set('permissions', permissions)
    return this.http.put(this._url+'api/admin/role', body.toString(), postAuth)
    .pipe(
      map((res:any)=>{
        if(res.success == true){
          sweetAlert('success', 'Updated')
        }else{
          sweetAlert('warning', res.message)
        }
      }, error=>{
        sweetAlert('error', error.error.message)
      })
    )
  }
}