import { Injectable} from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { url } from 'app/shared/services/global';
var postAuth;
@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  _url=url;
  constructor(private http:HttpClient) {
      postAuth = {
        headers:new HttpHeaders({
          'Content-Type':'application/x-www-form-urlencoded'
        })
      }
   }
  searchProducts(keyword, page){
    return this.http.get(this._url+'api/admin/product?perPage=10&pageNo='+page+'&search='+keyword)
  }
  allCatForOther(){
    return new Promise((resolve, reject)=>{
      this.http.get(this._url+'api/admin/category/all').subscribe((res:any)=>{
        if(res.success==true)
          resolve(res.data)
      })
    })
  }
  allBrandsForOthers(){
    return new Promise((resolve)=>{
      this.http.get(this._url+ 'api/admin/brand/all').subscribe((res:any)=>{
        if(res.success == true){
          resolve(res.data)
        }
      })
    })
  }
  getProducts(page){
    return this.http.get(this._url+'api/admin/product?perPage=10&pageNo='+page+'&search=')
  }
  addProduct(title, brandId, catId){
    let body = new HttpParams()
    .set('brands', brandId)
    .set('title', title)
    .set('categories', catId)
    return this.http.post(this._url+'api/admin/product', body.toString(),postAuth)
  }
  submitLabel(label, productId, localeId){    
    let body = new HttpParams()
    .set('product', productId)
    .set('label', label)
    .set('locale', localeId)
    return this.http.post(this._url+'api/admin/product/assignLabel', body.toString(), postAuth)
  }
  getProductById(id){
    return this.http.get(this._url+'api/admin/product/'+id)
  }
  // add single category to product
  addCatToProduct(productId, catId){    
    let body = new HttpParams()
    .set('product', productId)
    .set('categories', catId)
    return this.http.put(this._url+'api/admin/product/addCategory', body.toString(), postAuth)
  }
  addBrandToProduct(productId, brandId){
    let body = new HttpParams()
    .set('product', productId)
    .set('brands', brandId)
    return this.http.put(this._url+'api/admin/product/addBrands', body.toString(), postAuth)
  }
  // removeBran d from product
  removeBrandToProduct(productId, brandId){
    let body = new HttpParams()
    .set('product', productId)
    .set('brands', brandId)
    return this.http.put(this._url+'api/admin/product/removeBrands', body.toString(), postAuth)
  }
  removeCatById(productId, catId){
    let body = new HttpParams()
    .set('product', productId)
    .set('categories', catId)
    return this.http.put(this._url+'api/admin/product/removeCategory', body.toString(), postAuth)
  }
}
