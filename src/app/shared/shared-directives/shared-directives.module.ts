import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatchHeightDirective } from '../directives/match-height.directive';



@NgModule({
  declarations: [
    MatchHeightDirective
  ],
  imports: [
    CommonModule
  ],
  exports:[
    MatchHeightDirective,
  ]
})
export class SharedDirectivesModule { }
