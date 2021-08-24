import { CanActivate, Router } from '@angular/router';
import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import Swal from 'sweetalert2';
import { GlobalService } from '../services/global-service.service';
import { getPath } from './first-path.modal';
import { MessagingService } from '../services/messaging.service';
import { url } from '../services/global';
import { AngularFireAuth } from '@angular/fire/auth';
var httpOption = {
  headers:new HttpHeaders({
    'Content-Type':'application/x-www-form-urlencoded'
  })
}
@Injectable()
export class AuthGuard implements CanActivate, OnInit {
  _url = url;
  constructor(private router:Router, private http:HttpClient, private gs:GlobalService, private messagingService:MessagingService, 
    private fauth:AngularFireAuth) {
  }
  ngOnInit(){
  }
  canActivate() {
    let token = localStorage.getItem('token');
    if(token!=null){
      return true
    }else{
      this.router.navigate(['/'])
    }
  }
  loginUser(obj){  
    return new Promise((resolve)=>{
      let body = new HttpParams()
      .set('email',obj.email)
      .set('password', obj.pass)
      this.http.post(this._url+'api/admin/auth/login', body,httpOption).subscribe((res:any)=>{
        if(res.success === true){
          localStorage.setItem('userId', res.data.user._id);
          localStorage.setItem('token', res.data.token);
          resolve(res.data) 
          this.messagingService.fcmToken.subscribe((res:any)=>{
            if(res!=null || res !== undefined){
              this.gs.registerFcmToken(res);
            }
          })
          localStorage.setItem('Permissions', JSON.stringify(res.data.user.role.permissions));
          let permissions = res.data.user.role.permissions[0]
          let path  = getPath(permissions);
          this.router.navigateByUrl(path)
        }
      }, error=>{
        Swal.fire({
          icon:'error',
          title:error,
          width:'400px',
          timer:2500,
          showConfirmButton:false
        })
      })
    })
  }
  firebaseLogin(obj){
    this.fauth.auth.signInWithEmailAndPassword(obj.email, obj.pass)
    .then((user)=>{
    }).catch(()=>{
    })
  }
  firebaseSignup(obj){
    this.fauth.auth.createUserWithEmailAndPassword(obj.email, obj.pass)
    .then((user)=>{
    })
    .catch()
  }
}
@Injectable()
export class LogOutUser implements CanActivate {

  constructor(private router:Router) {
  }
  canActivate() {
    let token = localStorage.getItem('token');
    if(token==null || token === undefined){
      return true
    }else{    
      let perm = JSON.parse(localStorage.getItem('Permissions'))
      let path = getPath(perm[0]);
      this.router.navigateByUrl(path);
    }
  }
}