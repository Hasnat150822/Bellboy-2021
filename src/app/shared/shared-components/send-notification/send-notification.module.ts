import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SendNotificationComponent } from './send-notification.component';
import { ImageCropperModule } from 'ngx-image-cropper';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [SendNotificationComponent],
  imports: [
    CommonModule,
    ImageCropperModule,
    ReactiveFormsModule
  ],exports:[
    SendNotificationComponent
  ]
})
export class SendNotificationModule { }
