import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
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
    data: {
      text: 'Bellboy Detail',
      path:'/bellboydetail/:id'
    }
  },
  {
    path:'bellboywallet/:id',
    loadChildren:()=>import('../../shared/shared-components/wallet-detail/wallet-detail.module').then(m=>m.WalletDetailModule),
    data:{
      text: 'Bellboy Wallet',
      path:'/bellboywallet/:id'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BellboyRoutingModule { }