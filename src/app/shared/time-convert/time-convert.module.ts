import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimeConvertPipe } from './time-convert.pipe';



@NgModule({
  declarations: [TimeConvertPipe],
  imports: [
    CommonModule
  ],
  exports:[TimeConvertPipe]
})
export class TimeConvertModule { }
