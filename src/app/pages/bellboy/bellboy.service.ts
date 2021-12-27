import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';
import { sweetAlert, url } from 'app/shared/services/global';
import { BellboyHirings } from './modals/bellboy-hirings';
import { NewBellboy } from "./modals/bellboy-hirings";
import { Observable } from 'rxjs';
import { AddVehicle } from './modals/add-vehicle.modal';
var postAuth;
@Injectable({
  providedIn: 'root'
})
export class BellboyService {
  _url = url;
  constructor(private http:HttpClient) {
    postAuth = {
      headers:new HttpHeaders({
        'Content-Type':'application/x-www-form-urlencoded'
      })
    }
   }
  getAllBellboy(page, perPage, status,searchType, query, fromdate, todate, otherParams){
    let url = this._url+'api/admin/bellboy/?status='+status+'&perPage='+perPage+'&pageNo='+page;
    if(query!==undefined){
      url = url+'&'+'searchBy'+'='+searchType+':'+query;
    }
    if(fromdate && todate){
      url = url+'&'+'startdate='+fromdate+'&enddate='+todate;
    }
    if(otherParams){
      url = url+'&'+otherParams
    }
    return this.http.get(url).pipe(
      map((res:any)=>{
        if(res.success == true){
          return res.data
        }
      })
    );
  }
  getById(id){
    return this.http.get(this._url+'api/admin/bellboy/'+id)
  }
  manageStatusbellboy(id, status){
    let body = new HttpParams()
    .set('bellboy', id)
    .set('status', status)
    return this.http.put(this._url+'api/admin/bellboy/toggle', body.toString(), postAuth)
    .pipe(tap((res:any)=>{
      if(res.success == true){
        sweetAlert('success', 'Done');
      }else{
        sweetAlert('warning', res.message);
      }
    }, error=>{
      sweetAlert('error', error);
    }));
  }
  manageNIC(status, userId){
    let body = new HttpParams()
    .set('status', status)
    .set('userId', userId)
    return this.http.post(this._url+'api/admin/bellboy/approveNIC', body.toString(), postAuth).pipe(
      tap((res:any)=>{
        if(res.success==true){
          sweetAlert('success', 'Done');
        }else{
          sweetAlert('warning', res.message)
        }
      }, error=>{
          sweetAlert('error', error)
      })
    )
  }
  manageLicense(status, userId){
    let body = new HttpParams()
    .set('status', status)
    .set('userId', userId)
    return this.http.post(this._url+'api/admin/bellboy/approveDrivingLicense', body.toString(), postAuth).pipe(
      tap((res:any)=>{
        if(res.success==true){
          sweetAlert('success', 'Done');
        }else{
          sweetAlert('warning', res.message)
        }
      }, error=>{
          sweetAlert('error', error)
      })
    )
  }
  getBellboysHirings(id, page, perpage, startdate, enddate, type):Observable<BellboyHirings>{
    let _url = `api/admin/bellboy/${type}/`+id+"?pageNo="+page+"&perPage="+perpage;
    if(startdate && enddate){
      _url = _url+'&startdate='+startdate+'&enddate='+enddate;
    }
    return this.http.get<BellboyHirings>(url+_url)
    .pipe(
      map((res:any)=>{
        return res;
      })
    )
  }
  getBellboyOnlineHistory(id, type){
    return this.http.get(url+'api/admin/bellboy/getBellboyActivity/'+id+'?by='+type+'').pipe(
      map((res:any)=>{
        return res.data.activity
      })
    )
  }
  getBellboyOnlineActivity(id){
    return this.http.get(url+'api/admin/bellboy/bellboyactivity/'+id).pipe(
      map((res:any)=>{
        return res
      })
    )
  }
  postTimeForOnlineHistory(object){
    let params = new HttpParams()
    .set('startHour', object.startHour)
    .set('startMin', object.startMin)
    .set('endHour', object.endHour)
    .set('endMin', object.endMin)
    return this.http.post(url+'api/admin/setting/onlinetime', params.toString(), postAuth);
  }
  getOnlineTimeByRange(){
    this.http.get(url+'api/admin/setting/getTimes') 
  }
  submitDocs(obj, id){
    let formData:FormData = new FormData(); 
    if(obj.back_image){
      formData.append('back_image', obj.back_image);
    }
    if(obj.front_image){
      formData.append('front_image', obj.front_image);
    }
    if(obj.image){formData.append('image', obj.image)};
    formData.append('no', obj.value);
    formData.append('value', obj.value);
    formData.append('expiry_date', obj.expiry_date);
    formData.append('exists', 'true');
    let url; 
    if(obj.type == 'NIC'){
      url = 'api/admin/bellboy/nic/'+id;
    }else if(obj.type === 'License'){
      url = 'api/admin/bellboy/driving_license/'+id;
    }
    if(obj.type === 'Certificate'){
      url = 'api/admin/bellboy/character_certificate/'+id;
    }
    return this.http.put(this._url+url, formData).pipe(
      tap((res:any)=>{
        if(res.success==true){
          sweetAlert('success', 'Done');
        }else{
          sweetAlert('warning', res.message)
        }
      }, error=>{
          sweetAlert('error', error)
      })
    );
  }

  uploadImage(file, id){
    let formData = new FormData();
    formData.append('avatar', file)
    return this.http.put(this._url+'api/admin/bellboy/avatar/'+id, formData).pipe(
      tap((res:any)=>{
        if(res.success==true){
          sweetAlert('success', 'Done');
        }else{
          sweetAlert('warning', res.message)
        }
      }, error=>{
          sweetAlert('error', error)
      })
    );
  }

  submitBellboy(form:NewBellboy){
    let formDate:FormData = new FormData();
    formDate.append( 'bellboyType', form.bellboyType);
    formDate.append( 'name', form.name);
    formDate.append( 'email', form.email);
    formDate.append( 'mobile', form.mobile);
    formDate.append( 'day', form.day.toString());
    formDate.append( 'month', form.month.toString());
    formDate.append( 'year', form.year.toString());
    formDate.append( 'nic_front_image', form.nic_front_image);
    formDate.append( 'nic_back_image', form.nic_back_image);
    formDate.append( 'nic_value', form.nic_value);
    formDate.append( 'nic_expiry_date', form.nic_expiry_date);
    formDate.append( 'drivinglicense_value', form.drivinglicense_value);
    formDate.append( 'drivinglicense_front_image', form.drivinglicense_front_image);
    formDate.append( 'drivinglicense_back_image', form.drivinglicense_back_image);
    formDate.append( 'drivinglicense_expiry_date', form.drivinglicense_expiry_date);
    formDate.append( 'charactercertificate_image', form.charactercertificate_image);
    formDate.append( 'charactercertificate_no', form.charactercertificate_no);
    formDate.append( 'charactercertificate_date_of_issue', form.charactercertificate_date_of_issue);
    formDate.append( 'avatar', form.avatar);
    return this.http.post(url+'api/admin/bellboy/newbellboy', formDate).
    pipe(
      tap((res:any)=>{
        if(res.success == true){
          sweetAlert('success', 'Added');
        }else{
          sweetAlert('warning', res.message);
        }
      }, error=>{
        sweetAlert('error', error.message);
      })
    )
  }

  addVehicle(obj:AddVehicle){
    let formDate = new FormData();
    formDate.append('vehicleType', obj.vehicleType);
    formDate.append('vehicleBrand', obj.vehicleBrand);
    formDate.append('vehicleModel', obj.vehicleModel);
    formDate.append('bellboy', obj.bellboy);
    formDate.append('front_image', obj.front_image);
    formDate.append('back_image', obj.back_image);
    formDate.append('left_image', obj.left_image);
    formDate.append('right_image', obj.right_image);
    formDate.append('color', obj.color.toUpperCase());
    formDate.append('plate_image', obj.plate_image);
    formDate.append('plate_number', obj.plate_number);
    formDate.append('reg_front_image', obj.reg_front_image);
    formDate.append('reg_back_image', obj.reg_back_image);
    formDate.append('reg_other_image', obj.reg_other_image);
    formDate.append('engine_no', obj.engine_no);
    formDate.append('registration_year', obj.registration_year);
    formDate.append('owner', obj.owner);
    return this.http.post(url+'api/admin/vehicle/addnewvehicle', formDate).pipe(
      tap((res:any)=>{
        if(res.success == true){
          sweetAlert('success', 'Added');
        }else{
          sweetAlert('warning', res.message);
        }
      }, error=>{
        sweetAlert('error', error.message);
      })
    )
  }

  updateVehicle(obj:AddVehicle, vehicleId){
    let formDate = new FormData();
    formDate.append('vehicleType', obj.vehicleType);
    formDate.append('vehicleBrand', obj.vehicleBrand);
    formDate.append('vehicleModel', obj.vehicleModel);
    formDate.append('bellboy', obj.bellboy);
    if(typeof(obj.front_image)!=='string')
      formDate.append('front_image', obj.front_image);
    if(typeof(obj.back_image)!=='string')
      formDate.append('back_image', obj.back_image);
    if(typeof(obj.left_image)!=='string')
      formDate.append('left_image', obj.left_image);
    if(typeof(obj.right_image)!=='string')
      formDate.append('right_image', obj.right_image);
    formDate.append('color', obj.color.toUpperCase());
    if(typeof(obj.plate_image)!=='string')
      formDate.append('plate_image', obj.plate_image);
    formDate.append('plate_number', obj.plate_number);
    if(typeof(obj.reg_front_image)!=='string')
      formDate.append('reg_front_image', obj.reg_front_image);
    if(typeof(obj.reg_back_image)!=='string')
      formDate.append('reg_back_image', obj.reg_back_image);
    if(typeof(obj.reg_other_image)!=='string')
      formDate.append('reg_other_image', obj.reg_other_image);
    formDate.append('engine_no', obj.engine_no);
    formDate.append('registration_year', obj.registration_year);
    formDate.append('owner', obj.owner);
    return this.http.put(url+'api/admin/vehicle/'+vehicleId, formDate).pipe(
      tap((res:any)=>{
        if(res.success == true){
          sweetAlert('success', 'Updated');
        }else{
          sweetAlert('warning', res.message);
        }
      }, error=>{
        sweetAlert('error', error.message);
      })
    )
  }

  updateBellboyById(id, dataObject){
    let formDate:FormData = new FormData();
    if(dataObject.name)
      formDate.append( 'name', dataObject.name);
    if(dataObject.email)
      formDate.append( 'email', dataObject.email);
    if(dataObject.mobile)
      formDate.append( 'mobile', dataObject.mobile);
    if(dataObject.day.toString())
      formDate.append( 'date', dataObject.day.toString());
    if(dataObject.month.toString())
      formDate.append( 'month', dataObject.month.toString());
    if(dataObject.year.toString())
      formDate.append( 'year', dataObject.year.toString());
    if(dataObject.nic_front_image)
      formDate.append( 'nic_front_image', dataObject.nic_front_image);
    if(dataObject.nic_back_image)
      formDate.append( 'nic_back_image', dataObject.nic_back_image);
    if(dataObject.nic_value)
      formDate.append( 'nic_value', dataObject.nic_value);
    if(dataObject.nic_expiry_date)
      formDate.append( 'nic_expiry_date', dataObject.nic_expiry_date);
    if(dataObject.drivinglicense_value)
      formDate.append( 'dl_value', dataObject.drivinglicense_value);
    if(dataObject.drivinglicense_front_image)
      formDate.append( 'dl_front_image', dataObject.drivinglicense_front_image);
    if(dataObject.drivinglicense_back_image)
      formDate.append( 'dl_back_image', dataObject.drivinglicense_back_image);
    if(dataObject.drivinglicense_expiry_date)
      formDate.append( 'dl_expiry_date', dataObject.drivinglicense_expiry_date);
    if(dataObject.charactercertificate_image)
      formDate.append( 'image', dataObject.charactercertificate_image);
    if(dataObject.charactercertificate_no)
      formDate.append( 'no', dataObject.charactercertificate_no);
    if(dataObject.charactercertificate_date_of_issue)
      formDate.append( 'date_of_issue', dataObject.charactercertificate_date_of_issue);
    if(dataObject.avatar)
      formDate.append( 'avatar', dataObject.avatar);
    return this.http.put(url+'api/admin/bellboy/'+id, formDate).pipe(
      tap((res:any)=>{
        if(res.success == true){
          sweetAlert('success', 'Updated');
        }else{
          sweetAlert('warning', res.message);
        }
      }, error=>{
        sweetAlert('error', error.message);
      })
    )


  }
}