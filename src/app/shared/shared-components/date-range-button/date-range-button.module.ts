import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DateRangeButtonComponent } from './date-range-button.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';



@NgModule({
  declarations: [DateRangeButtonComponent],
  imports: [
    NgbModule,
    CommonModule
  ],
  exports:[
    DateRangeButtonComponent
  ]
})
export class DateRangeButtonModule { }