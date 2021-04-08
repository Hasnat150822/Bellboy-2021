import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { sweetAlert, url } from 'app/shared/services/global';
import { GlobalService } from 'app/shared/services/global-service.service';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { VersionList } from '../model/version-list';
var getAuth; var postAuth;
@Injectable()
export class VersionControlService {

  constructor(private gs:GlobalService, private http:HttpClient) { 
    this.gs.token.subscribe((res: any) => {
      let token = res;
      getAuth = {
        headers: new HttpHeaders({
          'Authorization': 'bearer ' + token
        })
      }
      postAuth = {
        headers: new HttpHeaders({
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': 'bearer ' + token
        })
      }
    })
  }

  getVersionList():Observable<VersionList>{
    return this.http.get<VersionList>(url+'api/admin/version', getAuth).pipe(
      map((res:any)=>{
        return res.data;
      })
    )
  }

  addVersion({version, title, description}){
    let body = new HttpParams()
    .set('version', version)
    .set('title', title)
    .set('description', description);
    return this.http.post(url+'api/admin/version', body.toString() ,postAuth)
    .pipe(
      tap((res:any)=>{
        if(res.success){
          sweetAlert('success', 'Version Added Successfully');
        }else{
          sweetAlert('warning', res.message);
        }
      }, error=>sweetAlert('error', error.error.message))
    );
  }

  changeStatus(id){
    return this.http.put(url+'api/admin/version/activate/'+id, '',postAuth).pipe(
      tap((res:any)=>{
        if(res.success)
          sweetAlert('success', 'Version is Activated');
        else  
          sweetAlert('warning', res.message);
      }, error=>{
        sweetAlert('error', error.error.message);
      })
    )
  }
}