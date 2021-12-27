import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HiringComponent } from './hiring.component';
import { Routes, RouterModule } from '@angular/router';
<<<<<<< HEAD
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { ReactiveFormsModule } from '@angular/forms';
import { PipesModule } from 'app/shared/pipes/pipes.module';
import { TimeConvertModule } from 'app/shared/pipes/time-convert/time-convert.module';
=======
import { HiringDetailComponent } from './hiring-detail/hiring-detail.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AgmCoreModule } from '@agm/core';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { ReactiveFormsModule } from '@angular/forms';
import { PipesModule } from 'app/shared/pipes/pipes.module';
import { TimeConvertModule } from 'app/shared/time-convert/time-convert.module';
>>>>>>> webfix/bellboy-copy
import { StoreModule } from '@ngrx/store';
import { userReducer } from 'app/ngrx-states/reducer';
import { BigImageModule } from '../../shared/shared-components/big-image/big-image.module';
import { SharedDirectivesModule } from 'app/shared/shared-directives/shared-directives.module';
<<<<<<< HEAD
import { DetailPageComponent } from './detail-page/detail-page.component';
import { RideDetailComponent } from './ride-detail/ride-detail.component';
import { LocationCardComponent } from './location-card/location-card.component';
import { ShowMapDirective } from './directives/show-map.directive';
=======
import { AgmDirectionModule } from 'agm-direction';
import { DecodeTimestampPipe } from './decode-timestamp.pipe';
>>>>>>> webfix/bellboy-copy
const routes:Routes = [
  {
    path:'',
    component:HiringComponent
  },
  {
    path:'hiringDetail/:id',
<<<<<<< HEAD
    component:DetailPageComponent,
=======
    component:HiringDetailComponent,
>>>>>>> webfix/bellboy-copy
    data:{
      text: 'Hiring Detail',
      path:'/hiringDetail/:id'
    }
  }
]
@NgModule({
<<<<<<< HEAD
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
=======
  declarations: [HiringComponent, HiringDetailComponent, DecodeTimestampPipe],
  imports: [
    CommonModule,
    NgbModule,
    AgmCoreModule,
    AgmDirectionModule,
>>>>>>> webfix/bellboy-copy
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