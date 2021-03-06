import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from "@angular/common";
import { DashboardRoutingModule } from "./dashboard-routing.module";
import { DashboardComponent } from './dashboard.component';
import { ChartsModule } from 'ng2-charts';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BarChartComponent } from './bar-chart/bar-chart.component';
import { LineChartComponent } from './line-chart/line-chart.component';

@NgModule({
    imports: [
        CommonModule,
        ChartsModule,
        DashboardRoutingModule,
        NgbModule
    ],
    declarations: [       
        DashboardComponent, BarChartComponent, LineChartComponent
    ],
    providers:[DatePipe]
})
export class DashboardModule { }
