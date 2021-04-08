import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { url } from 'app/shared/services/global';
const httpOptions = new HttpHeaders({
  'Content-Type':'application/x-www-form-urlencoded'
})
@Injectable({
  providedIn: 'root'
})
export class DeliveriesService {
  _url = url;
  constructor(private http : HttpClient) { 
    
  }
  getAllOrders(page, status, keyword){
    return this.http.get(this._url+'api/admin/order?pageNo='+page+'&status='+status+'&search='+keyword)
  }
  getById(id){
    return this.http.get(this._url+'api/admin/order/'+id)
  }
}