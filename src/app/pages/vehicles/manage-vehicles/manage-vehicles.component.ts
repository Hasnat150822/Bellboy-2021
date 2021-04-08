import { Component, OnInit, OnDestroy } from '@angular/core';
import { ManageVehicleService } from './manage-vehicle.service';
import { PagerService } from 'app/shared/services/pager.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-manage-vehicles',
  templateUrl: './manage-vehicles.component.html',
  styleUrls: ['./manage-vehicles.component.scss']
})
export class ManageVehiclesComponent implements OnInit, OnDestroy {
  permArr:any = []
  pager:any = {}
  tempArr:any = []
  subscription: Subscription;
  tabTitle = 'all'; placeVal:string = "Number";
  pagedItems:any[]
  spinner:boolean;
  constructor(private manageVehicle:ManageVehicleService, private pagerService:PagerService) { }
  ngOnInit() {
    this.getVehicles()
  }
  getVehicles(){
    this.pagedItems = []
    this.spinner = true
    this.subscription =  this.manageVehicle.getVehicles('').subscribe((res:any)=>{
      this.permArr = res.data.vehicles
      this.tempArr = res.data.vehicles
      this.spinner = false
      this.setPage(1);
    }, error=>{this.spinner = false;})
  }
  getPending(){
    this.pagedItems = []
    this.spinner = true;
    this.manageVehicle.getVehicles('?approval=0').subscribe((res:any)=>{
      this.permArr = res.data.vehicles;
      this.tempArr = res.data.vehicles;
      this.spinner = false;
      this.setPage(1);
    }, error=>{this.spinner = false;})
  }
  getApproved(){
    this.pagedItems = []
    this.spinner = true;
    this.manageVehicle.getVehicles('?approval=1').subscribe((res:any)=>{
      this.permArr = res.data.vehicles;
      this.tempArr = res.data.vehicles;
      this.spinner = false;
      this.setPage(1);
    }, error=>{this.spinner = false;})
  }
  approveVehicle(vId, status){
    this.manageVehicle.changeVehicleStatus(vId, status).subscribe((res:any)=>
    {
      if(res.success == true){
        this.getPending();
      }
    })
  }
  setPage(page){
    if(page>this.pager.totalPages){
      page = this.pager.totalPages
    }else if(page<0){
      page = 1
    } 
    this.pager = this.pagerService.getPager(this.tempArr.length, page);
    this.pagedItems = this.tempArr.slice(this.pager.startIndex, this.pager.endIndex+1);
  }
  searchByNumber(keyword){
    if(keyword.length == 0){
      this.tempArr = this.permArr;
      this.setPage(1);
    }else{
      this.tempArr = this.permArr.filter((value:any)=>{
        return value.plate.plate_number.indexOf(keyword)>-1;
      })
      this.setPage(1);
    }
  }
  searchByModel(keyword){
    if(keyword.length == 0){
      this.tempArr = this.permArr;
      this.setPage(1);
    }else{
      this.tempArr = this.permArr.filter((value:any)=>{
        return value.vehicleModel.title.indexOf(keyword)>-1;
      })
      this.setPage(1);
    }
  }
  searchByBrand(keyword){
    keyword = keyword.toLowerCase();
    if(keyword.length == 0){
      this.tempArr = this.permArr;
      this.setPage(1);
    }else{
      this.tempArr = this.permArr.filter((value:any)=>{
        return value.vehicleBrand.title.toLowerCase().indexOf(keyword)>-1;
      })
      this.setPage(1);
    }
  }
  searchByBellboy(keyword){
    keyword = keyword.toLowerCase();
    if(keyword.length == 0){
      this.tempArr = this.permArr;
      this.setPage(1);
    }else{
      this.tempArr = this.permArr.filter((value:any)=>{
        return value.bellboy.name.toLowerCase().indexOf(keyword)>-1;
      })
      this.setPage(1);
    }
  }
  ngOnDestroy() { 
    this.subscription.unsubscribe()
  }
}