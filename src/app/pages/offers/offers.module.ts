import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OffersComponent } from './offers/offers.component';
import { Routes, RouterModule } from '@angular/router';
import { SendNotificationModule } from 'app/shared/shared-components/send-notification/send-notification.module';
import { ManagePromotionComponent } from './manage-promotion/manage-promotion.component';
import { CKEditorModule } from 'ng2-ckeditor';
import { ImageCropperModule } from 'ngx-image-cropper';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ShowOffersComponent } from './show-offers/show-offers.component';
import { TableComponentsModule } from 'app/shared/shared-components/table-components/table-components.module';
import { ShowPaginationComponent } from './portable/show-pagination.component';
import { PortalModule } from '@angular/cdk/portal';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
export const routes: Routes = [{ 
  path: '', component:  OffersComponent
},{ 
  path: 'manageOffers', component:  ManagePromotionComponent, data:{
    text: 'Manage Offers',
    path:'/manageOffers'
  }
}]

@NgModule({
  declarations: [
    OffersComponent, 
    ManagePromotionComponent, 
    ShowOffersComponent,
    ShowPaginationComponent],
  imports: [
    CommonModule,
    ImageCropperModule,
    TableComponentsModule,
    SendNotificationModule,
    NgbModule,
    PortalModule,
    ReactiveFormsModule,
    FormsModule,
    CKEditorModule,
    RouterModule.forChild(routes)
  ]
})
export class OffersModule { }