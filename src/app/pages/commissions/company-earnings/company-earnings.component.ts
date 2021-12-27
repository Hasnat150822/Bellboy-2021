import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { PagerService } from 'app/shared/services/pager.service';
import { CommissionsService } from '../commissions.service';
import { lineChartOptions, chartColors } from '../../../layouts/full/dashboard/chart.setting'; 
import { ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';

@Component({
  selector: 'app-company-earnings',
  templateUrl: './company-earnings.component.html',
  styleUrls: ['./company-earnings.component.css']
})
export class CompanyEarningsComponent implements OnInit {

  page = 1;
  earningsList:Array<any>;
  totalEarnings;
  pager = {};
  spinner:boolean;
  public lineChartData: ChartDataSets[] = [
    {
    data: [], 
    fill:false, 
    borderColor:'#fa9008', 
    borderWidth:1,
    pointBorderColor:'#fa9008',
    pointBackgroundColor:'#fa9008'
  }]
  public lineChartLabels: Label[] = [];
  lineChartOptions = lineChartOptions;
  isColor:boolean = false;
  isLegend:boolean = false;
  recentData = {};
  selectionType:string;
  constructor(
    private service:CommissionsService,
    private pagerService:PagerService,
    private el:ElementRef,
    private rendrer2:Renderer2
  ) { }

  ngOnInit(){

    this.lineChartOptions.scales.yAxes[0] = {
      display: true,
      gridLines: {
        color: "#F5F5F5",
        lineWidth: 1
      },
      scaleLabel: {
        display: true,
      },
      ticks:{
        min:0
      }
    }
    this.lineChartOptions.scales.xAxes[0] = {
      display: true,
      gridLines: {
        color: "#F5F5F5",
        lineWidth: 0
      },
      scaleLabel: {
        display: true
      }
    }
    this.getTotalEarning();
    this.getTotalEarningByWeek();
  }

  getEarnings(){
    this.spinner = true;
    this.earningsList = [];
    this.service.getEarnings(this.page).subscribe((res:any)=>{
      this.pager  = this.pagerService.getPager(res.data?.count, this.page, 10);
      this.earningsList = res.data.app_earning;
      this.spinner = false;
    }, (err)=>{
      this.spinner = false;
    })
  }

  getTotalEarningByWeek(){
    this.selectionType = 'Week';
    let date:any = new Date();
    let oneJan:any = new Date(date.getFullYear(),0,1);
    let numberOfDays:any = Math.floor((date - oneJan) / (24 * 60 * 60 * 1000));
    let result = Math.ceil(( date.getDay() + 1 + numberOfDays) / 7);
    result = result-1;
    this.lineChartData[0]['data'] = []
    this.lineChartLabels = []
    this.service.getEarningsByWeek().subscribe((res:any)=>{
      res.data.earning.map((earning:any)=>{
        if(earning._id.week == result){
          this.recentData['currentData'] = earning.sum;
        }
        if(earning._id.week == result-1){
          this.recentData['lastData'] = earning.sum;
        }
        this.lineChartData[0]['data'].push(earning.sum);
        this.lineChartLabels.push('Week '+earning._id.week+', '+earning._id.year) 
      })
    })
  }

  getTotalEarningByMonth(){
    this.selectionType = 'Month'
    let date = new Date();
    let currentMonth = date.getMonth()+1;
    this.lineChartData[0]['data'] = []
    this.lineChartLabels = []
    this.service.getEarningsByMonth().subscribe((res:any)=>{
      res.data.earning.map((earning:any)=>{
        if(earning._id.month == currentMonth){
          this.recentData['currentData'] = earning.sum;
        }
        if(earning._id.month == currentMonth-1){
          this.recentData['lastData'] = earning.sum;
        }
        this.lineChartData[0]['data'].push(earning.sum);
        this.lineChartLabels.push('Month '+earning._id.month+', '+earning._id.year) 
      })
    })
  }

  getTotalEarningByYear(){
    this.selectionType = 'Year'
    this.lineChartData[0]['data'] = []
    this.lineChartLabels = [];
    let date = new Date();
    this.service.getEarningsByYear().subscribe((res:any)=>{
      res.data.earning.map((earning:any)=>{
        if(earning._id.year == date.getFullYear() ){
          this.recentData['currentData'] = earning.sum;
        }
        if(earning._id.year == date.getFullYear()-1 ){
          this.recentData['lastData'] = earning.sum;
        }
        if(this.recentData['lastData']!==earning.sum){
          this.recentData['lastData'] = 0
        }
        this.lineChartData[0]['data'].push(earning.sum);
        this.lineChartLabels.push(earning._id.year) 
      })
    })
  }

  getTotalEarning(){
    this.service.totalEarnings()
    .subscribe((res:any)=>{
      this.totalEarnings = res;
      this.totalEarnings.earning.forEach(data => {
        switch (data._id) {
          case 1:
            data['src'] = '../../../assets/img/ico/product.png';
            break;
          case 2:
            data['src'] = '../../../assets/img/ico/BB-PNG.png';
            break;
          case 3:
            data['src'] = '../../../assets/img/ico/SVG/rides.svg';
            break;
          default:
            data['src'] = '../../../assets/img/ico/users.png';
            break;
        }
      });
    })
  }

  setPage(page){
    this.page = page;
    this.getEarnings();
  }

  activateTab(id){
    let all_a:NodeList = this.el.nativeElement.querySelectorAll('li.active');
    let el:HTMLElement = this.el.nativeElement.querySelector(`#${id}`);
    // remove active class from all tabs
    all_a.forEach((childNode:HTMLElement)=>{
      this.rendrer2.removeClass(childNode, 'active')
    })
    // add active class into currenty active tab
    this.rendrer2.addClass(el, 'active');
  }

}
