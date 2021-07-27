  import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { chartColors } from '../chart.setting';
@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css']
})
export class LineChartComponent implements OnInit, AfterViewInit {
  
  @Input() data;
  @Input() startDate;
  @Input() endDate;
  lineChartColors = chartColors;
  lineChartLegend = true;
  lineChartOptions = {
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
          lineWidth: 0.5
        },
        scaleLabel: {
          display: true
        }
      }],
      yAxes: [{
        display: true,
        gridLines: {
          color: "#F5F5F5",
          lineWidth: 0
        },
        scaleLabel: {
          display: true,
        },
        ticks:{
          min:0
        }
      }]
    }
  };
  lineChartLabels;
  lineChartData;
  constructor() { }
  ngOnChanges() {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    this.getGraphData();
  }
  ngOnInit(){
  }
  ngAfterViewInit(){
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
  }
assignChartLabels(startDateGraph, endDateGraph){
  this.lineChartLabels = [];
  for (var d = new Date(startDateGraph); d <= new Date(endDateGraph); d.setDate(d.getDate() + 1)) {
    let date = d.toDateString().split(' ')[1]+' '+d.toDateString().split(' ')[2]+' '+d.toDateString().split(' ')[3];
    this.lineChartLabels.push(date);
  }
}
getGraphData(){
    this.lineChartData = [
      {data: [], label:'' },
      {data: [], label:'' },
      {data: [], label:'' }
    ];
    this.assignChartLabels(this.startDate, this.endDate);
    this.lineChartData[0]['label'] = 'Hirings';
    this.lineChartData[1]['label'] = 'Customers';
    this.lineChartData[2]['label'] = 'Bellboys';
    this.lineChartLabels.map((value)=>{
      let d = new Date(value);
      let date = d.getDate();
      let month = d.getMonth()+1;
      let year = d.getFullYear();
      let hiringCount = this.returnCount(this.data.hiringData, date, month, year);
      let customerCount = this.returnCount(this.data.customerData, date, month, year);
      let bellboyCount = this.returnCount(this.data.bellboyData, date, month, year);
      if(hiringCount!== undefined){
        this.lineChartData[0].data.push(hiringCount);
      }else{
        this.lineChartData[0].data.push(0);
      }
      if(customerCount!== undefined){
        this.lineChartData[1].data.push(customerCount);
      }else{
        this.lineChartData[1].data.push(0);
      }
      if(bellboyCount!== undefined){
        this.lineChartData[2].data.push(bellboyCount);
      }else{
        this.lineChartData[2].data.push(0);
      }
    })
  } 
  returnCount(response, date, month, year){
    let count;
    response.map((e)=>{
      if(date == e.date.day &&
        month == e.date.month &&
        year == e.date.year){
          count = e.count;
      }
    })
    return count;
  }
}