import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { url } from 'app/shared/services/global';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Notific } from './model';
@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private http:HttpClient) {
}
   getNotifications(perPage, page, type):Observable<Notific>{
    let decodeType;
    type=='customer'?decodeType='notification':decodeType='bellboyNotification';
    return this.http.get<Notific>(url+'api/admin/'+decodeType+'/getNotification?perPage='+perPage+'&page='+page)
    .pipe(
      map((res:any)=>{
        return res.data;
      })
    );
   }
}