import { Injectable } from '@angular/core';
import { GlobalService } from 'app/shared/services/global-service.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { url } from 'app/shared/services/global';
var postAuth;
var getAuth;
@Injectable({
  providedIn: 'root'
})
export class BellboyTrackingService {
  _url = url;
  constructor(private gs:GlobalService, private http:HttpClient) {
    this.gs.token.subscribe((res:any)=>{
      getAuth = {  
        headers:{
          'Authorization':'bearer '+res
        }
      }
      postAuth = {
        headers:{
          'Authorization':'bearer '+res,
          'Content-Type':'application/x-www-form-urlencoded'
        }
      }
    })
   }
}