import { Component, ElementRef, OnInit } from '@angular/core';
import { MarkerClusterer } from "@googlemaps/markerclusterer";
import { BellboyService } from 'app/pages/bellboy/bellboy.service';
import { amazonUrl, loader, downLoadFile } from 'app/shared/services/global';
import { PagerService } from 'app/shared/services/pager.service';
import { ReportsService } from '../reports.service';
var map: google.maps.Map;
var center: google.maps.LatLngLiteral = {lat: 31.5204, lng: 74.3587};
const labels = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

@Component({
  selector: 'app-bellboy-reports',
  templateUrl: './bellboy-reports.component.html',
  styleUrls: ['./bellboy-reports.component.css']
})
export class BellboyReportsComponent implements OnInit {
  bellboyData:Array<any> = [];
  tableHeadings;
  totalBellboysHeadins = [
    'Image', 'Id', 'Name','Email','Gender', 'Approval Status', 'Is Logged', 'Mobile', 'CNIC', 'Is Busy','Joining Date', 'Total Working Hours', 'Total Hirings'
    ]
  isDownloading:boolean = false;
  page:number = 1;
  pager = {};
  status:string = '4';
  fromDate:Date; 
  toDate:Date;
  otherParams:string;
  locations = [
    { lat: -31.56391, lng: 147.154312 },
    { lat: -33.718234, lng: 150.363181 },
    { lat: -33.727111, lng: 150.371124 },
    { lat: -33.848588, lng: 151.209834 },
    { lat: -33.851702, lng: 151.216968 },
    { lat: -34.671264, lng: 150.863657 },
    { lat: -35.304724, lng: 148.662905 },
    { lat: -36.817685, lng: 175.699196 },
    { lat: -36.828611, lng: 175.790222 },
    { lat: -37.75, lng: 145.116667 },
    { lat: -37.759859, lng: 145.128708 },
    { lat: -37.765015, lng: 145.133858 },
    { lat: -37.770104, lng: 145.143299 },
    { lat: -37.7737, lng: 145.145187 },
    { lat: -37.774785, lng: 145.137978 },
    { lat: -37.819616, lng: 144.968119 },
    { lat: -38.330766, lng: 144.695692 },
    { lat: -39.927193, lng: 175.053218 },
    { lat: -41.330162, lng: 174.865694 },
    { lat: -42.734358, lng: 147.439506 },
    { lat: -42.734358, lng: 147.501315 },
    { lat: -42.735258, lng: 147.438 },
    { lat: -43.999792, lng: 170.463352 },
  ];
  constructor(
    private el:ElementRef, 
    private bbService:BellboyService, 
    private service:ReportsService, 
    private pagerService:PagerService) { }

  ngOnInit(): void {
    this.getBellboys();
  }

  
  initMap() {
    // -34.397, 150.644
    let map: google.maps.Map;
    const center: google.maps.LatLngLiteral = {lat: -34.397, lng: 150.644};
    let el = this.el.nativeElement.querySelector('#areaMap');
    map = new google.maps.Map(el as HTMLElement, {
      center,
      zoom: 5
    });
    const labels = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const markers = this.locations.map((location, i) => {
      return new google.maps.Marker({
        position: location,
        label: labels[i % labels.length],
      });
    });
    new MarkerClusterer({
      map,
      markers
    })
  }
  getBellboys(){
    this.bbService.getAllBellboy(this.page, 10, this.status, undefined, undefined, this.fromDate, this.toDate, this.otherParams)
    .subscribe((response)=>{
      let tableRowData = [];
        response.bellBoys.forEach((el:any, i)=>{
          tableRowData.push(this.generateArray(el));
        })
      this.bellboyData = tableRowData; 
      this.pager = this.pagerService.getPager(response.count, this.page, 10)
    })
  }

  generateArray(el){
    return [
      {
        type:'image',
        value:amazonUrl+el.avatar.value
      },
      {
        type:'default',
        value:el._id
      }, 
      {
        type:'default',
        value:el.name
      },
      {
        type:'default',
        value:el.email
      }, 
      {
        type:'default',
        value:el.gender
      },
      {
        type:'bbStatus',
        value:el.status
      },
      {
        type:'default',
        value:el.is_logged
      },
      {
        type:'default',
        value:el.mobile
      }, 
      {
        type:'default',
        value:el.legals.nic.value
      }, 
      {
        type:'default',
        value:el.is_busy
      }, 
      {
        type:'date',
        value:el.created_at
      }, 
      {
        type:'hiring-time',
        value:el.total_working_hours
      }, 
      {
        type:'default',
        value:el.total_hirings
      }
    ]
  }

  getPager(event){
    this.page = +event;
    this.getBellboys();
  }

  getByStatus(status, type){
    this.fromDate = undefined; this.toDate = undefined;
    if(type=='status'){ 
      this.status = status;
    }else{
      this.otherParams = '&'+status;
    }
    this.getBellboys();
  } 

  getByArea(){
    loader.load().then(()=>{
      this.initMap();
    })
  }

  downloadReport(){
    this.isDownloading = true;
    this.service.getBellboyTotalReports('status='+this.status, this.fromDate, this.toDate, this.otherParams).subscribe((res:any)=>{
      downLoadFile(res, 'Total Bellboy');
      this.isDownloading = false;
    })
  }

  getDate(event:{fromDate, toDate}){
    this.fromDate = event.fromDate.split('T')[0];
    this.toDate = event.toDate.split('T')[0];
    this.getBellboys();
  }
}
