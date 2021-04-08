import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { url } from 'app/shared/services/global';
var headers;
var postAuth;
@Injectable({
  providedIn: 'root'
})
export class AssignStatusService {
  _url = url;
  finalArr:any[];
  constructor(private http:HttpClient) {
    let token = localStorage.getItem('token');
    headers ={
      headers:new HttpHeaders({
        'Authorization':'Bearer '+token
      })
    }
    postAuth ={
      headers:new HttpHeaders({
        'Authorization':'Bearer '+token,
        'Content-Type':'application/x-www-form-urlencoded'
      })
    }
   }
getPend_Del_Hir(){
  this.finalArr = []
  // return new Promise((resolve, reject)=>{
  //   this.http.get(this._url+'api/admin/order?status=1', headers).subscribe((res:any)=>{
  //     res.data.orders.map((res:any)=>{
  //       res['type']="Delivery"
  //       this.finalArr.push(res)
  //     })

  //   })
  //   this.http.get(this._url+'api/admin/hiring?status=1', headers).subscribe((res:any)=>{
  //     res.data.hirings.map((res:any)=>{
  //       res['type']="Hiring"
  //       this.finalArr.push(res)
  //     })
  //     resolve(this.finalArr)
  //     })
  // })
}
availableBellboy(){
  return this.http.get(this._url+'api/admin/hiring/bellboy', headers);
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
