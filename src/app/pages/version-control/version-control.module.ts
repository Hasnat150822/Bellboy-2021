import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VersionHistoryComponent } from './version-history/version-history.component';
import { VersionControlComponent } from './version-control/version-control.component';
import { RouterModule, Routes } from '@angular/router';
import { VersionControlService } from './services/version-control.service';
import { ReactiveFormsModule } from '@angular/forms';

const routes:Routes = [{
  path:'', component:VersionControlComponent
}]

@NgModule({
  declarations: [VersionHistoryComponent, VersionControlComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  providers:[VersionControlService]
})
export class VersionControlModule { }
