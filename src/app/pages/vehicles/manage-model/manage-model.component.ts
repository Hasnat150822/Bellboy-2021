import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ManageBrandService } from '../manage-brand/manage-brand.service';
import { VehicleTypeService } from '../manage-vehicle-type/vehicle-type.service';
import { ManageModelService } from './manage-model.service';
import { PagerService } from 'app/shared/services/pager.service';
import { amazonUrl } from 'app/shared/services/global';
declare const $:any;
@Component({
  selector: 'app-manage-model',
  templateUrl: './manage-model.component.html',
  styleUrls: ['./manage-model.component.scss']
})
export class ManageModelComponent implements OnInit {
  addVehicleModel:FormGroup;
  search2:any;
  allTypes:any;
  selectedbrands:any;
  brandId:any
  allBrands:any;
  permArr:any;
  tempArr:any;
  searchResult:any;
  pager:any = {};placeVal:string = 'Brand'
  pagedItems:any; submitted:boolean;
  spinner:boolean;
  amazonImgUrl:string = amazonUrl;
  constructor(private modalService:NgbModal, private formbuilder:FormBuilder,
    private vehicleBrandService:ManageBrandService, private vehicleTypeService:VehicleTypeService,
    private manageModel:ManageModelService, private pagerService:PagerService) {
    this.addVehicleModel = this.formbuilder.group({
      selectType:['', Validators.required],
      vehicleModel:['', Validators.required]
    })
   }
  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'})
  }
  open2(content){
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title', windowClass: 'my-class'})
  }
  ngOnInit() {
    this.getAllBrands()
    this.getAllTypes()
    this.getVehicleModel()
  }
  getAllBrands(){
    this.vehicleBrandService.getBrand().subscribe((res:any)=>{
      this.allBrands = res.data.VehicleBrands;
    })
  }
  setPage(page){
    if(page>this.pager.totalPages){
      page = this.pager.totalPages
    }else if(page<0){
      page = 1
    }
    this.pager = this.pagerService.getPager(this.tempArr.length, page)
    this.pagedItems = this.tempArr.slice(this.pager.startIndex, this.pager.endIndex+1)
  }
  searchBrand(keyword){
    if(keyword.length==0){
      this.searchResult = this.allBrands
    }else{
      keyword = keyword.toLowerCase()
      this.searchResult = this.allBrands.filter(f=> f.title.toLowerCase().indexOf(keyword) !==-1)
    }
  }  
  searchByModel(keyword){
    if(keyword.length==0){
      this.tempArr = this.permArr;
      this.setPage(1)
    }else{
      keyword = keyword.toLowerCase()
      this.tempArr =  this.permArr.filter(f=> f.title.toLowerCase().indexOf(keyword) !==-1)
      this.setPage(1);
    }
  }
  searchByBrand(keyword){
    if(keyword.length==0){
      this.tempArr = this.permArr;
      this.setPage(1)
    }else{
      keyword = keyword.toLowerCase()
      this.tempArr =  this.permArr.filter(f=> f.vehicleBrand.title.toLowerCase().indexOf(keyword) !==-1)
      this.setPage(1)
    }
  }
  sIndex
  selectionBrand(obj){
    $('#brandInput').val(obj.title)
    this.brandId = obj._id
  }
  getAllTypes(){
    this.vehicleTypeService.getVehicleType().subscribe((res:any)=>{
      this.allTypes = res.data.VehicleTypes
    })
  }
  getVehicleModel(){
    this.spinner = true;
    this.manageModel.getVehicleModal().subscribe((res:any)=>{
      this.permArr = res.data.vehicleModels;
      this.tempArr = this.permArr;
      this.spinner = false;
      this.setPage(1);
    })
  }  
  submitModel(form:FormGroup){
    if(form.valid && $('#brandInput').val()!=''){
      let values = this.addVehicleModel.getRawValue()
      let title = values.vehicleModel
      let typeID = values.selectType
      this.manageModel.addVehicleModal(title, this.brandId, typeID)
      .subscribe((res:any)=>{
        if(res.success == true){
          form.reset();
          this.modalService.dismissAll();
          this.getVehicleModel()
          this.search2 = ''
        }else{
          form.reset();
          this.modalService.dismissAll();
          this.search2 = ''
        }
      }, error=>{
        form.reset();
        this.search2 = ''
        this.modalService.dismissAll();
      })
    }else{
      return false
    }
  }
}
