import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HiringComponent } from './hiring.component';
import { Routes, RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { ReactiveFormsModule } from '@angular/forms';
import { PipesModule } from 'app/shared/pipes/pipes.module';
import { TimeConvertModule } from 'app/shared/pipes/time-convert/time-convert.module';
import { StoreModule } from '@ngrx/store';
import { userReducer } from 'app/ngrx-states/reducer';
import { BigImageModule } from '../../shared/shared-components/big-image/big-image.module';
import { SharedDirectivesModule } from 'app/shared/shared-directives/shared-directives.module';
import { DetailPageComponent } from './detail-page/detail-page.component';
import { RideDetailComponent } from './ride-detail/ride-detail.component';
import { LocationCardComponent } from './location-card/location-card.component';
import { ShowMapDirective } from './directives/show-map.directive';
const routes:Routes = [
  {
    path:'',
    component:HiringComponent
  },
  {
    path:'hiringDetail/:id',
    component:DetailPageComponent,
    data:{
      text: 'Hiring Detail',
      path:'/hiringDetail/:id'
    }
  }
]
@NgModule({
  declarations: [
    HiringComponent, 
    DetailPageComponent, 
    RideDetailComponent, 
    LocationCardComponent,
    ShowMapDirective
  ],
  imports: [
    CommonModule,
    NgbModule,
    PipesModule,
    TimeConvertModule,
    SharedDirectivesModule,
    ReactiveFormsModule,
    PerfectScrollbarModule,
    BigImageModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature("UserData", userReducer)
  ]
})
export class HiringModule { }