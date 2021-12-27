import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OfferModel } from 'app/shared/models/offers.model';
import { sweetAlert, url } from 'app/shared/services/global';
import { PagerService } from 'app/shared/services/pager.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

interface OfferResponse {
    success: boolean,
    code: number,
    data: {
        notification?:OfferModel,
        promotions: [],
        promotionsCount: number
    },
    message: string
}

@Injectable({ providedIn: 'platform' })

export class OfferService {
    pager = new BehaviorSubject<{}>({});
    constructor(
        private http: HttpClient,
        private pagerService: PagerService
    ) { }

    manageOffers(imgFile, form, type, id?, pageType?) {
        let _url:string;
        if(pageType == 'Customer Offers'){
            _url = 'api/admin/customerpromotion/add';
        }else{
            _url = 'api/admin/bellboypromotion/add';
        }
        let formData: FormData = new FormData();
        formData.append('title', form.title)
        formData.append('body', form.body)
        formData.append('code', form.code)
        formData.append('isPercent', form.isPercent)
        formData.append('isLimited', form.isLimited)
        formData.append('amount', form.amount)
        formData.append('expiryDate', form.expiryDate)
        formData.append('max', form.max)
        formData.append('bellboyTypes', form.bellboyType)
        formData.append('image', imgFile)
        let api;
        if (type.toLowerCase() == 'create') {
            api = this.http.post(url+_url, formData);
        } else {
            api = this.http.put(url+'/api/admin/deactive/'+id, formData);
        }
        return api.pipe(
            tap((res: any) => {
                if (res.success == true) {
                    sweetAlert('success', 'Done');
                } else {
                    sweetAlert('warning', res.message)
                }
            }, error => {
                sweetAlert('error', error)
            })
        )
    }

    // function interface, what function will return
    getOffers(page, perPage, type): Observable<OfferModel[]> {
        // get methode ke saath jo interface use hota hai
        // wo api ke response ka interface hota hai
        let _url:string;
        if(type == 'Customer Offers'){
            _url = 'api/admin/customerpromotion';
        }else{
            _url = 'api/admin/bellboypromotion';
        }
        return this.http.get<OfferResponse>(url + _url +'?pageNo='+page+'perPage='+perPage).pipe(
            map((res: OfferResponse) => {
                let pagerObj = this.pagerService.getPager(res.data.promotionsCount, page, perPage);
                this.pager.next(pagerObj);
                return res.data.promotions
            })
        )
    }

    getBellboySingleOffer(id):Observable<OfferModel>{
        return this.http.get<OfferResponse>(url+'api/admin/bellboypromotion/'+id).pipe(
            map((res:OfferResponse)=>{
                return res.data.notification
            })
        )
    }
}