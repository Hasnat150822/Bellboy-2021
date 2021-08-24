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
  getBellboyTransactions(id, page, perPage, walletType, type){
    let _url = url+'api/admin/wallet/'+walletType+'/getTranscation/'+id+'?pageNo='+page+'&perPage='+perPage;
    if(type!==undefined)
      _url = _url+'&type='+type;
    return this.http.get(_url).
    pipe(
      map((res:any)=>{
        return res.data;
      })
    )
  }
  topup(id, amount){
    return this.http.post(url+'api/admin/wallet/bellboy/topUp', {
      'amount':amount,
      'bellboy':id
    }).
    pipe(tap((res:any)=>{
      sweetAlert('success', 'TopUp Successfully')
    },error=>{
      sweetAlert('error', error)
    }))
  }
  withDraw(id, amount){
    return this.http.post(url+'api/admin/wallet/bellboy/withdraw', {
      'amount':amount,
      'bellboy':id
    }).
    pipe(tap((res:any)=>{
      sweetAlert('success', 'WithDraw Successfully')
    },(error)=>{
      sweetAlert('error', error);
    }))
  }
}
