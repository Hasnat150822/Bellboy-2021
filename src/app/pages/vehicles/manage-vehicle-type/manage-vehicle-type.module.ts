import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManageVehicleTypeComponent } from './manage-vehicle-type.component';
import { RouterModule, Routes } from '@angular/router';
import { VehicleTypeDetailComponent } from './vehicle-type-detail/vehicle-type-detail.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ResolverService } from 'app/shared/services/resolver.service';
const routes: Routes = [
  { path: '', component: ManageVehicleTypeComponent },
  { path:'vehicleTypeDetail/:id', component:VehicleTypeDetailComponent,
  resolve:{data:ResolverService}, 
  data:{
    text: 'Vehicle Type Detail',
    path:'/vehicleTypeDetail/:id'
  } }
];

export const appRouting = RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' });
@NgModule({
  declarations: [
    ManageVehicleTypeComponent,
    VehicleTypeDetailComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgbModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ]
})
export class ManageVehicleTypeModule { }