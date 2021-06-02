import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomersComponent } from './customers.component';
import { Routes, RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CustomerDetailComponent } from './customer-detail/customer-detail.component';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { ResolverService } from 'app/shared/services/resolver.service';
import { AgmCoreModule } from '@agm/core';
import { DeviceCodePipe } from './device-code.pipe';
import { ReactiveFormsModule } from '@angular/forms';
import { TimeConvertModule } from 'app/shared/time-convert/time-convert.module';
import { BigImageModule } from '../shared/big-image/big-image.module';
import { StoreModule } from '@ngrx/store';
import { userReducer } from 'app/ngrx-states/reducer';
import { PipesModule } from 'app/shared/pipes/pipes.module';
import { SharedDirectivesModule } from 'app/shared/shared-directives/shared-directives.module';
import { ImageCropperModule } from 'ngx-image-cropper';
const routes:Routes = [
  {
    path:'',
    component:CustomersComponent
  },
  {
    path:'custdetail/:id',
    component:CustomerDetailComponent,
    resolve:{data:ResolverService},
    data:{
      text:'Customer Detail',
      path:'/custdetail/:id',
      nav:true,
      breadcrumbs:true
    }
  }
]
@NgModule({
  declarations: [CustomersComponent, CustomerDetailComponent, DeviceCodePipe],
  imports: [
    CommonModule,
    NgbModule,
    AgmCoreModule,
    ReactiveFormsModule,
    SharedDirectivesModule,
    PerfectScrollbarModule,
    TimeConvertModule,
    ImageCropperModule,
    BigImageModule,
    PipesModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature("UserData", userReducer)
  ]
})
export class CustomersModule { }
