import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { GlobalService } from 'app/shared/services/global-service.service';
import { url } from 'app/shared/services/global';
var postAuth; var getAuth;
@Injectable({
  providedIn: 'root'
})  
export class CategoriesService {
  _url=url;
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
  createCat(title, image){
    let formData: FormData = new FormData();
    formData.append('title', title);
    formData.append('icon', image)
    return this.http.post(this._url+'api/admin/category', formData, getAuth)
  }
  getCat(keyword, page){
    return this.http.get(this._url+'api/admin/category?search='+keyword+'&pageNo='+page+'&perPage=10', getAuth)
  }
  getCatById(id){
    return this.http.get(this._url+'api/admin/category/'+id+'/en', getAuth)
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
    return this.http.put(this._url+'api/admin/category', body, getAuth)
  }
}