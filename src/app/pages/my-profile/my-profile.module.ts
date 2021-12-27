import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyProfileComponent } from './my-profile.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { userReducer } from 'app/ngrx-states/reducer';
const routes:Routes = [{
  path:'', component:MyProfileComponent
}]
@NgModule({
  declarations: [MyProfileComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forFeature('UserData',userReducer),
    RouterModule.forChild(routes)
  ]
})
export class MyProfileModule { }