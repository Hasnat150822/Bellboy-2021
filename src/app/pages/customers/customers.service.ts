import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';
import { GlobalService } from 'app/shared/services/global-service.service';
import { sweetAlert, url } from 'app/shared/services/global';
var getAuth; var postAuth;
@Injectable({
  providedIn: 'root'
})
export class CustomersService {
  _url = url;
  constructor(private http: HttpClient, private gs: GlobalService) {
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
  getCustomers(byName, byPhone, status, page, sortBy, perPage) {
    if (status == '') {
      return this.http.get(this._url + 'api/admin/customer?search=' + byName + '&pageNo=' + page + '&mobile=' + byPhone + '&sortBy=' + sortBy+'&perPage='+perPage, getAuth)
    } else {
      return this.http.get(this._url + 'api/admin/customer?search=' + byName + '&status=' + status + '&pageNo=' + page + '&mobile=' + byPhone + '&sortBy=' + sortBy+'&perPage='+perPage, getAuth)
    }
  }
  sortCustomer() {

  }
  searchCustomer(keyword) {
    return this.http.get(this._url + 'api/admin/customer?search=' + keyword, getAuth)
  }
  hiringByCustomers(page, perPage, id){
    return this.http.get(this._url+'api/admin/hiring/customer/'+id+'?perPage='+perPage+'&pageNo='+page, getAuth).
    pipe(
      map((res:any)=>{
        return res.data.hirings;
      })
    )
  }
  getCustById(id) {
    return this.http.get(this._url + 'api/admin/customer/' + id, getAuth)
  }
  changeStatus(status, customer) {
    let body = new HttpParams()
      .set('status', status)
      .set('customer', customer)
    return this.http.put(this._url + 'api/admin/customer', body.toString(), postAuth).pipe(
      map((res: any) => {
        if (res.success == true) {
          sweetAlert('success', 'Updated')
        } else {
          sweetAlert('error', res.message);
        }
      }, error => {
        sweetAlert('error', error.error.message);
      })
    )
  }
  sendNotification(form, sendTo){
    let formData: FormData = new FormData();
    form.userId.map((id:string)=>{formData.append('userId', id);});
    formData.append('title', form.title);
    formData.append('body', form.description);
    if(form.notificationImg)
      formData.append('notificationImg', form.notificationImg);
    return this.http.post(this._url+'api/admin/notification/'+sendTo+'?type=3',formData, getAuth)
    .pipe(
      tap((res:any)=>{
        if(res.success == true){
          sweetAlert('success', 'Notification Sent');
        }else{
          sweetAlert('error', res.message);
        }
      }, error=>{
        sweetAlert('error', error.error.message);
      })
    )
  }
}