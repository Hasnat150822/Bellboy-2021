import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomersComponent } from './customers.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CustomerDetailComponent } from './customer-detail/customer-detail.component';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
<<<<<<< HEAD
import { DeviceCodePipe } from './device-code.pipe';
import { TimeConvertModule } from 'app/shared/pipes/time-convert/time-convert.module';
=======
import { AgmCoreModule } from '@agm/core';
import { DeviceCodePipe } from './device-code.pipe';
import { TimeConvertModule } from 'app/shared/time-convert/time-convert.module';
>>>>>>> webfix/bellboy-copy
import { BigImageModule } from '../../shared/shared-components/big-image/big-image.module';
import { StoreModule } from '@ngrx/store';
import { userReducer } from 'app/ngrx-states/reducer';
import { PipesModule } from 'app/shared/pipes/pipes.module';
import { SharedDirectivesModule } from 'app/shared/shared-directives/shared-directives.module';
import { SendNotificationModule } from 'app/shared/shared-components/send-notification/send-notification.module';
import { WalletDetailModule } from '../../shared/shared-components/wallet-detail/wallet-detail.module';
import { CustomersRoutingModule } from './customers-routing.module';

@NgModule({
  declarations: [CustomersComponent, CustomerDetailComponent, DeviceCodePipe],
  imports: [
    CommonModule,
    CustomersRoutingModule,
    NgbModule,
<<<<<<< HEAD
=======
    AgmCoreModule,
>>>>>>> webfix/bellboy-copy
    SharedDirectivesModule,
    PerfectScrollbarModule,
    TimeConvertModule,
    SendNotificationModule,
    BigImageModule,
    PipesModule,
    StoreModule.forFeature("UserData", userReducer),
    WalletDetailModule
  ]
})
export class CustomersModule { }
