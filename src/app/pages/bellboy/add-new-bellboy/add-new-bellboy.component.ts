import { Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, Renderer2 } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BellboyTypesService } from 'app/pages/bellboy-types/bellboy-types.service';
import { DomHandlingService } from 'app/shared/services/dom-handling.service';
import { amazonUrl } from 'app/shared/services/global';
import { dataURLtoFile } from 'app/shared/services/global-service.service';
import { ImageCroppedEvent, ImageTransform } from 'ngx-image-cropper';
import { Observable } from 'rxjs';
import { BellboyService } from '../bellboy.service';
import { NewBellboy } from '../modals/bellboy-hirings';
@Component({
  selector: 'app-add-new-bellboy',
  templateUrl: './add-new-bellboy.component.html',
  styleUrls: ['./add-new-bellboy.component.scss'],
  providers:[DomHandlingService]
})
export class AddNewBellboyComponent implements OnInit, OnChanges {

  @Input() detailBellboy;
  message;
  tempFile;
  imgFileAvatar:File;
  imgFileNicF:File;
  imgFileNicB:File;
  imgFileLisF:File;
  imgFileLisB:File;
  imgFileChar:File;
  imageChangedEvent: any = '';
  croppImgAvatar : any = '';
  croppImgNicF : any = '';
  croppImgNicB : any = '';
  croppImgLisF : any = '';
  croppImgLisB : any = '';
  croppImgChar : any = '';
  canvasRotation = 0;
  rotation = 0;
  scale = 1;
  showCropper = false;
  containWithinAspectRatio = false;
  transform: ImageTransform = {};
  headText:string="Profile Detail";
  profileForm:FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    mobile: new FormControl('', Validators.required),
    dateOfBirth: new FormControl('', Validators.required),
    BBType: new FormControl(''),
  });
  profileValues;
  nicForm:FormGroup = new FormGroup({
    nicValue: new FormControl('', Validators.required),
    nicExpiryDate: new FormControl('', Validators.required)
  });
  nicValues;
  liscenseForm:FormGroup = new FormGroup({
    value: new FormControl('', Validators.required),
    expiryDate: new FormControl('', Validators.required),
  });
  liscenseValues;
  characterForm:FormGroup = new FormGroup({
    no: new FormControl('', Validators.required),
    issueDate: new FormControl('', Validators.required),
  });
  characterValues;
  bbTypes$:Observable<any>;
  amazonUrl = amazonUrl;
  @Output() closeAll = new EventEmitter();
  bbId: string;
  constructor(
    private modal:NgbModal,
    private el:ElementRef,
    private rendrer2:Renderer2,
    private service:BellboyService,
    private bbService:BellboyTypesService,
    private domHandling:DomHandlingService
  ) { }
  
  ngOnInit() {
    this.getBBTypes();
  }

  ngOnChanges(){
    let dob = new Date();
    if(this.detailBellboy){
      this.profileForm.clearValidators();
      let bellboy = this.detailBellboy.bellBoy;
      dob.setFullYear(bellboy.birth_date?.year);
      dob.setMonth(bellboy.birth_date?.month);
      dob.setDate(bellboy.birth_date?.day);
      this.bbId = bellboy?._id;
      if(bellboy.avatar.exists){
        let el = this.el.nativeElement.querySelector('#BBType');
        this.rendrer2.setStyle(el, 'display', 'none');
        this.croppImgAvatar = this.amazonUrl+bellboy.avatar.value;
      }
      this.profileForm.patchValue({
        name:bellboy.name,
        email:bellboy.email,
        mobile:bellboy.mobile,
        dateOfBirth:dob
      })
      if(bellboy.legals.nic.back_image){
        this.croppImgNicB = this.amazonUrl+bellboy.legals.nic.back_image;
      }
      if(bellboy.legals.nic.front_image){
        this.croppImgNicF = this.amazonUrl+bellboy.legals.nic.front_image;
      }
      this.nicForm.patchValue({
        nicValue: bellboy.legals.nic.value,
        nicExpiryDate: toJSONLocal(bellboy.legals.nic.expiry_date)
      })
      if(bellboy.legals.driving_license.back_image){
        this.croppImgLisB = this.amazonUrl+bellboy.legals.driving_license.back_image;
      }
      if(bellboy.legals.driving_license.front_image){
        this.croppImgLisF = this.amazonUrl+bellboy.legals.driving_license.front_image;
      }
      this.liscenseForm.patchValue({
        value:bellboy.legals.driving_license.value,
        expiryDate:toJSONLocal(bellboy.legals.driving_license.expiry_date)
      })
      if(bellboy.legals.character_certificate.image){
        this.croppImgChar = this.amazonUrl+bellboy.legals.character_certificate.image;
      }
      this.characterForm.patchValue({
        no: bellboy.legals.character_certificate.no,
        issueDate:toJSONLocal(bellboy.legals.character_certificate.date_of_issue)
      })
    }
  }

  getBBTypes(){
    this.bbTypes$ = this.bbService.getBBTypeWithoutMap();
  }

  fileChangeEvent(which, event: any) {
    this.whichCropper = which;
    this.tempFile = event.target.files[0];
    this.imageChangedEvent = event;
    if(!this.tempFile){
      return false;
    }else if(this.tempFile.type.match(/image\/*/) == null){
      this.message = "Only images are supported.";
      return
    }
  }
  whichCropper:string;
  croppedImage(event, which){
    this.whichCropper = which;
    switch (which) {
      case 'avatar':
        this.imgCroppedAvatar(event);
        break;
      case 'nicF':
        this.imgCroppedNicF(event);
        break;
      case 'nicB':
        this.imgCroppedNicB(event);
        break;
      case 'lisF':
        this.imgCroppedLisF(event);
        break;
      case 'lisB':
        this.imgCroppedLisB(event);
        break;  
      default:
        this.imgCroppedChar(event);
        break;
    }
  }

  imgCroppedAvatar(event: ImageCroppedEvent){
    this.imageCropped(event).then((res:any)=>{
      this.imgFileAvatar = res.imageFile;
      this.croppImgAvatar = res.croppedImage;
    })
  }
  imgCroppedNicF(event: ImageCroppedEvent){
    this.imageCropped(event).then((res:any)=>{
      this.imgFileNicF = res.imageFile;
      this.croppImgNicF = res.croppedImage;
    })
  }
  imgCroppedNicB(event: ImageCroppedEvent){
    this.imageCropped(event).then((res:any)=>{
      this.imgFileNicB = res.imageFile;
      this.croppImgNicB = res.croppedImage;
    })
  }
  imgCroppedLisF(event: ImageCroppedEvent){
    this.imageCropped(event).then((res:any)=>{
      this.imgFileLisF = res.imageFile;
      this.croppImgLisF = res.croppedImage;
    })
  }
  imgCroppedLisB(event: ImageCroppedEvent){
    this.imageCropped(event).then((res:any)=>{
      this.imgFileLisB = res.imageFile;
      this.croppImgLisB = res.croppedImage;
    })
  }
  imgCroppedChar(event: ImageCroppedEvent){
    this.imageCropped(event).then((res:any)=>{
      this.imgFileChar = res.imageFile;
      this.croppImgChar = res.croppedImage;
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


profFormSubmit(){
  //current, next
  this.headText = "Profile Detail";
  this.showCropper = false;
  let all_activeCont = this.el.nativeElement.querySelector('div.show');
  all_activeCont.classList.remove('show', 'active');
  let currentCont = this.el.nativeElement.querySelector('#profile');
  currentCont.classList.add('show', 'active');
}

nicFormSubmit(){
  // current, previous, next
  this.headText = "CNIC Detail";
  this.showCropper = false;
  this.domHandling.changeDome(
    '#profile-tab-li', 
    '#nic-tab-li',
    '#profile-tab',
    '#nic-tab',
    '#nic'
    )
}


liscFormSubmit(){
  this.headText = "Liscence Detail";
  this.showCropper = false;
  this.domHandling.changeDome(
    '#nic-tab-li', 
    '#liscense-tab-li',
    '#nic-tab',
    '#liscense-tab',
    '#liscense'
    )
}

charFormSubmit(){
  this.headText = "Character Detail";
  this.showCropper = false;
  let all_activeCont = this.el.nativeElement.querySelector('div.show');
  let currentCont = this.el.nativeElement.querySelector('#character');
  let current_a = this.el.nativeElement.querySelector('#character-tab');
  let current_li = this.el.nativeElement.querySelector('#character-tab-li');
  let previous_li = this.el.nativeElement.querySelector('#liscense-tab-li');
  let previous_a = this.el.nativeElement.querySelector('#liscense-tab')
  all_activeCont.classList.remove('show', 'active');
  this.rendrer2.addClass(previous_a, 'done');
  this.rendrer2.addClass(previous_li, 'done');
  this.rendrer2.addClass(current_a, 'active');
  this.rendrer2.addClass(current_li, 'current');
  currentCont.classList.add('show', 'active');
}

submitbellboy(){
  this.profileValues = this.profileForm.getRawValue();
  this.nicValues = this.nicForm.getRawValue();
  this.liscenseValues = this.liscenseForm.getRawValue();
  this.characterValues = this.characterForm.getRawValue();
  let object = Object.assign({}, this.profileValues,this.nicValues, this.liscenseValues, this.characterValues);
  let dateOfBirth = new Date(object.dateOfBirth);
  let apiObject:NewBellboy = {
    avatar:this.imgFileAvatar, 
    name:object.name,
    email:object.email,
    mobile:object.mobile,
    day: dateOfBirth.getDay(),
    month:dateOfBirth.getMonth(),
    year:dateOfBirth.getFullYear(),
    nic_front_image:this.imgFileNicF,
    nic_back_image:this.imgFileNicB,
    nic_value:object.nicValue,
    nic_expiry_date:object.nicExpiryDate,
    drivinglicense_value:object.value,
    drivinglicense_front_image:this.imgFileLisF,
    drivinglicense_back_image:this.imgFileLisB,
    drivinglicense_expiry_date:object.expiryDate,
    charactercertificate_date_of_issue:object.issueDate,
    charactercertificate_image:this.imgFileChar,
    charactercertificate_no:object.no,
    bellboyType:object.BBType
  }
  this.service.submitBellboy(apiObject).subscribe((res)=>{
    this.closeAll.emit();
    this.modal.dismissAll();
  })
}

updateBellboyById(){
  this.profileValues = this.profileForm.getRawValue();
  this.nicValues = this.nicForm.getRawValue();
  this.liscenseValues = this.liscenseForm.getRawValue();
  this.characterValues = this.characterForm.getRawValue();
  let object = Object.assign({}, this.profileValues,this.nicValues, this.liscenseValues, this.characterValues);
  let dateOfBirth = new Date(object.dateOfBirth);
  let apiObject = {
    avatar:this.imgFileAvatar, 
    name:object.name,
    email:object.email,
    mobile:object.mobile,
    day: dateOfBirth.getDay(),
    month:dateOfBirth.getMonth(),
    year:dateOfBirth.getFullYear(),
    nic_front_image:this.imgFileNicF,
    nic_back_image:this.imgFileNicB,
    nic_value:object.nicValue,
    nic_expiry_date:object.nicExpiryDate,
    drivinglicense_value:object.value,
    drivinglicense_front_image:this.imgFileLisF,
    drivinglicense_back_image:this.imgFileLisB,
    drivinglicense_expiry_date:object.expiryDate,
    charactercertificate_date_of_issue:object.issueDate,
    charactercertificate_image:this.imgFileChar,
    charactercertificate_no:object.no
  }
  this.service.updateBellboyById(this.bbId, apiObject).subscribe(
    (res:any)=>{
      this.closeAll.emit();
      this.modal.dismissAll();
    }, ()=>{
      this.modal.dismissAll();
    }
  )
}
}

function toJSONLocal(date) {
  if(date)
    return date.slice(0, 10);
}