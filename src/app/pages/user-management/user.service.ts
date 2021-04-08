import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { GlobalService } from 'app/shared/services/global-service.service';
import { sweetAlert, url } from 'app/shared/services/global';
var getAuth; var postAuth;
@Injectable({
  providedIn: 'root'
})
export class UserService {
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
  addUser(obj){
    let body = new HttpParams()
    .set('name', obj.name)
    .set('email', obj.email)
    .set('contact_number', obj.cellno)
    .set('password', obj.pass)
    .set('role', obj.role)
    return this.http.post(this._url+'api/admin/auth/register', body, postAuth)
  }
  getUsers(keyword, status, type){
    switch (type) {
      case 'Name':
        return this.http.get(this._url+'api/admin/user?name='+keyword+'&status='+status, getAuth);
        break;
      case 'Cell No':
        return this.http.get(this._url+'api/admin/user?contact_number='+keyword+'&status='+status, getAuth);
        break;
      default:
        return this.http.get(this._url+'api/admin/user?_id='+keyword+'&status='+status, getAuth)
        break;
    }
  }
  getBlockeduser(){
    return this.http.get(this._url+'api/admin/user?status=false', getAuth)
  }
  getById(id){
    return this.http.get(this._url+'api/admin/user/'+id, getAuth)
  }
  updateUser(obj,_id, status){
    let formData = new FormData()
    if(obj!= ''){
      if(obj.name)
        formData.append('name', obj.name)
      if(obj.email)
        formData.append('email', obj.email)
      if(obj.cellNo)
        formData.append('contact_number', obj.cellNo)
      if(obj.pass)
        formData.append('password', obj.pass)
      if(obj.roleId)
        formData.append('role', obj.roleId)
      if(_id)
        formData.append('_id', _id)
      if(status)
        formData.append('status', status)
      if(obj.image)
      formData.append('image', obj.image)
    }else{
      formData.append('_id', _id)
      formData.append('status', status)
    }
    return this.http.put(this._url+'api/admin/user', formData, getAuth).pipe(
      map((res:any)=>{
        if(res.success == true){
          sweetAlert('success', 'Updated');
        }else{
          sweetAlert('warning', res.message);
        }
        return res
      }, error=>{
        sweetAlert('error', error.error.message)
        return error
      })
    )
  }
}
