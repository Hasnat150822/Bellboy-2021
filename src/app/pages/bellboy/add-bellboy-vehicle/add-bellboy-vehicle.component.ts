import { Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, Renderer2 } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { dataURLtoFile } from 'app/shared/services/global-service.service';
import { ImageCroppedEvent, ImageTransform } from 'ngx-image-cropper';
import { VehicleTypeService } from '../../vehicles/manage-vehicle-type/vehicle-type.service';
import { ManageModelService } from '../../vehicles/manage-model/manage-model.service';
import { ManageBrandService } from '../../vehicles/manage-brand/manage-brand.service';
import { DomHandlingService } from 'app/shared/services/dom-handling.service';
import { AddVehicle } from '../modals/add-vehicle.modal';
import { BellboyService } from '../bellboy.service';
import { amazonUrl } from 'app/shared/services/global';

@Component({
  selector: 'app-add-bellboy-vehicle',
  templateUrl: './add-bellboy-vehicle.component.html',
  styleUrls: ['./add-bellboy-vehicle.component.scss'],
  providers:[DomHandlingService]
})

export class AddBellboyVehicleComponent implements OnInit, OnChanges {

  message;
  tempFile;
  imgFileF;
  imgFileB;
  imgFileL;
  imgFileR;
  imgFilePlate;
  imgFileRegF;
  imgFileRegB;
  imgFileRegO;
  imageChangedEvent: any = '';
  croppImgF : any = '';
  croppImgB : any = '';
  croppImgR : any = '';
  croppImgL : any = '';
  croppImgPlate : any = '';
  croppImgRegF : any = '';
  croppImgRegB : any = '';
  croppImgRegO : any = '';
  canvasRotation = 0;
  rotation = 0;
  scale = 1;
  showCropper = false;
  containWithinAspectRatio = false;
  transform: ImageTransform = {};
  headText:string="Vehicle Detail";
  vehicleForm:FormGroup = new FormGroup({
    vehicleType: new FormControl('', Validators.required),
    vehicleBrand: new FormControl('', Validators.required),
    vehicleModel: new FormControl('', Validators.required),
    color: new FormControl('', Validators.required),
    engineNumber: new FormControl('', Validators.required)
  });
  registrationForm:FormGroup = new FormGroup({
    regYear: new FormControl('', Validators.required)
  })
  numberPlate:FormGroup = new FormGroup({
    vehicleNumber: new FormControl('', Validators.required)
  })
  vehicleTypes:[];
  vehicleBrands:[];
  vehicleModels:[];
  @Input() bbId:string;
  @Input() owner : string;
  @Input() updateVehicle : any = {};
  @Output() closeAll = new EventEmitter();
  amazonUrl = amazonUrl;
  constructor(
    private modal:NgbModal,
    private el:ElementRef,
    private vehicleType:VehicleTypeService,
    private vehicleModel:ManageModelService,
    private vehicleBrand:ManageBrandService,
    private domHandling:DomHandlingService,
    private service:BellboyService
  ) { }
  
  ngOnInit() {
    this.getVehicleType();
    this.getVehicleBrand();
    this.getVehicleModel();
  }

  ngOnChanges(){
    if(this.updateVehicle){
      this.vehicleForm.patchValue({
        vehicleType:this.updateVehicle.vehicleType?._id,
        vehicleBrand:this.updateVehicle.vehicleBrand?._id,
        vehicleModel:this.updateVehicle.vehicleModel?._id,
        color:this.updateVehicle.color,
        engineNumber:this.updateVehicle?.engine_no
      })
      this.vehicleForm.markAllAsTouched();
      this.registrationForm.patchValue({
        regYear:this.updateVehicle.registration_year
      })
      this.registrationForm.markAllAsTouched();
      this.numberPlate.patchValue({
        vehicleNumber: this.updateVehicle.plate?.plate_number
      })
      this.numberPlate.markAllAsTouched();
      this.imgFileF = this.amazonUrl + this.updateVehicle.vehicle_images.front_image;
      this.imgFileB = this.amazonUrl + this.updateVehicle.vehicle_images.back_image;
      this.imgFileR = this.amazonUrl + this.updateVehicle.vehicle_images.right_image;
      this.imgFileL = this.amazonUrl + this.updateVehicle.vehicle_images.left_image;
      this.imgFilePlate = this.amazonUrl + this.updateVehicle.plate.plate_image;
      this.imgFileRegF = this.amazonUrl + this.updateVehicle.vehicle_reg_images.front_image;
      this.imgFileRegB = this.amazonUrl + this.updateVehicle.vehicle_reg_images.back_image;
      this.imgFileRegO = this.amazonUrl + this.updateVehicle.vehicle_reg_images.other_image;
      this.croppImgF = this.imgFileF;
      this.croppImgB = this.imgFileB;
      this.croppImgL = this.imgFileL;
      this.croppImgR = this.imgFileR;
      this.croppImgPlate = this.imgFilePlate;
      this.croppImgRegF = this.imgFileRegF;
      this.croppImgRegB = this.imgFileRegB;
      this.croppImgRegO = this.imgFileRegO;
    }
  }

  getVehicleType(){
    this.vehicleType.getVehicleType().subscribe((res:any)=>{
      this.vehicleTypes = res.data.VehicleTypes;
    });
  }

  getVehicleBrand(){
    this.vehicleBrand.getBrand().subscribe((res:any)=>{
      this.vehicleBrands = res.data.VehicleBrands;
    })
  }
  
  getVehicleModel(){
    this.vehicleModel.getVehicleModal().subscribe((res:any)=>{
      this.vehicleModels = res.data.vehicleModels;
    })
  }

  fileChangeEvent(which, event: any) {  
    this.whichCropper = which;
    this.showCropper = true;
    this.tempFile = event.target.files[0];
    this.imageChangedEvent = event;
    if(!this.tempFile){
      return false;
    }else if(this.tempFile.type.match(/image\/*/) == null){
      this.message = "Only images are supported.";
      return;
    }
  }
  whichCropper:string;
  croppedImage(event, which){
    this.whichCropper = which;
    switch (which) {
      case 'vehicleF':
        this.imgCroppedFront(event);
        break;
      case 'vehicleB':
        this.imgCroppedBack(event);
        break;
      case 'vehicleL':
        this.imgCroppedLeft(event);
        break;
      case 'vehicleR':
        this.imgCroppedRight(event);
        break;
      case 'vehiclePlate':
        this.imgCroppedPlate(event);
        break;
      case 'vehicleRegF':
        this.imgCroppedRegF(event);
        break;
      case 'vehicleRegB':
        this.imgCroppedRegB(event);
        break;
      case 'vehicleRegO':
        this.imgCroppedRegO(event);
        break;
      default:
        // this.imgCroppedChar(event);
        break;
    }
  }

  imgCroppedFront(event: ImageCroppedEvent){
    this.imageCropped(event).then((res:any)=>{
      this.imgFileF = res.imageFile;
      this.croppImgF = res.croppedImage;
    })
  }
  imgCroppedBack(event: ImageCroppedEvent){
    this.imageCropped(event).then((res:any)=>{
      this.imgFileB = res.imageFile;
      this.croppImgB = res.croppedImage;
    })
  }
  imgCroppedLeft(event: ImageCroppedEvent){
    this.imageCropped(event).then((res:any)=>{
      this.imgFileL = res.imageFile;
      this.croppImgL = res.croppedImage;
    })
  }
  imgCroppedRight(event: ImageCroppedEvent){
    this.imageCropped(event).then((res:any)=>{
      this.imgFileR = res.imageFile;
      this.croppImgR = res.croppedImage;
    })
  }
  imgCroppedPlate(event: ImageCroppedEvent){
    this.imageCropped(event).then((res:any)=>{
      this.imgFilePlate = res.imageFile;
      this.croppImgPlate = res.croppedImage;
    })
  }
  imgCroppedRegF(event: ImageCroppedEvent){
    this.imageCropped(event).then((res:any)=>{
      this.imgFileRegF = res.imageFile;
      this.croppImgRegF = res.croppedImage;
    })
  }
  imgCroppedRegB(event: ImageCroppedEvent){
    this.imageCropped(event).then((res:any)=>{
      this.imgFileRegB = res.imageFile;
      this.croppImgRegB = res.croppedImage;
    })
  }
  imgCroppedRegO(event: ImageCroppedEvent){
    this.imageCropped(event).then((res:any)=>{
      this.imgFileRegO = res.imageFile;
      this.croppImgRegO = res.croppedImage;
    })
  }
  imageCropped(event: ImageCroppedEvent) {
    return new Promise((resolve)=>{
      let croppedImage = event.base64;
      let imageFile =  dataURLtoFile(croppedImage, this.tempFile.name);
      resolve({croppedImage, imageFile})
    })

}

closeModal(){
  this.modal.dismissAll();
}

  
  imageLoaded() {
    this.showCropper = true;
}

submitVehicleDetail(){
  //current, next
  this.headText = "Vehicle Detail";
  this.showCropper = false;
  let all_activeCont = this.el.nativeElement.querySelector('div.show');
  all_activeCont.classList.remove('show', 'active');
  let currentCont = this.el.nativeElement.querySelector('#vehicle');
  currentCont.classList.add('show', 'active');
}

submitVehicleImages(){
  // current, previous, next
  this.headText = "Vehicle Images";
  this.showCropper = false;
  this.domHandling.changeDome(
    '#vehicle-tab-li', 
    '#vehicle-image-tab-li',
    '#vehicle-tab',
    '#vehicle-image-tab',
    '#vehicle-image'
    )
}

submitVehiclePlate(){
  // current, previous, next
  this.headText = "Vehicle Plate Number Image";
  this.showCropper = false;
  this.domHandling.changeDome(
    '#vehicle-image-tab-li', 
    '#plate-image-tab-li',
    '#vehicle-image-tab',
    '#plate-image-tab',
    '#plate-image'
    )
}

submitVehicleRegImages(){
  // current, previous, next
  this.headText = "Vehicle Registration Images";
  this.showCropper = false;
  this.domHandling.changeDome(
    '#plate-image-tab-li', 
    '#ref-image-tab-li',
    '#plate-image-tab',
    '#ref-image-tab',
    '#ref-image'
    )
}

isVehicleImages(){
  if(this.imgFileF && this.imgFileB && this.imgFileL && this.imgFileR){
    return true;
  }
}

isVehiclePlateImage(){
  if(this.imgFilePlate && this.numberPlate.valid)
    return true;
}

isVehicleRegImages(){
  if(this.imgFileRegF && this.imgFileRegB && this.imgFileRegO)
    return true;
}

manageVehicle(whichForm){
  let obj:AddVehicle = {
    vehicleType:this.vehicleForm.get('vehicleType').value,
    vehicleBrand:this.vehicleForm.get('vehicleBrand').value,
    vehicleModel:this.vehicleForm.get('vehicleModel').value,
    bellboy:this.bbId,
    front_image:this.imgFileF,
    back_image:this.imgFileB,
    left_image:this.imgFileL,
    right_image:this.imgFileR,
    color:this.vehicleForm.get('color').value,
    plate_image:this.imgFilePlate,
    plate_number:this.numberPlate.get('vehicleNumber').value,
    reg_front_image:this.imgFileRegF,
    reg_back_image:this.imgFileRegB,
    reg_other_image:this.imgFileRegO,
    owner:this.owner,
    engine_no:this.vehicleForm.get('engineNumber').value,
    registration_year:this.registrationForm.get('regYear').value
  }
  let api;
  if(whichForm == 'create'){
    api = this.service.addVehicle(obj);
  }else{
    api = this.service.updateVehicle(obj, this.updateVehicle._id);
  }
  api.subscribe((res:any)=>{
    this.closeAll.next();
    this.modal.dismissAll();
  }, ()=>{
    this.closeAll.next();
    this.modal.dismissAll();
  })
}

}
