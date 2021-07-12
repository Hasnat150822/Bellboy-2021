import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ManageVehicleService } from '../manage-vehicle.service';
import { amazonUrl } from 'app/shared/services/global';

@Component({
  selector: 'app-manage-vehicle-detail',
  templateUrl: './manage-vehicle-detail.component.html',
  styleUrls: ['./manage-vehicle-detail.component.scss']
})
export class ManageVehicleDetailComponent implements OnInit, OnDestroy {
  currentImage
  _id
  subscription: Subscription;
  DetailVehicle;amazonImgUrl:string = amazonUrl;
  constructor(private modalService:NgbModal,private route:ActivatedRoute,
    private vehicleService: ManageVehicleService) { }
  ngOnInit() {
    this.subscription = this.route.params.subscribe((result)=>{
      this._id = result.id
    })
    this.getSingleVehicle()
  }
  getSingleVehicle(){
    this.vehicleService.getVehicleById(this._id).subscribe((res:any)=>{
      this.DetailVehicle = res.data
    })
  }
  approveVehicle(status){
    this.vehicleService.changeVehicleStatus(this._id, status).subscribe((res:any)=>
    {
      if(res.success == true){
        this.getSingleVehicle()
      }
    })
  }
  openModel(content, url) {
    this.currentImage  =  this.amazonImgUrl+url
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title', windowClass: 'bigImage', backdrop:'static', keyboard:false})
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }
}
