import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { GlobalService } from 'app/shared/services/global-service.service';
import { url } from 'app/shared/services/global';
var getAuth; var postAuth;
@Injectable({
  providedIn: 'root'
})
export class RoleManagementService {
  _url = url;
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
  getRole(){
    return this.http.get(this._url+'api/admin/role', getAuth)
  }
  createRole(title, permission){
    console.log(permission, 'permissions')
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
          Swal.fire({
            icon:'success',
            text:'Updated',
            width:'300px',
            timer:2500,
            showCancelButton:false,
            showConfirmButton:false
          })
        }else{
          Swal.fire({
            icon:'error',
            text:res.message,
            width:'300px',
            timer:2500,
            showCancelButton:false,
            showConfirmButton:false
          })
        }
      }, error=>{
        Swal.fire({
          icon:'error',
          text:error.error.message,
          width:'300px',
          timer:2500,
          showCancelButton:false,
          showConfirmButton:false
        })
      })
    )
  }
}