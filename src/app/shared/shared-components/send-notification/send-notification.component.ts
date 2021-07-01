import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  @Output() notificationData = new EventEmitter<{}>();
  constructor(private fb:FormBuilder, private modalService:NgbModal) { 
    this.notificationForm = this.fb.group({
      title:['', {validators:[Validators.required]}],
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

  imageLoaded() {
      this.showCropper = true;
  }
  sendNotificationData(){
    let values = this.notificationForm.getRawValue();
    values['notificationImg'] = this.imageFile;
    this.notificationData.emit(values);
  }
}