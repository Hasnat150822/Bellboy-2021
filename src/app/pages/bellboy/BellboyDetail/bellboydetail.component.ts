import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BellboyService } from '../bellboy.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ManageVehicleService } from 'app/pages/vehicles/manage-vehicles/manage-vehicle.service';
import { amazonUrl, confirmationDialog, url } from 'app/shared/services/global';
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
  constructor(private activatedRote:ActivatedRoute,private modalService:NgbModal, 
    private bellboyService:BellboyService, private manageVehicle:ManageVehicleService) {
   }
  ngOnInit() {
    this._id = this.activatedRote.params['value'].id
    this.getBellboyDetail()
  }
  openModel(content, Url) {
    this.currentImage  = Url;
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title', windowClass: 'bigImage'})
  }
  open(content){
    this.modalService.open(content, { ariaLabelledBy:'modal-basic-title', windowClass: 'my-class'})
  }
  getBellboyDetail(){
    this.bellboyService.getById(this._id).subscribe((res:any)=>{
      this.detailBellboy = res.data
    })
  }
  changeNIC(status){
    confirmationDialog().then((result)=>{
      if(result == true){
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
      if(result == true){
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
}
