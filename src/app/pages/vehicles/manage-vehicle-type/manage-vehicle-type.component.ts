import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { VehicleTypeService } from './vehicle-type.service';
import Swal from 'sweetalert2';
import { GlobalService } from 'app/shared/services/global-service.service';
import { amazonUrl } from 'app/shared/services/global';
@Component({
  selector: 'app-manage-vehicle-type',
  templateUrl: './manage-vehicle-type.component.html',
  styleUrls: ['./manage-vehicle-type.component.scss']
})
export class ManageVehicleTypeComponent implements OnInit {
  vehicleType:FormGroup
  submitted:boolean; spinner:boolean;
  amazonImgUrl:string = amazonUrl;
  constructor(private modalService:NgbModal,
    private globalService:GlobalService, private fb:FormBuilder,
    private vehicleTypeService:VehicleTypeService ) {
      this.vehicleType = this.fb.group({
        type:['', Validators.required]
      })
     }

  open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', backdrop:'static', keyboard:false})
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
  allVehicleTypes:any = []
  ngOnInit() {
    this.getVehicleType()
  }
  getVehicleType(){
    this.spinner = true;
    this.vehicleTypeService.getVehicleType().subscribe((res:any)=>{
      this.allVehicleTypes = res.data.VehicleTypes
      this.spinner = false;
    })
  }
  addVehicle(form:FormGroup){
    let value = form.getRawValue().type
    this.submitted = true
    if(form.valid){
      this.vehicleTypeService.addVehiceType(value, this.imageFile, true)
      .subscribe((res:any)=>{
        if(res.success === true){
          this.getVehicleType()
          form.reset()
          Swal.fire({
            icon:'success',
            text:'Added',
            width:'400px',
            timer:2500,
            showCancelButton:false,
            showConfirmButton:false
          })
          this.modalService.dismissAll()
        }else{
          form.reset()
          Swal.fire({
            icon:'error',
            text:res.message,
            width:'400px',
            timer:2500,
            showCancelButton:false,
            showConfirmButton:false
          })
          this.modalService.dismissAll()
        }
      },error=>{
        this.modalService.dismissAll()
        form.reset()
        Swal.fire({
          icon:'error',
          text:error.error.message,
          width:'400px',
          timer:2500,
          showCancelButton:false,
          showConfirmButton:false
        })
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