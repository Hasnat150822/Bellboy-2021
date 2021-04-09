import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { GlobalService } from 'app/shared/services/global-service.service';
import { BehaviorSubject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import Swal from 'sweetalert2'; 
import { url } from 'app/shared/services/global';
var getAuth;
var postAuth;
@Injectable({
  providedIn: 'root'
})
export class HiringService {
  _url = url;
  tabStatus = new BehaviorSubject<any>('tab1')
  constructor(private http: HttpClient, private gs:GlobalService) { 
    this.gs.token.subscribe((res:any)=>{
      let token = res;
      getAuth = {
        headers:new HttpHeaders({
          'Authorization':'bearer '+token
        })
      }
      postAuth = {
        headers:new HttpHeaders({
          'Authorization':'bearer '+token,
          'Content-Type':'application/x-www-form-urlencoded'
        })
      }
    })
  }
  getAllHirings (status, page,searchType, searchValue, sortBy, perPage){
    searchType==undefined?searchType='searchById':searchType=searchType;
    var searchstring;
    if(searchType!==undefined && searchValue!==undefined)
      {searchstring = "&"+searchType+"="+searchValue;}
    else
      {searchstring='';}
    let apiUrl = "api/admin/hiring?&pageNo="+page+"&status="+status+"&sortBy="+sortBy+searchstring+'&perPage='+perPage;
    return this.http.get(this._url+apiUrl, getAuth)
  }
  getByid(id){
    return this.http.get(this._url+'api/admin/hiring/'+id, getAuth)
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
  return this.http.get(this._url+'api/admin/hiring/bellboy', getAuth);
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
   console.log(origin, destinition, 'asdfasdf');
   let oLat = Origin.lat;
   let oLng = Origin.lng;
   let dLat = destinition.lat;
   let dLng = destinition.lng;
   return this.http.get('https://maps.googleapis.com/maps/api/directions/json?origin='+oLat+','+oLng+'&destination='+dLat+','+dLng+'&key=AIzaSyCGsknFpbKkEneyVmQ0luBZwaHlv4V0KUE', {
     headers:{
       'Content-Type':'application/json'
     }
   })
   .pipe(
     map((res:any)=>{
       return res.routes;
     })
   )
 }
}
function sweetAlert(icon, message) {
  Swal.fire({
    icon:icon,
    text:message,
    width:'300px',
    timer:2500,
    showConfirmButton:false
  })
}