import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { GlobalService } from 'app/shared/services/global-service.service';
import { url } from 'app/shared/services/global';
var getAuth;
var postAuth;
@Injectable({
  providedIn: 'root'
})
export class BrandsService {
  _url=url
  constructor(private http:HttpClient, private gs:GlobalService) { 
    this.gs.token.subscribe((res:any)=>{
      let token = res;
      getAuth = {
        headers:new HttpHeaders({
          'Authorization':'bearer '+token
        })
      }
      postAuth = {
        headers:new HttpHeaders({
          'Content-Type':'application/x-www-form-urlencoded',
          'Authorization':'bearer '+token
        })
      }
    })
  }
  searchBrands(keyword, page){
    return this.http.get(this._url+'api/admin/brand?perPage=10&pageNo='+page+'&search='+keyword, getAuth)
  }
  createBrand(title, img){
    let formData: FormData = new FormData();
    formData.append('title', title);
    formData.append('icon', img)
    return this.http.post(this._url+'api/admin/brand',formData, getAuth)
  }
  getBrand(cureentpage){
    return this.http.get(this._url+'api/admin/brand?perPage=10&pageNo='+cureentpage+'&search='+"&locale=", getAuth)
  }
  getBrandById(id){
    return this.http.get(this._url+'api/admin/brand/'+id+'/en', getAuth)
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
    return this.http.put(this._url+'api/admin/brand', body, getAuth)
  }
} 