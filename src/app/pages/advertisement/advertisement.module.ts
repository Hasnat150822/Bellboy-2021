import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdvertisementComponent } from './advertisement.component';
import { Routes, RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { ImageCropperModule } from 'ngx-image-cropper';
const route:Routes = [{
  path:'', component:AdvertisementComponent
}]
@NgModule({
  declarations: [AdvertisementComponent],
  imports: [
    CommonModule,
    NgbModule,
    SlickCarouselModule,
    RouterModule.forChild(route),
    ImageCropperModule
  ]
})
export class AdvertisementModule { }
