import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CustomerDetailComponent } from "./customer-detail/customer-detail.component";
import { CustomersComponent } from "./customers.component";
const routes:Routes = [
    {
      path:'',
      component:CustomersComponent
    },
    {
      path:'custdetail/:id',
      component:CustomerDetailComponent,
      data:{
        text:'Customer Detail',
        path:'/custdetail/:id',
        nav:true,
        breadcrumbs:true
      }
    },
    {
      path:'customerwallet/:id',
      loadChildren:()=>import('../../shared/shared-components/wallet-detail/wallet-detail.module').then(m=>m.WalletDetailModule),
      data:{
        text: 'Customer Wallet',
        path:'/customerwallet/:id'
      }
    }
  ]
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
  })
  export class CustomersRoutingModule { }