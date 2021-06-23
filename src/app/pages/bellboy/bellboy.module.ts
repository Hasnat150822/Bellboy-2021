import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BellboyRoutingModule } from "./bellboy-routing.module";
import { BellboyComponent } from './bellboy.component';
import { BellboydetailComponent } from './BellboyDetail/bellboydetail.component';
import { BellboyHiringsComponent } from './bellboy-hirings/bellboy-hirings.component';
import { PipesModule } from 'app/shared/pipes/pipes.module';
import { BigImageModule } from '../shared/big-image/big-image.module';
import { TimeConvertModule } from 'app/shared/time-convert/time-convert.module';
import { SeperateDecimalPipe } from './seperate-decimal.pipe';
import { BellboyWalletComponent } from './bellboy-wallet/bellboy-wallet.component';

@NgModule({
    imports: [
        CommonModule,
        BellboyRoutingModule,
        PipesModule,
        BigImageModule,
        NgbModule,
        TimeConvertModule
    ],
    declarations: [       
        BellboyComponent, BellboydetailComponent, BellboyHiringsComponent, SeperateDecimalPipe, BellboyWalletComponent
    ]
})
export class BellboyModule { }