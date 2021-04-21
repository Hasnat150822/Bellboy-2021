import { Component, OnInit  } from '@angular/core';
import { NgbCarouselConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { USER_NAME } from 'app/ngrx-states/model/url.model';
import { amazonUrl, confirmationDialog } from 'app/shared/services/global';
import { dataURLtoFile, GlobalService } from 'app/shared/services/global-service.service';
import { NgxImageCompressService } from 'ngx-image-compress';
import { ImageCroppedEvent, ImageTransform } from 'ngx-image-cropper';
import { Subscription } from 'rxjs';
import { AdvertisementService } from './advertisement.service';
declare const $:any;
@Component({
  selector: 'app-advertisement',
  templateUrl: './advertisement.component.html',
  styleUrls: ['./advertisement.component.scss'],
  providers: [NgbCarouselConfig]
})
export class AdvertisementComponent implements OnInit {
  highlighted: boolean = false;allAdvert:any=[];
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
  constructor(private modalService:NgbModal, private service:AdvertisementService,private gs:GlobalService, 
    private store:Store<USER_NAME>) {
   }
  currentRole
  ngOnInit() {
    this.store.subscribe((res:any)=>{
      if(res.UserData.data!==undefined){
        this.currentRole = res.UserData.data.role.title;
      }
    }, err=>{}, ()=>{this.subscription.unsubscribe()});
    this.getAdvert(null);
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
          slidesToShow: 2,
          slidesToScroll: 2
        }
      },
      {
        breakpoint: 605,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 2,
          infinite: true
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 2
        }
      }
    ]
  };
  getAdvert(status){
    this.service.getAdvertisement(status).subscribe((res:any)=>{
      this.allAdvert = res;
    });
  }
  async preview(files){
    this.imageFile = files[0];
     if(files.length===0){
       return false
     }else if(files[0].type.match(/image\/*/) == null){
       this.message = "Only images are supported.";
       return
     }else{
       await base64(files).then((data)=>{
         this.imgURL = data
       })
       this.gs.compress(this.imgURL, files[0].name).then((res:any)=>{
         let result = res[0]
         if(result.status == true){
           this.imageFile = result.file
           this.imgURL = result.con64
           return
         }
       })
     }
   }
  deleteAdvert(id){
    confirmationDialog().then((value)=>{
      if(value){
        alert('asdf')
        this.service.deleteAdvert(id)
        .subscribe(()=>{
          this.getAdvert(null);
        })
      }
    })
  }
  uploadImg(){
    this.submitted = true;
    if(this.imageFile != undefined){
      this.service.postAdvertisement(this.imageFile).subscribe((res:any)=>{
        this.modalService.dismissAll();
        this.getAdvert(null);
      },error=>{
        this.modalService.dismissAll();
      });
    }
  }
  updateStatus(status,id){
    this.service.changeStatus(status, id).subscribe(()=>{
      this.getAdvert(null);
    })
  }
  open(content){
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title' });
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

  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
    this.imageFile =  dataURLtoFile(this.croppedImage, this.tempFile.name);
}

  imageLoaded() {
      this.showCropper = true;
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