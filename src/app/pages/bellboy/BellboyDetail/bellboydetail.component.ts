<<<<<<< HEAD
import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
=======
import { Component, OnInit } from '@angular/core';
>>>>>>> webfix/bellboy-copy
import { ActivatedRoute } from '@angular/router';
import { BellboyService } from '../bellboy.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ManageVehicleService } from 'app/pages/vehicles/manage-vehicles/manage-vehicle.service';
<<<<<<< HEAD
import { amazonUrl, confirmationDialog } from 'app/shared/services/global';
=======
import { amazonUrl, confirmationDialog, url } from 'app/shared/services/global';
>>>>>>> webfix/bellboy-copy
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
<<<<<<< HEAD
  type:string;
  avatarUrl;
  avatarFile;
  singleVehicle:{};
  amazon
  onlineStartTime;
  onlineEndTime;
  constructor(private activatedRote:ActivatedRoute,private modalService:NgbModal, private el:ElementRef,
    private rendrer2:Renderer2,
=======
  constructor(private activatedRote:ActivatedRoute,private modalService:NgbModal, 
>>>>>>> webfix/bellboy-copy
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
    this.modalService.open(content, { ariaLabelledBy:'modal-basic-title', backdrop:'static', keyboard:false});
  }
<<<<<<< HEAD
  openClose(id){
    let el = this.el.nativeElement.querySelector('#'+id);
    if(el.className.includes('d-none')){
      this.rendrer2.removeClass(el, 'd-none');
    }else{
      this.rendrer2.addClass(el, 'd-none');
    }
  }
=======
>>>>>>> webfix/bellboy-copy
  getBellboyDetail(){
    this.bellboyService.getById(this._id).subscribe((res:any)=>{
      this.spinner = false;
      this.detailBellboy = res.data
<<<<<<< HEAD
      this.avatarUrl = null;
    })
  }
  
=======
    })
  }
>>>>>>> webfix/bellboy-copy
  changeNIC(status){
    confirmationDialog('').then((result)=>{
      if(result.value == true){
        this.bellboyService.manageNIC(status, this._id).subscribe((res:any)=>{
            this.getBellboyDetail()
        })  
      }else{
        return false;
      }
    })
  }
<<<<<<< HEAD
=======
  showDetail(id){
    $('#'+id).prop('hidden', !$('#'+id).prop('hidden'))
  }
>>>>>>> webfix/bellboy-copy
  changeLicense(status){
    confirmationDialog('').then((result)=>{
      if(result.value == true){
        this.bellboyService.manageLicense(status, this._id).subscribe((res:any)=>{
            this.getBellboyDetail()
          })
      }else{
        return false
      }
    })
  }
<<<<<<< HEAD
  showDetail(id){
    $('#'+id).prop('hidden', !$('#'+id).prop('hidden'))
  }
=======
>>>>>>> webfix/bellboy-copy
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
<<<<<<< HEAD
  getByTimeRange(){
    this.bellboyService.postTimeForOnlineHistory({
      startHour:this.onlineStartTime.split(':')[0],
      startMin:this.onlineStartTime.split(':')[1],
      endHour:this.onlineEndTime.split(':')[0],
      endMin:this.onlineEndTime.split(':')[1]
    }).subscribe((res:any)=>{
      
    })
  }
=======
>>>>>>> webfix/bellboy-copy
}
