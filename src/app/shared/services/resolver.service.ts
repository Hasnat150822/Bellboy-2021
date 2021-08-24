import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { url } from './global';
import { Store } from '@ngrx/store';
import { USER_NAME } from 'app/ngrx-states/model/url.model';
import * as allActions from '../../ngrx-states/actions';
@Injectable({
  providedIn: 'root'
})
export class ResolverService{
  routeInfo = new BehaviorSubject<any>([]);
  constructor(private http:HttpClient, private router:Router, private store:Store<USER_NAME>) {
   }
   currentUserCheck(){
    let id  = localStorage.getItem('userId');
    this.http.get(url+'api/admin/user/'+id).subscribe((res:any)=>{
      this.store.dispatch(new allActions.PanelUser(res.data));
      if(res.data.status == false){
        localStorage.removeItem('Permissions');
        localStorage.removeItem('userId');
        localStorage.removeItem('token');
        this.router.navigateByUrl('/');
      }else{
        localStorage.removeItem('Permisssions');
        localStorage.setItem('Permissions', JSON.stringify(res.data.role.permissions));
      }
    })
  }
   sendRouteData(root){
    if(root && root.children.length>=0){
      if(root.component){
        this.routeInfo.next(root.snapshot);
      }
      this.sendRouteData(root.children[0]);
    }
   }
}