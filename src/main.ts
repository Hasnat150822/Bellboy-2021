import 'hammerjs';
import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import ChartDataLabels from "chartjs-plugin-datalabels"
<<<<<<< HEAD
import {Chart} from "chart.js"
Chart.plugins.unregister(ChartDataLabels)
=======
 import {Chart} from "chart.js"
 Chart.plugins.unregister(ChartDataLabels)
>>>>>>> webfix/bellboy-copy
if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule);