import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BellboyRoutingModule } from "./bellboy-routing.module";
import { BellboyComponent } from './bellboy.component';
import { BellboydetailComponent } from './BellboyDetail/bellboydetail.component';
import { BellboyHiringsComponent } from './bellboy-hirings/bellboy-hirings.component';
import { PipesModule } from 'app/shared/pipes/pipes.module';
import { BigImageModule } from '../../shared/shared-components/big-image/big-image.module';
<<<<<<< HEAD
import { TimeConvertModule } from 'app/shared/pipes/time-convert/time-convert.module';
=======
import { TimeConvertModule } from 'app/shared/time-convert/time-convert.module';
import { SeperateDecimalPipe } from './seperate-decimal.pipe';
>>>>>>> webfix/bellboy-copy
import { ImageCropperModule } from 'ngx-image-cropper';
import { SendNotificationModule } from 'app/shared/shared-components/send-notification/send-notification.module';
import { ReactiveFormsModule } from '@angular/forms';
import { WalletDetailModule } from 'app/shared/shared-components/wallet-detail/wallet-detail.module';
<<<<<<< HEAD
import { AddNewBellboyComponent } from './add-new-bellboy/add-new-bellboy.component';
import { AddBellboyVehicleComponent } from './add-bellboy-vehicle/add-bellboy-vehicle.component';
=======
>>>>>>> webfix/bellboy-copy

@NgModule({
    imports: [
        CommonModule,
        BellboyRoutingModule,
        PipesModule,
        BigImageModule,
        ReactiveFormsModule,
        SendNotificationModule,
        ImageCropperModule,
        NgbModule,
        WalletDetailModule,
<<<<<<< HEAD
        TimeConvertModule,
        
    ],
    declarations: [       
        BellboyComponent, BellboydetailComponent, BellboyHiringsComponent, 
         AddNewBellboyComponent, AddBellboyVehicleComponent
=======
        TimeConvertModule
    ],
    declarations: [       
        BellboyComponent, BellboydetailComponent, BellboyHiringsComponent, 
        SeperateDecimalPipe
>>>>>>> webfix/bellboy-copy
    ]
})
export class BellboyModule { }