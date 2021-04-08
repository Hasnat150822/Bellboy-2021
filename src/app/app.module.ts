import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from "./shared/shared.module";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule, HttpClient } from "@angular/common/http";
import { TranslateModule, TranslateLoader } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { 
    PerfectScrollbarModule, 
    PERFECT_SCROLLBAR_CONFIG, 
    PerfectScrollbarConfigInterface
  } from 'ngx-perfect-scrollbar';

import { AppComponent } from './app.component';
import { FullLayoutComponent } from "./layouts/full/full-layout.component";
import {NgxImageCompressService} from 'ngx-image-compress';

import { AuthGuard, LogOutUser } from './shared/auth/auth-guard.service';
import { LoginComponent } from './pages/defaultPages/login-component/login.component';
import { PagerService } from './shared/services/pager.service';
import { GlobalService } from './shared/services/global-service.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgmCoreModule } from '@agm/core';
import { environment } from 'environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { MessagingService } from './shared/services/messaging.service';
import { AsyncPipe } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { userReducer } from './ngrx-states/reducer';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
    suppressScrollX: true,
    wheelPropagation: false
  };
  
  export function createTranslateLoader(http: HttpClient) {
    return new TranslateHttpLoader(http, "./assets/i18n/", ".json");
  }


  @NgModule({
    declarations: [AppComponent, FullLayoutComponent, LoginComponent],
    imports: [
      BrowserAnimationsModule,
      AppRoutingModule,
      SharedModule,
      HttpClientModule,
      FormsModule,
      AgmCoreModule.forRoot({
        apiKey: 'AIzaSyCGsknFpbKkEneyVmQ0luBZwaHlv4V0KUE',
        libraries: ['places']
      }),
      ReactiveFormsModule,
      NgbModule,
      TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: createTranslateLoader,
          deps: [HttpClient]
        }
      }),
      AngularFireModule.initializeApp(environment.firebase),
      AngularFireDatabaseModule,
      AngularFireAuthModule,
      AngularFirestoreModule,
      PerfectScrollbarModule,
      StoreModule.forRoot({'UserData':userReducer})
    ],
    providers: [
      AuthGuard,
      LogOutUser,
      PagerService,
      GlobalService,
      NgxImageCompressService,
      MessagingService,
      AsyncPipe,
      {
        provide: PERFECT_SCROLLBAR_CONFIG,
        useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
      },
      { provide: PERFECT_SCROLLBAR_CONFIG, useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG }
    ],
    bootstrap: [AppComponent]
  })
  export class AppModule {
  }