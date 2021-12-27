import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComplainsComponent } from './complaints.component';
import { RouterModule, Routes } from '@angular/router';
import { PipesModule } from 'app/shared/pipes/pipes.module';
const routes:Routes = [{
  path:'', component:ComplainsComponent
}]
@NgModule({
  declarations: [ComplainsComponent],
  imports: [
    CommonModule,
    PipesModule,
    RouterModule.forChild(routes)
  ]
})
export class ComplainsModule { }