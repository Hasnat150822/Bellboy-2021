import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { NgxImageCompressService } from 'ngx-image-compress';
import { BehaviorSubject } from 'rxjs';
import { url } from './global';
@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  _url= url;
  token = new BehaviorSubject(null);
  constructor(private http : HttpClient, private imageCompressor:NgxImageCompressService) { 
   }
  getLocals(){
    return this.http.get(this._url+'api/admin/locale');
  }
  async compress(imgURL, filename) {
    let imageFile:File;
    let base64;
    let success:boolean
    await checkHeightWidth(imgURL).then(async (data)=>{
      if(data[0]>300 || data[1]>=300){
      await  this.imageCompressor.compressFile(imgURL, -1, 30, 100).then((res)=>{
        base64 = res  
        imageFile = dataURLtoFile(res, filename)
        success = true
        })
        return
      }else{success = false}
    })
    return [{file:imageFile, con64:base64, status:success}]
  }
  registerFcmToken(token){
    let body = new HttpParams()
    .set('token',token)
    return this.http.post(this._url+'api/admin/user/token', body.toString(), {
      headers:new HttpHeaders({
        'Content-Type':'application/x-www-form-urlencoded',
        'Authorization':'bearer '+this.token.value
      })
    })
  }
}
function checkHeightWidth(imgURL){
  return new Promise((resolve, reject)=>{
    const Img = new Image()
    Img.src = imgURL
    Img.onload = ()=>resolve([Img.height, Img.width])
    Img.onerror = (error)=>reject(error)
  })
}
export function dataURLtoFile(dataurl, filename) {
  var arr = dataurl.split(','),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]), 
      n = bstr.length, 
      u8arr = new Uint8Array(n);
  while(n--){
      u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, {type:mime});
}