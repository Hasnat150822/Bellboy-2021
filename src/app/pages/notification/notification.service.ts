import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { url } from 'app/shared/services/global';
import { GlobalService } from 'app/shared/services/global-service.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Notific } from './model';
var getAuth;
@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private gs:GlobalService, private http:HttpClient) {
    this.gs.token.subscribe((res)=>{
      let token = res;
      getAuth = {
        headers: new HttpHeaders({
          'Authorization': 'bearer ' + token
        })
      }
    })
}
   getNotifications(perPage, page):Observable<Notific>{
    return this.http.get<Notific>(url+'api/admin/notification/getNotification?perPage='+perPage+'&page='+page, getAuth)
    .pipe(
      map((res:any)=>{
        return res.data;
      })
    );
   }
}