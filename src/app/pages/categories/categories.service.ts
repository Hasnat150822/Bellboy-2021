import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { url } from 'app/shared/services/global';
var postAuth;
@Injectable({
  providedIn: 'root'
})  
export class CategoriesService {
  _url=url;
  constructor(private http:HttpClient) { 
    postAuth = {
      headers:new HttpHeaders({
        'Content-Type':'application/x-www-form-urlencoded'
      })
    }
  }
  createCat(title, image){
    let formData: FormData = new FormData();
    formData.append('title', title);
    formData.append('icon', image)
    return this.http.post(this._url+'api/admin/category', formData)
  }
  getCat(keyword, page){
    return this.http.get(this._url+'api/admin/category?search='+keyword+'&pageNo='+page+'&perPage=10')
  }
  getCatById(id){
    return this.http.get(this._url+'api/admin/category/'+id+'/en')
  }
  addLabelToCat(label, catId, locale){
    let body = new HttpParams()
    .set('category',catId)
    .set('label',label)
    .set('locale',locale)
    return this.http.post(this._url+'api/admin/category/assignLabel', body.toString(), postAuth)
  }
  updateCat(title, category, label_id, status, icon){
    let body:FormData = new FormData();
    body.append('title', title);
    body.append('category', category);
    body.append('label_id', label_id);
    body.append('status', status);
    body.append('icon', icon);
    return this.http.put(this._url+'api/admin/category', body)
  }
}