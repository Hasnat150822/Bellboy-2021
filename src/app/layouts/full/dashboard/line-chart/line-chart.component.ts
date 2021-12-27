import { AfterViewInit, Component, Input, OnChanges, OnInit } from '@angular/core';
import { chartColors, lineChartOptions } from '../chart.setting';
@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css']
})
export class LineChartComponent implements OnInit, AfterViewInit, OnChanges {
  
  @Input() data;
  @Input() startDate;
  @Input() endDate;
  lineChartColors = chartColors;
  lineChartLegend = true;
  lineChartOptions = lineChartOptions;
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