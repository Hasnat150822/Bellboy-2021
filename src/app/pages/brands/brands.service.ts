import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { url } from 'app/shared/services/global';
var postAuth;
@Injectable({
  providedIn: 'root'
})
export class BrandsService {
  _url=url
  constructor(private http:HttpClient) { 
    postAuth = {
      headers:new HttpHeaders({
        'Content-Type':'application/x-www-form-urlencoded'
      })
    }
  }
  searchBrands(keyword, page){
    return this.http.get(this._url+'api/admin/brand?perPage=10&pageNo='+page+'&search='+keyword)
  }
  createBrand(title, img){
    let formData: FormData = new FormData();
    formData.append('title', title);
    formData.append('icon', img)
    return this.http.post(this._url+'api/admin/brand',formData)
  }
  getBrand(cureentpage){
    return this.http.get(this._url+'api/admin/brand?perPage=10&pageNo='+cureentpage+'&search='+"&locale=")
  }
  getBrandById(id){
    return this.http.get(this._url+'api/admin/brand/'+id+'/en')
  }
  addLabelToBrand(label, brandId, locale){
    let body = new HttpParams()
    .set('brand',brandId)
    .set('label',label)
    .set('locale',locale)
    return this.http.post(this._url+'api/admin/brand/assignLabel', body.toString(), postAuth)
  }
  updateBrand(title, brand_id, label_id, status, icon){
    let body:FormData = new FormData();
    body.append('title', title);
    body.append('brand_id', brand_id);
    body.append('label_id', label_id);
    body.append('status', status);
    body.append('icon', icon);
    return this.http.put(this._url+'api/admin/brand', body)
  }
} 