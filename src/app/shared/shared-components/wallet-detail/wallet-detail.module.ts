import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { Route, RouterModule } from "@angular/router";
import { PresentorCopmonentComponent } from "./presentor-copmonent/presentor-copmonent.component";
import { WalletDetailComponent } from "./wallet-detail.component";
const route:Route = {
    path:'', component:WalletDetailComponent
}
@NgModule({
    declarations:[
        WalletDetailComponent,
        PresentorCopmonentComponent
    ],
    imports:[
        CommonModule,
        ReactiveFormsModule,
        RouterModule.forChild([route])
    ],
    exports:[
        WalletDetailComponent
    ]
})

export class WalletDetailModule {}