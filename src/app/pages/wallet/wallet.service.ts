import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { url } from 'app/shared/services/global';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WalletService {

  constructor(private http:HttpClient) { }

  
  getAdminTransactions(page, perPage){
    let id = localStorage.getItem('userId');
    return this.http.get(url+'api/admin/wallet/admin/getTranscation/'+id+'?pageNo='+page+'&perPage='+perPage).
    pipe(
      map((res:any)=>{
        return res.data;
      })
    )
  }

  getTotalTopupWithdraw(){
    return this.http.get(url+'api/admin/wallet/admin/getTotal').pipe(
      map((res:any)=>{
        return res.data.admin_transaction;
      })
    )
  }
}
