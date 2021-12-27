<<<<<<< HEAD
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
=======
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
>>>>>>> webfix/bellboy-copy
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { dataURLtoFile } from 'app/shared/services/global-service.service';
import { ImageCroppedEvent, ImageTransform } from 'ngx-image-cropper';

@Component({
  selector: 'app-send-notification',
  templateUrl: './send-notification.component.html',
  styleUrls: ['./send-notification.component.css']
})
export class SendNotificationComponent implements OnInit {
  notificationForm:FormGroup;
<<<<<<< HEAD
  promoCode:FormGroup = new FormGroup({
    code: new FormControl('', Validators.required)
  });
  
  public get code() {
    return this.promoCode.get('code');
  }
  
  @Input() type:string;
=======
>>>>>>> webfix/bellboy-copy
  @Output() notificationData = new EventEmitter<{}>();
  constructor(private fb:FormBuilder, private modalService:NgbModal) { 
    this.notificationForm = this.fb.group({
      title:['', {validators:[Validators.required, Validators.maxLength(30)]}],
      description:['',{validators:[Validators.required, Validators.maxLength(250)]}]
    })
   }

   public get title() {
    return this.notificationForm.controls['title'];
  }
  public get description() {
    return this.notificationForm.controls['description'];
  }
  ngOnInit(): void {
  }

<<<<<<< HEAD
  ngOnChanges(){
  }

=======
>>>>>>> webfix/bellboy-copy
  closeModal(){
    this.modalService.dismissAll();
  }
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
  transform: ImageTransform = {};
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
showTitleErrors(){
<<<<<<< HEAD
  if(this.title.hasError('required')){
    return 'Title is required'
  }
  if(this.title.hasError('maxlength')){
=======
  if(this.title.errors.required){
    return 'Title is required'
  }
  if(this.title.errors.maxlength){
>>>>>>> webfix/bellboy-copy
    return 'Maximum 30 character allowed'
  }
}
showDescriptionErrors(){
<<<<<<< HEAD
  if (this.description.hasError('required')) {
    return 'Description is required';
  }

  if (this.description.hasError('maxlength')) {
=======
  if (this.description.errors.required) {
    return 'Description is required';
  }

  if (this.description.errors.maxlength) {
>>>>>>> webfix/bellboy-copy
    return 'Maximum 250 character allowed';
  }
  }
  imageLoaded() {
      this.showCropper = true;
  }
  sendNotificationData(){
    let values = this.notificationForm.getRawValue();
    values['notificationImg'] = this.imageFile;
<<<<<<< HEAD
    if(this.type=='promoCode'){
      values['promoCode'] = this.promoCode.get('code').value;
    }
=======
>>>>>>> webfix/bellboy-copy
    this.notificationData.emit(values);
  }
}