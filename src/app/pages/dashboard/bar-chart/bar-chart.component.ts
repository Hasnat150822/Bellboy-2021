import { Component, Input, OnInit } from '@angular/core';
import { barChartColors, barChartLabels, barChartOptions } from '../chart.setting';
import ChartDataLabels from 'chartjs-plugin-datalabels';
@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css']
})
export class BarChartComponent implements OnInit {
  @Input() isRange;
  @Input() data;
  barChartColors = barChartColors;
  barChartData = [
    {data: [], barPercentage: 0.4}
  ];
  barChartPlugins = [ChartDataLabels]
  barChartLabels = barChartLabels;
  barChartOptions = barChartOptions;
  barChartLegend = false;
  constructor() { }
  ngOnChanges(){
    this.getDaysData();
    this.isRange;
  }
  ngOnInit(){
  }
  getDaysData(){
    if(this.isRange){
      this.barChartLabels.forEach((el, index, arr)=>{
        if(el.includes("Today")){
          arr[index] = el.replace("Today ", "")
        }else{
          arr[index] = el;
        }
      })
    }
    this.barChartData['0']['data'] = this.data;
  }
}