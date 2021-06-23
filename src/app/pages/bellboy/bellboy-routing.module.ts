import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ResolverService } from 'app/shared/services/resolver.service';
import { BellboyWalletComponent } from './bellboy-wallet/bellboy-wallet.component';
import { BellboyComponent } from './bellboy.component';
import { BellboydetailComponent } from './BellboyDetail/bellboydetail.component';
const routes: Routes = [
  {
    path: '',
    component:BellboyComponent
  },
  {
    path:'bellboydetail/:id',
    component:BellboydetailComponent,
    resolve:{data:ResolverService},
    data: {
      text: 'Bellboy Detail',
      path:'/bellboydetail/:id'
    }
  },{
    path:'bellboywallet', component:BellboyWalletComponent, 
    resolve:{data:ResolverService},
    data: {
      text: 'Bellboy Wallet',
      path:'/bellboywallet'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BellboyRoutingModule { }
