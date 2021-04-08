import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { VehicleTypeService } from '../manage-vehicle-type/vehicle-type.service';
import { ManageBrandService } from './manage-brand.service';
import { GlobalService } from 'app/shared/services/global-service.service';
import { PagerService } from 'app/shared/services/pager.service';
import { amazonUrl } from 'app/shared/services/global';
@Component({
  selector: 'app-manage-brand',
  templateUrl: './manage-brand.component.html',
  styleUrls: ['./manage-brand.component.scss']
})
export class ManageBrandComponent implements OnInit {
  addVehicleBrand:FormGroup
  allBrands:any = []
  tempBrands:any;
  pager:any = {};spinner:boolean;
  amazonImgUrl:string = amazonUrl;
  constructor(private modalService:NgbModal,private fb:FormBuilder,
    private globalService:GlobalService, private manageBrandService:ManageBrandService,
    private vehicleTypeService:VehicleTypeService, private pagerService:PagerService) { 
      this.addVehicleBrand = this.fb.group({
        brandTitle:['', Validators.required],
        vehicleType:['', Validators.required]
      })
    }
    allVehicleType:any = []
  ngOnInit() {
    this.vehicleTypeService.getVehicleType().subscribe((res:any)=>{
      this.allVehicleType = res.data.VehicleTypes
    })
    this.getBrands()
  }
  getBrands(){
    this.spinner = true;
    this.manageBrandService.getBrand().subscribe((res:any)=>{
      this.allBrands = res.data.VehicleBrands;
      this.tempBrands = this.allBrands;
      this.spinner = false;
      this.setPage(1)
    })
  }
  pagedItems:any = []
  setPage(page){
    if(page>this.pager.totalPages){
      page = this.pager.totalPages
    }else if(page<0){
      page = 1
    }
    this.pager = this.pagerService.getPager(this.tempBrands.length, page)
    this.pagedItems = this.tempBrands.slice(this.pager.startIndex, this.pager.endIndex+1)
  }
  searchBrand(keyword){
    if(keyword.length==0){
      this.tempBrands = this.allBrands;
      this.setPage(1)
    }else{
      keyword = keyword.toLowerCase()
      this.tempBrands =  this.allBrands.filter(f=> f.title.toLowerCase().indexOf(keyword) !==-1)
      this.setPage(1)
    }
  }
  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'})
  }
  currentImage
  bigImage(content, imgLink){
    this.currentImage  =this.amazonImgUrl+imgLink
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'})
  } 
  imgURL
  imageFile:File
  message
 async preview(files){
   this.imageFile = files[0]
    if(files.length===0){
      return false
    }else if(files[0].type.match(/image\/*/) == null){
      this.message = "Only images are supported.";
      return
    }else{
      await base64(files).then((data)=>{
        this.imgURL = data
      })
      this.globalService.compress(this.imgURL, files[0].name).then((res:any)=>{
        let result = res[0]
        if(result.status == true){
          this.imageFile = result.file
          this.imgURL = result.con64
          return
        }
      })
    }
  }
  submitted
  submitBrand(form:FormGroup){
    this.submitted = true
    let value = form.getRawValue()
    if(form.valid){
      this.manageBrandService.addBrand(value.brandTitle, this.imageFile, value.vehicleType)
      .subscribe((res:any)=>{
        if(res.success == true){
          this.modalService.dismissAll()
          form.reset()
          this.getBrands()
        }else{
          this.modalService.dismissAll()
          form.reset()
        }
      },error=>{
        this.modalService.dismissAll()
        form.reset()
      })
    }else{
      return false
    }
  }
}
function base64(files){
  return new Promise((resolve, reject)=>{
    const reader = new FileReader();
    reader.readAsDataURL(files[0])
    reader.onload = ()=>resolve(reader.result)
    reader.onerror = error=>reject(error)
 })
}