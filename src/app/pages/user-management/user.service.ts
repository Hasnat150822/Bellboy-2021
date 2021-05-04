import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { sweetAlert, url } from 'app/shared/services/global';
var postAuth;
@Injectable({
  providedIn: 'root'
})
export class UserService {
  _url = url;
  constructor(private http:HttpClient) {
      postAuth = {
        headers:new HttpHeaders({
          'Content-Type':'application/x-www-form-urlencoded'
        })
      }
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
        return this.http.get(this._url+'api/admin/user?name='+keyword+'&status='+status);
        break;
      case 'Cell No':
        return this.http.get(this._url+'api/admin/user?contact_number='+keyword+'&status='+status);
        break;
      default:
        return this.http.get(this._url+'api/admin/user?_id='+keyword+'&status='+status)
        break;
    }
  }
  getBlockeduser(){
    return this.http.get(this._url+'api/admin/user?status=false')
  }
  getById(id){
    return this.http.get(this._url+'api/admin/user/'+id)
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
    return this.http.put(this._url+'api/admin/user', formData).pipe(
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
