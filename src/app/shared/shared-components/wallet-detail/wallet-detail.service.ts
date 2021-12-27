import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { sweetAlert, url } from 'app/shared/services/global';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WalletDetailService {

  constructor(private http:HttpClient) { }

  getBellboyWalletDetail(id, walletType){
    let _url = url+'api/admin/wallet/'+walletType+'/getWallet/'+id;
    return this.http.get(_url).pipe(
      map((res:any)=>{
        let object = res.data;
        if(object.hasOwnProperty('customer')){
          const {customer:bellboy, ...rest} = object;
          return {bellboy, ...rest};
        }else{
          return res.data
        }
      })
    )
  }
<<<<<<< HEAD
  getBellboyTransactions(id, page, perPage, walletType, type, startdate, enddate){
    let _url = url+'api/admin/wallet/'+walletType+'/getTranscation/'+id+'?pageNo='+page+'&perPage='+perPage;
    if(type!==undefined)
      _url = _url+'&type='+type;
    if(startdate && enddate)
      _url = _url+'&startdate='+startdate+'&enddate='+enddate
=======
  getBellboyTransactions(id, page, perPage, walletType, type){
    let _url = url+'api/admin/wallet/'+walletType+'/getTranscation/'+id+'?pageNo='+page+'&perPage='+perPage;
    if(type!==undefined)
      _url = _url+'&type='+type;
>>>>>>> webfix/bellboy-copy
    return this.http.get(_url).
    pipe(
      map((res:any)=>{
        return res.data;
      })
    )
  }
<<<<<<< HEAD
  topup(id, amount, type){
    let _url;
    let payload = {
      'amount':amount
    };
    if(type === 'bellboy'){
      _url = 'api/admin/wallet/bellboy/topUp';
      payload['bellboy'] = id;
    }else {
      _url = 'api/admin/wallet/customer/topup';
      payload['customer'] = id;
    }
    return this.http.post(url+_url, payload).
=======
  topup(id, amount){
    return this.http.post(url+'api/admin/wallet/bellboy/topUp', {
      'amount':amount,
      'bellboy':id
    }).
>>>>>>> webfix/bellboy-copy
    pipe(tap((res:any)=>{
      sweetAlert('success', 'TopUp Successfully')
    },error=>{
      sweetAlert('error', error)
    }))
  }
<<<<<<< HEAD
  withDraw(id, amount, type){
    let _url;
    let payload = {
      'amount':amount
    }
    if(type === 'bellboy'){
      _url = 'api/admin/wallet/bellboy/withdraw';
      payload['bellboy'] = id;
    }else {
      _url = 'api/admin/wallet/customer/withdraw';
      payload['customer'] = id;
    }
    return this.http.post(url+_url, payload)
    .pipe(tap((res:any)=>{
=======
  withDraw(id, amount){
    return this.http.post(url+'api/admin/wallet/bellboy/withdraw', {
      'amount':amount,
      'bellboy':id
    }).
    pipe(tap((res:any)=>{
>>>>>>> webfix/bellboy-copy
      sweetAlert('success', 'WithDraw Successfully')
    },(error)=>{
      sweetAlert('error', error);
    }))
  }
}
