import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { sweetAlert, url } from 'app/shared/services/global';
var postAuth;
@Injectable({
  providedIn: 'root'
})
export class HiringService {
  _url = url;
  tabStatus = new BehaviorSubject<any>('tab1')
  constructor(private http: HttpClient) { 
      postAuth = {
        headers:new HttpHeaders({
          'Content-Type':'application/x-www-form-urlencoded'
        })
      }
  }
  getAllHirings (status, page,searchType, searchValue, sortBy, perPage, startDate, endDate){
    searchType==undefined?searchType='searchById':searchType=searchType;
    var searchstring;
    let dateRange='';
    if(startDate!== undefined && endDate!==undefined){
      dateRange = "&currentStartDate="+startDate+"&currentEndDate="+endDate;
    }else if(startDate!==undefined && endDate == undefined){
      dateRange = "&currentStartDate="+startDate;
    }
    if(searchType!==undefined && searchValue!==undefined)
      {searchstring = "&"+searchType+"="+searchValue;}
    else
      {searchstring='';}
    let apiUrl = "api/admin/hiring?&pageNo="+page+"&status="+status+"&sortBy="+sortBy+searchstring+'&perPage='+perPage+dateRange;
    return this.http.get(this._url+apiUrl)
  }
  getByid(id){
    return this.http.get(this._url+'api/admin/hiring/'+id)
  }
  cancelHiring(id, reason){
    let body = new HttpParams()
    .set('hiring_id', id)
    .set('reason', reason)
    return this.http.post(this._url+'api/admin/hiring/close', body.toString(), postAuth).pipe(
      tap((res:any)=>{
        if(res.success == true){
          sweetAlert('success', 'Operation Successfull');
        }else{
          sweetAlert('warning', res.message);
        }
      }, error=>{
       sweetAlert('error', error.error.message);
      })
    )
  }
availableBellboy(){
  return this.http.get(this._url+'api/admin/hiring/bellboy');
 }
 assignBellboy(bellboy, hiring_id){
  let body = new HttpParams()
  .set('bellboy', bellboy)
  .set('hiring_id', hiring_id)
  return this.http.post(this._url+'api/admin/hiring/bellboy/assign', body.toString(), postAuth).pipe(
    tap((res:any)=>{
      if(res.success == true){
        sweetAlert('success', 'Bellboy Assigned successfully');
        return true;
      }else{
        sweetAlert('warning', res.message);
      }
    },error=>{
      sweetAlert('error', error.error.message);
    })
  )
 }
 estimatedRoute(Origin, destinition){
   let oLat = Origin.lat;
   let oLng = Origin.lng;
   let dLat = destinition.lat;
   let dLng = destinition.lng;
   return this.http.get(url+'api/admin/hiring/estimatedDistance?origin='+oLat+','+oLng+'&destination='+dLat+','+dLng+'')
   .pipe(
     map((res:any)=>{
       return res.data.distance.routes[0].legs[0];
     })
   )
 }
}