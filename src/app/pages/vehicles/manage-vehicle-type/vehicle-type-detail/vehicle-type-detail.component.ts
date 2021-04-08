import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from '@angular/router';
import { VehicleTypeService } from '../vehicle-type.service';

@Component({
  selector: 'app-vehicle-type-detail',
  templateUrl: './vehicle-type-detail.component.html',
  styleUrls: ['./vehicle-type-detail.component.scss']
})
export class VehicleTypeDetailComponent implements OnInit {
  _id
  vehicleTypeDetail:any
  constructor(private modalService:NgbModal, private route:ActivatedRoute, 
    private vehicleTypeService:VehicleTypeService) { }

  ngOnInit() {
    this.route.params.subscribe((result)=>{
      this._id = result.id
    })
    this.getSingleVehicleType()
  }
  getSingleVehicleType(){
    this.vehicleTypeService.vehicleTyeDetail(this._id).subscribe((res:any)=>{
      this.vehicleTypeDetail = res.data
    })
  }
  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'})
  }  
}
