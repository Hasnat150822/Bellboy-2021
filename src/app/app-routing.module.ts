import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { FullLayoutComponent } from "./layouts/full/full-layout.component";
<<<<<<< HEAD
import { LoginComponent } from './layouts/login-component/login.component';

import { AuthGuard, LogOutUser } from './shared/auth/auth-guard.service';
=======

import { AuthGuard, LogOutUser } from './shared/auth/auth-guard.service';
import { LoginComponent } from './pages/defaultPages/login-component/login.component';
>>>>>>> webfix/bellboy-copy
import { allRoutes } from './shared/routes/all-routes';
const appRoutes: Routes = [
  { path: '', component:LoginComponent, canActivate:[LogOutUser]},
  { path: '', component: FullLayoutComponent, canActivate:[AuthGuard],
  children:allRoutes
}
];

@NgModule({
<<<<<<< HEAD
  imports: [
    RouterModule.forRoot(appRoutes, { 
    relativeLinkResolution: 'legacy', 
    scrollPositionRestoration: 'enabled',
    enableTracing:false,
    preloadingStrategy: PreloadAllModules  })],
    exports: [RouterModule]
=======
  imports: [RouterModule.forRoot(appRoutes, { 
  relativeLinkResolution: 'legacy', 
  useHash: true,
  scrollPositionRestoration: 'enabled',
  preloadingStrategy: PreloadAllModules  })],
  exports: [RouterModule]
>>>>>>> webfix/bellboy-copy
})

export class AppRoutingModule {
}