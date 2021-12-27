import { Component, Input, OnInit  } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbCarouselConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { USER_NAME } from 'app/ngrx-states/model/url.model';
import { amazonUrl, confirmationDialog } from 'app/shared/services/global';
import { dataURLtoFile, GlobalService } from 'app/shared/services/global-service.service';
import { ImageCroppedEvent, ImageTransform } from 'ngx-image-cropper';
import { Subscription } from 'rxjs';
import { AdvertisementService } from '../advertisement.service';
declare const $:any;
@Component({
  selector: 'app-advertisement',
  templateUrl: './advertisement.component.html',
  styleUrls: ['./advertisement.component.scss'],
  providers: [NgbCarouselConfig]
})
export class AdvertisementComponent implements OnInit {
  highlighted: boolean = false;allAdvert:any=[];
  @Input() type;
  headStatus:string = 'all';lastIndex;
  imageFile:File;message:string;submitted:boolean;imgURL;
  imageChangedEvent: any = '';
  croppedImage: any = '';
  canvasRotation = 0;
  rotation = 0;
  scale = 1;
  showCropper = false;
  containWithinAspectRatio = false;
  transform: ImageTransform = {};
  subscription:Subscription;
  amazonUrl = amazonUrl;
  advertForm:FormGroup;
  constructor(
    private modalService:NgbModal, 
    private service:AdvertisementService,private gs:GlobalService, 
    private store:Store<USER_NAME>, private fb:FormBuilder) {
      this.advertForm = this.fb.group({
        'title':'',
        'desc':''
      })
   }
  currentRole;
  ngOnInit() {
    this.service.typeComponent.next(this.type);
    this.store.subscribe((res:any)=>{
      if(res.UserData.data!==undefined){
        this.currentRole = res.UserData.data.role.title;
      }
    }, err=>{}, ()=>{this.subscription.unsubscribe()});
    this.getAdvert(null, null,null);
  }
  slideConfig = {
    infinite: true,
    speed: 900,
    autoplay: false,
    slidesToShow: 3,
    slidesToScroll: 2,
    prevArrow: '<button class="leftRs ft-chevron-left"></button>',
    nextArrow: '<button class="rightRs ft-chevron-right"></button>',
    responsive: [
      {
        breakpoint: 1025,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true
        }
      },
      {
        breakpoint: 769,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 605,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };
  getAdvert(status, year, month){
    this.service.getAdvertisement(status, year, month).subscribe((res:any)=>{
      this.allAdvert = res;
    });
  }
  deleteAdvert(id){
    confirmationDialog('').then((result)=>{
      if(result.value){
        this.service.deleteAdvert(id)
        .subscribe(()=>{
          this.getAdvert(null, null, null);
        })
      }
    })
  }
  submitForm(){
    this.submitted = true;
    let values = this.advertForm.getRawValue();
    if(this.imageFile != undefined){
      this.service.postAdvertisement(this.imageFile, values.title, values.desc).subscribe((res:any)=>{
        this.modalService.dismissAll();
        this.getAdvert(null, null, null);
      },error=>{
        this.modalService.dismissAll();
      });
    }
  }
  updateStatus(status,id){
    this.service.changeStatus(status, id).subscribe(()=>{
      this.getAdvert(null, null,null);
    })
  }
  open(content){
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title', keyboard:false });
  }
  tempFile
  fileChangeEvent(event: any) {
    this.tempFile = event.target.files[0];
    this.imageChangedEvent = event;
    if(!this.tempFile){
      return false;
    }else if(this.tempFile.type.match(/image\/*/) == null){
      this.message = "Only images are supported.";
      return
    }
  }
  height:number; width:number;
  imageCropped(event: ImageCroppedEvent) {
    this.height = event.height;
    this.width = event.width;
    this.croppedImage = event.base64;
    this.imageFile =  dataURLtoFile(this.croppedImage, this.tempFile.name);
}

  imageLoaded() {
      this.showCropper = true;
  }
  getDate(event){
    let year = event.split('-')[0];
    let month = event.split('-')[1];
    this.getAdvert(null,year, month )
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