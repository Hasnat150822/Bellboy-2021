import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ManageBrandService } from '../manage-brand.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-manage-brand-detail',
  templateUrl: './manage-brand-detail.component.html',
  styleUrls: ['./manage-brand-detail.component.scss']
})
export class ManageBrandDetailComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  _id
  detailBrand:any
  constructor(private modalService:NgbModal, private manageBrand:ManageBrandService,
    private route:ActivatedRoute) { }
  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'})
  }
  ngOnInit() {
    this.subscription = this.route.params.subscribe((result:any)=>{
      this._id = result.id
    })  
    this.getVehicleBrand()
  }
  getVehicleBrand(){  
    this.manageBrand.getBrandById(this._id).subscribe((res:any)=>{
      this.detailBrand = res.data
    })
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }
}
