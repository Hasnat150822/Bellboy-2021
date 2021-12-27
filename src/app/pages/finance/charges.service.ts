import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';
import { sweetAlert, url } from 'app/shared/services/global';
var postAuth;
@Injectable({
  providedIn: 'root'
})
export class ChargesService {
  actionType:string;
  constructor(private http:HttpClient) {
      postAuth = {
        headers:new HttpHeaders({
          'Content-Type':'application/x-www-form-urlencoded'
        })
      }
   }
   allData:any = {
     service:[], fuel:[], time:[], waiting:[]
   }
   bellboyTypeObj = {
     walkerId:'', cyclerId:'', carId:'', bikerid:''
   }
   _url = url;
   getCharges(actionType){
     this.actionType = actionType;
    return this.http.get(this._url+'api/admin/charges?action_type='+actionType).pipe() 
  }
  getBBType(){
    return this.http.get(this._url+'api/admin/bellboy-type').pipe(
      map((res:any)=>{
        res.data.bellBoyTypes.map((res)=>{
          switch (res._id) {
            case '5ee08bd469e94f28a37dadc8':
              this.bellboyTypeObj.walkerId = '5ee08bd469e94f28a37dadc8'
              break;
            case '5ee08bee69e94f28a37dadcc':
              this.bellboyTypeObj.cyclerId = '5ee08bee69e94f28a37dadcc'
              break;
            case '5ee08bcb69e94f28a37dadc6':
              this.bellboyTypeObj.carId = '5ee08bcb69e94f28a37dadc6'
              break;
            case '5f5da852abd69550176fad72':
              this.bellboyTypeObj.bikerid = '5f5da852abd69550176fad72'
              break;
            default:
              break;
          }
        })
        return this.bellboyTypeObj
      })
    )
  }
  updateDelCharges(value, action_type, charges_type, bellboy_type){
    let body = new HttpParams()
    .set('value', value)
    .set('action_type', action_type)
    .set('charges_type', charges_type)
    .set('bellboy_type', bellboy_type)
    return this.http.post(this._url+'api/admin/charges', body.toString(), postAuth).pipe(
      tap((res:any)=>{
        if(res.success){
          sweetAlert('success', 'Updated')
        }else{
          sweetAlert('warning', res.message)
        }
      },error=>{
        sweetAlert('error', error)
      })
    )
  }
  getTimeLine(chargesType, bellboy_type, status){
    var path:string;
    if (status == '') {
      path = this._url+'api/admin/charges/history?action_type='+this.actionType+'&charges_type='+chargesType+'&bellboy_type='+bellboy_type;
    }else{
      path = this._url+'api/admin/charges/history?action_type='+this.actionType+'&charges_type='+chargesType+'&bellboy_type='+bellboy_type+'&status='+status;
    }
   return this.http.get(path).pipe(
      map((res:any)=>{
        return res.data;
      })
    )
  }
}