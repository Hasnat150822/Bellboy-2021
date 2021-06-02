import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BellboyService } from '../bellboy.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ManageVehicleService } from 'app/pages/vehicles/manage-vehicles/manage-vehicle.service';
import { amazonUrl, confirmationDialog, url } from 'app/shared/services/global';
import { Store } from '@ngrx/store';
import * as allActions from '../../../ngrx-states/actions';
import { URL } from 'app/ngrx-states/model/url.model';
declare const $:any;
@Component({
  selector: 'app-bellboydetail',
  templateUrl: './bellboydetail.component.html',
  styleUrls: ['./bellboydetail.component.scss']
})
export class BellboydetailComponent implements OnInit {
  _id;
  detailBellboy:any
  currentImage;
  amazonImgUrl:string = amazonUrl;
  spinner:boolean;
  constructor(private activatedRote:ActivatedRoute,private modalService:NgbModal, 
    private bellboyService:BellboyService, private manageVehicle:ManageVehicleService, private store:Store<URL>) {
   }
  ngOnInit() {
    this._id = this.activatedRote.params['value'].id
    this.getBellboyDetail()
  }
  isBigImg:boolean;
  openModel(Url) {
    this.isBigImg = true;
    this.store.dispatch(new allActions.SendUrl(Url));
  }
  open(content){
    this.modalService.open(content, { ariaLabelledBy:'modal-basic-title'});
  }
  getBellboyDetail(){
    this.bellboyService.getById(this._id).subscribe((res:any)=>{
      this.spinner = false;
      this.detailBellboy = res.data
    })
  }
  changeNIC(status){
    confirmationDialog().then((result)=>{
      if(result.value == true){
        this.bellboyService.manageNIC(status, this._id).subscribe((res:any)=>{
            this.getBellboyDetail()
        })  
      }else{
        return false;
      }
    })
  }
  showDetail(id){
    $('#'+id).prop('hidden', !$('#'+id).prop('hidden'))
  }
  changeLicense(status){
    confirmationDialog().then((result)=>{
      if(result.value == true){
        this.bellboyService.manageLicense(status, this._id).subscribe((res:any)=>{
            this.getBellboyDetail()
          })
      }else{
        return false
      }
    })
  }
  changeStatus(id, status){
    this.manageVehicle.changeVehicleStatus(id, status).subscribe((res:any)=>
    {
      if(res.success == true){
        this.getBellboyDetail()
      }
    })
  }
  bellboyOnlineHistory:Array<any>;
  getOnlineHistory(type){
    this.bellboyOnlineHistory = [];
    this.spinner = true;
    this.bellboyService.getBellboyOnlineHistory(this._id, type).subscribe((res:any)=>{
      this.bellboyOnlineHistory = res;
      this.spinner = false;
    })
  }
  bellboyOnlineActivity
  getOnlineActivity(){
    this.bellboyOnlineHistory = [];
    this.spinner = true;
    this.bellboyService.getBellboyOnlineActivity(this._id).subscribe((res:any)=>{
      this.bellboyOnlineActivity = res.data;
      this.spinner = false;
    })
  }
}
