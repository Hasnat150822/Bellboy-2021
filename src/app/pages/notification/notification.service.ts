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
   getNotifications(perPage, page):Observable<Notific>{
    return this.http.get<Notific>(url+'api/admin/notification/getNotification?perPage='+perPage+'&page='+page)
    .pipe(
      map((res:any)=>{
        return res.data;
      })
    );
   }
}