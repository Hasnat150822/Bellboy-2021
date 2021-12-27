import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from "./shared/shared.module";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from "@angular/common/http";
import { TranslateModule, TranslateLoader } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { 
    PerfectScrollbarModule, 
    PERFECT_SCROLLBAR_CONFIG, 
    PerfectScrollbarConfigInterface
  } from 'ngx-perfect-scrollbar';

import { AppComponent } from './app.component';
import { FullLayoutComponent } from "./layouts/full/full-layout.component";
<<<<<<< HEAD
import { NgxImageCompressService } from 'ngx-image-compress';

import { AuthGuard, LogOutUser } from './shared/auth/auth-guard.service';
import { LoginComponent } from './layouts/login-component/login.component';
import { PagerService } from './shared/services/pager.service';
import { GlobalService } from './shared/services/global-service.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
=======
import {NgxImageCompressService} from 'ngx-image-compress';

import { AuthGuard, LogOutUser } from './shared/auth/auth-guard.service';
import { LoginComponent } from './pages/defaultPages/login-component/login.component';
import { PagerService } from './shared/services/pager.service';
import { GlobalService } from './shared/services/global-service.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgmCoreModule } from '@agm/core';
>>>>>>> webfix/bellboy-copy
import { environment } from 'environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { MessagingService } from './shared/services/messaging.service';
import { AsyncPipe } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { userReducer } from './ngrx-states/reducer';
import { HttpSetHeaderInterceptor } from './shared/auth/http-set-header.interceptor';
import { ServiceWorkerModule } from '@angular/service-worker';
<<<<<<< HEAD
import { ChartsModule } from 'ng2-charts';
import { DashboardComponent } from './layouts/full/dashboard/dashboard.component';
import { LineChartComponent } from './layouts/full/dashboard/line-chart/line-chart.component';
import { BarChartComponent } from './layouts/full/dashboard/bar-chart/bar-chart.component';
=======
>>>>>>> webfix/bellboy-copy

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
    suppressScrollX: true,
    wheelPropagation: false
  };
  
  export function createTranslateLoader(http: HttpClient) {
    return new TranslateHttpLoader(http, "./assets/i18n/", ".json");
  }


  @NgModule({
<<<<<<< HEAD
    declarations: [
      AppComponent, 
      FullLayoutComponent, 
      LoginComponent,
      DashboardComponent,
      LineChartComponent,
      BarChartComponent
    ],
=======
    declarations: [AppComponent, FullLayoutComponent, LoginComponent],
>>>>>>> webfix/bellboy-copy
    imports: [
      BrowserAnimationsModule,
      AppRoutingModule,
      SharedModule,
      HttpClientModule,
      FormsModule,
<<<<<<< HEAD
      ChartsModule,
=======
      AgmCoreModule.forRoot({
        apiKey: 'AIzaSyCGsknFpbKkEneyVmQ0luBZwaHlv4V0KUE',
        libraries: ['places']
      }),
>>>>>>> webfix/bellboy-copy
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
      StoreModule.forRoot({'UserData':userReducer}),
      ServiceWorkerModule.register('ngsw-worker.js', {
        enabled: environment.production,
        // Register the ServiceWorker as soon as the app is stable
        // or after 30 seconds (whichever comes first).
        registrationStrategy: 'registerWhenStable:30000'
      })
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
      { provide: HTTP_INTERCEPTORS, useClass: HttpSetHeaderInterceptor, multi: true }
    ],
    bootstrap: [AppComponent]
  })
  export class AppModule {
  }