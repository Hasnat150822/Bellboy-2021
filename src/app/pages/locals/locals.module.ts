import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocalsComponent } from './locals.component';
import { Routes, RouterModule } from '@angular/router';
const routes :Routes = [
  {
    path:'',
    component:LocalsComponent
  }
]
@NgModule({
  declarations: [LocalsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class LocalsModule { }
