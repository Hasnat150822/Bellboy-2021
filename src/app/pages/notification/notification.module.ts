import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
<<<<<<< HEAD
import { NotificationComponent } from './notification/notification.component';
=======
import { NotificationComponent } from './notification.component';
>>>>>>> webfix/bellboy-copy
import { Routes, RouterModule } from '@angular/router';
import { NotificationListComponent } from './notification-list/notification-list.component';
import { LimitPipe } from './pipe/limit.pipe';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BigImageModule } from '../../shared/shared-components/big-image/big-image.module';
const routes:Routes = [{
  path:'', component:NotificationComponent
}]
@NgModule({
<<<<<<< HEAD
  declarations: [
    NotificationComponent, 
    NotificationListComponent, 
    LimitPipe],
=======
  declarations: [NotificationComponent, NotificationListComponent, LimitPipe],
>>>>>>> webfix/bellboy-copy
  imports: [
    CommonModule,
    NgbModule,
    BigImageModule,
    RouterModule.forChild(routes)
  ]
})
export class NotificationModule { }
