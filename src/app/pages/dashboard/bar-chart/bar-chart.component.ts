import { Component, Input, OnInit } from '@angular/core';
import { barChartColors, barChartLabels } from '../chart.setting';
import ChartDataLabels from 'chartjs-plugin-datalabels';
@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css']
})
export class BarChartComponent implements OnInit {

  @Input() data;
  barChartColors = barChartColors;
  barChartData = [
    {data: [], barPercentage: 0.4}
  ];
  barChartPlugins = [ChartDataLabels]
  barChartLabels = barChartLabels;
  barChartOptions = {
    layout:{
      padding:20
    },
    animation: {
      duration: 1000, // general animation time
      easing: 'easeOutBack'
    },
    legend: {
      position: 'top',
    },
    hover: {
      mode: 'label',
      animationDuration: 1000, // duration of animations when hovering an item
    },
    responsiveAnimationDuration: 1000, // animation duration after a resize
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      xAxes: [{
        display: true,
        gridLines: {
          color: "#F5F5F5",
          lineWidth: 1
        },
        scaleLabel: {
          display: true
        }
      }],
      yAxes: [{
        display: true,
        gridLines: {
          color: "#F5F5F5",
          lineWidth: 1
        },
        scaleLabel: {
          display: true
        },
        ticks:{
          display: false,
          min:0
        }
      }]
    },
    plugins:{
      datalabels: {
        anchor: 'end',
        align: 'end',
        font: {
          size: 12,
        },
        callback: function(value, index, values) {
          return value + ' €';
      }
      }
    }
  };
  barChartLegend = false;
  constructor() { }
  ngOnChanges(){
    this.getDaysData();
  }
  ngOnInit(){
  }
  getDaysData(){
    this.barChartData['0']['data'] = this.data;
  }
}