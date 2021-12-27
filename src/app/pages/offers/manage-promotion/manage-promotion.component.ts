import { Component, OnInit} from '@angular/core';
import { Router } from "@angular/router";
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BellboyTypesService } from 'app/pages/bellboy-types/bellboy-types.service';
import { dataURLtoFile } from 'app/shared/services/global-service.service';
import { ImageCroppedEvent, ImageTransform } from 'ngx-image-cropper';
import { Observable } from 'rxjs';
import { OfferService } from "../offers.service";
import { OfferModel } from "../../../shared/models/offers.model";

@Component({
  selector: 'app-manage-promotion',
  templateUrl: './manage-promotion.component.html',
  styleUrls: ['./manage-promotion.component.css'],
  providers:[OfferService]
})
export class ManagePromotionComponent implements OnInit {

  type:string;
  pageType:string;
  ckeConfig: any;
  allBBType:Observable<any>;
  message
  tempFile
  imageFile:File;
  imageChangedEvent: any = '';
  croppedImage: any = '';
  canvasRotation = 0;
  rotation = 0;
  scale = 1;
  showCropper = false;
  containWithinAspectRatio = false;
  _id:string;
  offersForm:FormGroup = new FormGroup({
    title: new FormControl('', Validators.required),
    body: new FormControl('', Validators.required),
    code: new FormControl('', Validators.required),
    isPercent: new FormControl('', Validators.required),
    isLimited: new FormControl('', Validators.required),
    amount: new FormControl('', Validators.required),
    expiryDate: new FormControl('', Validators.required),
    max: new FormControl(''),
    bellboyType: new FormControl('', Validators.required)
  });
  spinner:boolean;
  transform: ImageTransform = {};
  singleOffer:OfferModel;
  parentRoute:string;
  constructor(
    private activatedRoute:ActivatedRoute,
    private bbTypeService:BellboyTypesService,
    private service:OfferService,
    private router:Router
  ) {
   }
   
   public get isLimitedValue() {
     return this.offersForm.get('isLimited').value;
   }
   
   public get isPercentValue() {
     return this.offersForm.get('isPercent').value;
   }

   
   public get expiryDate() {
     return this.offersForm.get('expiryDate').value;
   }
   
   
   public get bellboyType() {
     return this.offersForm.get('bellboyType').value;
   }
   

  ngOnInit() {
    this.parentRoute = this.activatedRoute.snapshot.parent.data.path;
    this.activatedRoute.queryParams.subscribe((res:any)=>{
      this.type = res.type;
      this._id = res.id;
      this.pageType = res.pageType;
    })
    this.ckeConfig = {
      allowedContent: false,
      extraPlugins: 'divarea',
      forcePasteAsPlainText: true,
      removeButtons: 'Save,NewPage,Print,PasteText,PasteFromWord,SelectAll,Form,Checkbox,Radio,TextField,Textarea,Select,Button,ImageButton,HiddenField,CopyFormatting,RemoveFormat,CreateDiv,BidiLtr,BidiRtl,Language,Unlink,Flash,PageBreak,Iframe,ShowBlocks,About,Image'
    };
    this.getAllBBType();
    this.getSingleOffer();
  }
  getAllBBType(){
    this.allBBType = this.bbTypeService.getBBTypeWithoutMap();
  }
  getSingleOffer(){
    if(this._id){
      this.service.getBellboySingleOffer(this._id).subscribe((res:OfferModel)=>{
        this.singleOffer = res;
        this.setFormValues();
      })
    }
  }
  setFormValues(){
    if(this.singleOffer){
      this.offersForm.get('title').setValue(this.singleOffer.title)
      this.offersForm.get('body').setValue(this.singleOffer.body)
      this.offersForm.get('code').setValue(this.singleOffer.code)
      this.offersForm.get('isPercent').setValue(this.singleOffer.isPercent)
      this.offersForm.get('isLimited').setValue(this.singleOffer.isLimited)
      this.offersForm.get('amount').setValue(this.singleOffer.amount)
      this.offersForm.get('expiryDate').setValue(new Date(this.singleOffer.expiryDate))
      this.offersForm.get('max').setValue(this.singleOffer.max)
      if(this.singleOffer.bellboyTypes.length>0){
        this.offersForm.get('bellboyType').markAsTouched();
        this.offersForm.get('bellboyType').markAsPristine();
        this.offersForm.get('bellboyType').setValue(this.singleOffer.bellboyTypes[0].title, {onlySelf:true})
      }
    }
  }
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
  manageOffers(){
    this.spinner = true;
    let formValues = this.offersForm.getRawValue();
    let api;
    if(this.type === 'Update'){
      api = this.service.manageOffers(this.imageFile, formValues , this.type, this._id, this.pageType)
    }else{
      api = this.service.manageOffers(this.imageFile, formValues , this.type, undefined, this.pageType)
    }
    api
    .subscribe(()=>{
      this.spinner = false;
      this.offersForm.reset();
      this.router.navigate([this.parentRoute]);
    })
  }
  markAsTouched(){
    this.offersForm.controls.body.markAsTouched();
  }
}