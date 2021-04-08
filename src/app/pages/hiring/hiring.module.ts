import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HiringComponent } from './hiring.component';
import { Routes, RouterModule } from '@angular/router';
import { HiringDetailComponent } from './hiring-detail/hiring-detail.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AgmCoreModule } from '@agm/core';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { ReactiveFormsModule } from '@angular/forms';
import { ResolverService } from 'app/shared/services/resolver.service';
import { PipesModule } from 'app/shared/pipes/pipes.module';
import { TimeConvertModule } from 'app/shared/time-convert/time-convert.module';
import { StoreModule } from '@ngrx/store';
import { userReducer } from 'app/ngrx-states/reducer';
import { BigImageModule } from '../shared/big-image/big-image.module';
import { SharedDirectivesModule } from 'app/shared/shared-directives/shared-directives.module';
import { AgmDirectionModule } from 'agm-direction';
import { DecodeTimestampPipe } from './decode-timestamp.pipe';
const routes:Routes = [
  {
    path:'',
    component:HiringComponent
  },
  {
    path:'hiringDetail/:id',
    component:HiringDetailComponent,
    resolve:{data:ResolverService},
    data:{
      text: 'Hiring Detail',
      path:'/hiringDetail/:id'
    }
  }
]
@NgModule({
  declarations: [HiringComponent, HiringDetailComponent, DecodeTimestampPipe],
  imports: [
    CommonModule,
    NgbModule,
    AgmCoreModule,
    AgmDirectionModule,
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