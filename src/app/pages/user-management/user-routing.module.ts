import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserManageComponent } from './user.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { ResolverService } from 'app/shared/services/resolver.service';
const routes: Routes = [
  {
    path: '',
    component:UserManageComponent
  },
  {
    path:'userdetail/:id',
    component:UserDetailComponent,
    resolve:{data:ResolverService},
    data: {
      text: 'User Detail',
      path:'/userdetail/:id'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserManageRoutingModule { }
