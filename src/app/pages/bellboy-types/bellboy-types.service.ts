import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { GlobalService } from 'app/shared/services/global-service.service';
import { url } from 'app/shared/services/global';
var getAuth;
@Injectable({
  providedIn: 'root'
})
export class BellboyTypesService {
  _url=url;
  bbTypes:any = []
  constructor(private http:HttpClient, private gs:GlobalService) { 
    this.gs.token.subscribe((res:any)=>{
      let token = res;
      getAuth = {
        headers:new HttpHeaders({
          'Authorization':'bearer '+token
        })
      }
    })
   }
  getBellboyTypes(){
  return  this.http.get(this._url+'api/admin/bellboy-type', getAuth).pipe(
      map((res:any)=>{
        res.data.bellBoyTypes.map((res:any)=>{
          switch (res._id) {
            case '5f5da852abd69550176fad72':
              this.bbTypes['MotoBiker'] = res
              break;
            case '5ee08bcb69e94f28a37dadc6':
              this.bbTypes['Car'] = res
              break;
            case '5ee08bee69e94f28a37dadcc':
              this.bbTypes['Cycler'] = res
              break;
            case '5ee08bd469e94f28a37dadc8':
              this.bbTypes['Walker'] = res
              break;
            default:
              break;
          }
        })
        return this.bbTypes
      })
    )
  }
  updateBBtype(title, icon, bellBoyType){
    let formData:FormData = new FormData()
    formData.append('title', title);
    formData.append('icon', icon);
    formData.append('bellBoyType', bellBoyType)
    return this.http.post(this._url+'api/admin/bellboy-type/update', formData, getAuth)
  }
}
