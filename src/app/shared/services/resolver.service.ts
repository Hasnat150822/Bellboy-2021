import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { url } from './global';
import { Store } from '@ngrx/store';
import { USER_NAME } from 'app/ngrx-states/model/url.model';
import * as allActions from '../../ngrx-states/actions';
var headers
@Injectable({
  providedIn: 'root'
})
export class ResolverService implements Resolve<any> {
  routeInfo = new BehaviorSubject<any>([]);
  constructor(private http:HttpClient, private router:Router, private store:Store<USER_NAME>) {
   }
   resolve(route:ActivatedRouteSnapshot, stat:RouterStateSnapshot):Observable<any>|Promise<any>|any{
    let id  = localStorage.getItem('userId');
    let token = localStorage.getItem('token');
    this.routeInfo.next(route)
    headers = {
      headers: new HttpHeaders({
        'Authorization':'Bearer '+token
      })
    }
    this.http.get(url+'api/admin/user/'+id, headers).subscribe((res:any)=>{
      this.store.dispatch(new allActions.PanelUser(res.data));
      if(res.data.status == false){
        localStorage.removeItem('Permissions');
        localStorage.removeItem('userId');
        localStorage.removeItem('token');
        this.router.navigateByUrl('/');
      }
    })
   }
}