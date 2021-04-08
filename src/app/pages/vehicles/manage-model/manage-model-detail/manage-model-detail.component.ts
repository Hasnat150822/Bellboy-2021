import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ManageModelService } from '../manage-model.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-manage-model-detail',
  templateUrl: './manage-model-detail.component.html',
  styleUrls: ['./manage-model-detail.component.scss']
})
export class ManageModelDetailComponent implements OnInit {
  _id
  detailVehicelModel
  constructor(private modalService:NgbModal, private manageModel:ManageModelService,
    private route:ActivatedRoute) { }
  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'})
  }  
  ngOnInit() {
    this.route.params.subscribe((result)=>{
      this._id = result.id
    })
    this.getSingleVehicleModel()
  }
  getSingleVehicleModel(){
    this.manageModel.getVehicleModelById(this._id).subscribe((res:any)=>{
      this.detailVehicelModel = res.data
    })
  }
}
