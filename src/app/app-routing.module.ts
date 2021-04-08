import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { FullLayoutComponent } from "./layouts/full/full-layout.component";

import { AuthGuard, LogOutUser } from './shared/auth/auth-guard.service';
import { LoginComponent } from './pages/defaultPages/login-component/login.component';
import { allRoutes } from './shared/routes/all-routes';
const appRoutes: Routes = [
  { path: '', component:LoginComponent, canActivate:[LogOutUser]},
  { path: '', component: FullLayoutComponent, canActivate:[AuthGuard],
  children:allRoutes
}
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, { 
  relativeLinkResolution: 'legacy', 
  useHash: true,
  scrollPositionRestoration: 'enabled',
  preloadingStrategy: PreloadAllModules  })],
  exports: [RouterModule]
})

export class AppRoutingModule {
}