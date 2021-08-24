import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BigImageComponent } from './big-image/big-image.component';
import { StoreModule } from '@ngrx/store';
import { urlReducer } from 'app/ngrx-states/reducer';

@NgModule({
  declarations: [BigImageComponent],
  imports: [
    CommonModule,
    StoreModule.forFeature("BigImage", urlReducer),
  ],
  exports:[BigImageComponent]
})
export class BigImageModule { }