import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ResolverService } from 'app/shared/services/resolver.service';
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
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BellboyRoutingModule { }
