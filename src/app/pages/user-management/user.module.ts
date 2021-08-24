import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { UserManageRoutingModule } from "./user-routing.module";
import { UserManageComponent } from './user.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { StoreModule } from '@ngrx/store';
import { userReducer } from 'app/ngrx-states/reducer';
import { BigImageModule } from '../../shared/shared-components/big-image/big-image.module';
export function createTranslateLoader(http: HttpClient) {
    return new TranslateHttpLoader(http, "./assets/i18n/", ".json");
  }
@NgModule({
    imports: [
        CommonModule,
        UserManageRoutingModule,
        NgbModule,
        ReactiveFormsModule,
        FormsModule,
        BigImageModule,
        TranslateModule.forRoot({
            loader: {
              provide: TranslateLoader,
              useFactory: createTranslateLoader,
              deps: [HttpClient]
            }
          }),
          StoreModule.forFeature('UserData',userReducer)
    ],
    declarations: [       
        UserManageComponent, UserDetailComponent
    ]
})
export class UserManageModule { }