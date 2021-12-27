import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdvertisementComponent } from './advertisements/advertisement.component';
import { Routes, RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { ImageCropperModule } from 'ngx-image-cropper';
import { StoreModule } from '@ngrx/store';
import { userReducer } from 'app/ngrx-states/reducer';
import { ReactiveFormsModule } from '@angular/forms';
import { BBAdvertisementsComponent } from './bb-advertisements/bb-advertisements.component';
import { CustAdvertisementsComponent } from './cust-advertisements/cust-advertisements.component';
const route:Routes = [{
  path:'customer', component:CustAdvertisementsComponent,data:{
    text:'Customer Advertisements',
    path:'/customer'
  }
},{
  path:'bellboy', component:BBAdvertisementsComponent,data:{
    text:'Bellboy Advertisements',
    path:'/bellboy'
  }
}]
@NgModule({
  declarations: [AdvertisementComponent, BBAdvertisementsComponent, CustAdvertisementsComponent],
  imports: [
    CommonModule,
    NgbModule,
    SlickCarouselModule,
    ReactiveFormsModule,
    RouterModule.forChild(route),
    ImageCropperModule,
    StoreModule.forFeature("UserData", userReducer)
  ]
})
export class AdvertisementModule { }