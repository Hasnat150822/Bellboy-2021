import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManageVehiclesComponent } from './manage-vehicles.component';
import { RouterModule, Routes } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ManageVehicleDetailComponent } from './manage-vehicle-detail/manage-vehicle-detail.component';
import { ResolverService } from 'app/shared/services/resolver.service';
const routes: Routes = [
  { path: '', component: ManageVehiclesComponent },
  { path:'vehicleDetail/:id', component:ManageVehicleDetailComponent, 
  resolve:{data:ResolverService},
  data:{
    text: 'Vehicle Detail',
    path:'/vehicleDetail/:id'
  } }
];
export const appRouting = RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' });
@NgModule({
  declarations: [
    ManageVehiclesComponent,
    ManageVehicleDetailComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NgbModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class ManageVehiclesModule { }