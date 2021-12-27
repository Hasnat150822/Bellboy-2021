<<<<<<< HEAD
import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { map, take, tap } from 'rxjs/operators';
import { sweetAlert, url } from 'app/shared/services/global';
import { BehaviorSubject } from 'rxjs';

=======
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';
import { sweetAlert, url } from 'app/shared/services/global';
>>>>>>> webfix/bellboy-copy
var postAuth;
@Injectable({
  providedIn: 'root'
})
<<<<<<< HEAD

export class CustomersService implements OnInit {
  _url = url;
  dateObject = new BehaviorSubject<{}>({});
  otherParams = new BehaviorSubject(undefined);
  startandtodate;
  params;
=======
export class CustomersService {
  _url = url;
>>>>>>> webfix/bellboy-copy
  constructor(private http: HttpClient) {
    postAuth = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded'
      })
    }
  }
<<<<<<< HEAD
  
  ngOnInit(){
  }
  
  getCustomers(byName, byPhone, status, page, sortBy, perPage) {
    let url = 'api/admin/customer?';
    this.dateObject.pipe(take(1)).subscribe((response:any)=>{
      this.startandtodate = response;
      if(response.fromDate && response.toDate){
        url = url+'startdate='+response.fromDate+'&enddate='+response.toDate;
      }
    })
    this.otherParams.subscribe((res:any)=>{
      this.params = res;
      if(res){
        url = url+'&'+this.params;
      }
    })
    if (status == ' ') {
      return this.http.get(this._url + url+'&search=' + byName + '&pageNo=' + page + '&mobile='+byPhone+ '&sortBy=' + sortBy+'&perPage='+perPage)
    } else {
      return this.http.get(this._url + url+'&status='+status+'&search=' + byName + '&pageNo=' + page + '&mobile='+byPhone+ '&sortBy=' + sortBy+'&perPage='+perPage)
=======
  getCustomers(byName, byPhone, status, page, sortBy, perPage) {
    if (status == ' ') {
      return this.http.get(this._url + 'api/admin/customer?search=' + byName + '&pageNo=' + page + '&mobile='+byPhone+ '&sortBy=' + sortBy+'&perPage='+perPage)
    } else {
      return this.http.get(this._url + 'api/admin/customer?search=' + byName + '&status=' + status + '&pageNo=' + page + '&mobile=' + byPhone + '&sortBy=' + sortBy+'&perPage='+perPage)
>>>>>>> webfix/bellboy-copy
    }
  }
  sortCustomer() {

  }
  searchCustomer(keyword) {
    return this.http.get(this._url + 'api/admin/customer?search=' + keyword)
  }
<<<<<<< HEAD
  hiringByCustomers(page, perPage, id, status, type){
    let url = `api/admin/${type}/customer/`+id+"?";
=======
  hiringByCustomers(page, perPage, id, status){
    let url = "api/admin/hiring/customer/"+id+"?";
>>>>>>> webfix/bellboy-copy
    if(status!==null){
      url = url+"status="+status+'&perPage='+perPage+'&pageNo='+page;
    }else{
      url = url+'perPage='+perPage+'&pageNo='+page;
    }
    return this.http.get(this._url+url).
    pipe(
      map((res:any)=>{
        return res.data.hirings;
      })
    )
  }
  getCustById(id) {
    return this.http.get(this._url + 'api/admin/customer/' + id)
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
        sweetAlert('error', error);
      })
    )
  }
  sendNotification(type, form, sendTo){
    let url;
    let decodeType;
    if(type=='customer'){
      url='api/admin/notification/'
      decodeType = 3;
    }else{
      url='api/admin/bellboyNotification/'
      decodeType = 2;
    }
    let formData: FormData = new FormData();
    sendTo=='multipledevice'?form.userId.map((id:string)=>{
      formData.append('userIds', id);
    }):form.userId.map((id:string)=>{
      formData.append('userId', id);
    });
    formData.append('title', form.title);
    formData.append('body', form.description);
    if(form.notificationImg)
      formData.append('notificationImg', form.notificationImg);
    return this.http.post(this._url+url+sendTo+'?type='+decodeType,formData)
    .pipe(
      tap((res:any)=>{
        if(res.success == true){
          sweetAlert('success', 'Notification Sent');
        }else{
          sweetAlert('error', res.message);
        }
      }, error=>{
        sweetAlert('error', error);
      })
    )
  }
}