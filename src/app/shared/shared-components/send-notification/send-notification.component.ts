import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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
  promoCode:FormGroup = new FormGroup({
    code: new FormControl('', Validators.required)
  });
  
  public get code() {
    return this.promoCode.get('code');
  }
  
  @Input() type:string;
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

  ngOnChanges(){
  }

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
  if(this.title.hasError('required')){
    return 'Title is required'
  }
  if(this.title.hasError('maxlength')){
    return 'Maximum 30 character allowed'
  }
}
showDescriptionErrors(){
  if (this.description.hasError('required')) {
    return 'Description is required';
  }

  if (this.description.hasError('maxlength')) {
    return 'Maximum 250 character allowed';
  }
  }
  imageLoaded() {
      this.showCropper = true;
  }
  sendNotificationData(){
    let values = this.notificationForm.getRawValue();
    values['notificationImg'] = this.imageFile;
    if(this.type=='promoCode'){
      values['promoCode'] = this.promoCode.get('code').value;
    }
    this.notificationData.emit(values);
  }
}