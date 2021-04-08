import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HiringStatusPipe } from './hiring-status.pipe';
import { ShowDashesPipe } from './show-dashes.pipe';
@NgModule({
  declarations: [ShowDashesPipe, HiringStatusPipe],
  imports:[CommonModule],
  exports:[ShowDashesPipe, HiringStatusPipe]
})
export class PipesModule { }