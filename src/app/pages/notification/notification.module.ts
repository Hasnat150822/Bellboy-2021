import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationComponent } from './notification/notification.component';
import { Routes, RouterModule } from '@angular/router';
import { NotificationListComponent } from './notification-list/notification-list.component';
import { LimitPipe } from './pipe/limit.pipe';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BigImageModule } from '../../shared/shared-components/big-image/big-image.module';
const routes:Routes = [{
  path:'', component:NotificationComponent
}]
@NgModule({
  declarations: [
    NotificationComponent, 
    NotificationListComponent, 
    LimitPipe],
  imports: [
    CommonModule,
    NgbModule,
    BigImageModule,
    RouterModule.forChild(routes)
  ]
})
export class NotificationModule { }
