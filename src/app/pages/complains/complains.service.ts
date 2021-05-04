import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { sweetAlert, url } from 'app/shared/services/global';
import { GlobalService } from 'app/shared/services/global-service.service';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Complaint } from './model/complains';
@Injectable({
  providedIn: 'root'
})
export class ComplainsService {
  url = url;
  constructor(private http:HttpClient) {
   }
   getComplaints():Observable<Complaint[]>{
     return this.http.get<Complaint[]>(this.url+'api/admin/complaint').pipe(
       map(res=>res["data"]["complaints"])
     )
   }
   deleteComp(id){
    return this.http.delete(this.url+'api/admin/complaint/'+id).pipe(
      tap((res:any)=>{
        if(res)
          return sweetAlert('success', 'Deleted Successfully');
        else  
          return sweetAlert('warning', res.message);
      })
    )
   }
}