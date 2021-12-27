import { AfterViewInit, Component, ElementRef, NgZone, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HiringService } from '../hiring.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireDatabase } from '@angular/fire/database';
import { Subscription } from 'rxjs';
import { amazonUrl, loader } from 'app/shared/services/global';
import { Store } from '@ngrx/store';
import { URL } from 'app/ngrx-states/model/url.model';
import * as allActions from '../../../ngrx-states/actions';
import { initMapSingleMarker, initPolyLines } from './googleMap';
var hr = 0;
var min = 0;
var sec = 0;
var el; var rendrer;
declare const $:any;
interface Origin {
  lat:number,
  lng:number
}
@Component({
  selector: 'app-detail-page',
  templateUrl: './detail-page.component.html',
  styleUrls: ['./detail-page.component.css']
})
export class DetailPageComponent implements OnInit, AfterViewInit {
  _id
  detailHiring:any
  currentImage;
  loc;
  bellboyLocation:any;
  bellboys:any = [];
  pagedItems:any = [];
  pager:any = {};
  spinner:boolean;
  amazonImgUrl:string = amazonUrl;
  isBigImg:true;
  origin:Origin; destinitions:Array<any> = [];
  destinition:Origin;
  lat = 31.5204; lng =  74.3587
  hiringType;
  estimatedTimeDistance
  constructor(
    private route:ActivatedRoute, 
    private hiringService:HiringService,
    private databse:AngularFireDatabase,
    private modalService:NgbModal, 
    private db:AngularFirestore, 
    private router:Router, 
    private store:Store<URL>, 
    private element:ElementRef, 
    private renderer2:Renderer2,
    private ngZone:NgZone) { }
  ngOnInit() {
    this.route.params.subscribe((res:any)=>{
      this._id = res.id
    });
    this.route.queryParams.subscribe((res:any)=>{
      let response;
      if(res.hiringType){
        response = res.hiringType.toLowerCase();
      }
      if(response == 'personal assistant'){
        response = 'pa';
      }
      if(response == 'delivery'){
        response = 'hiring';
      }
      this.hiringType = response;
    });
    loader.load().then(()=>{
      this.getDetail();
    })
    this.getMessageCollection();
    this.allBellboys();
  }
  ngAfterViewInit(){
  }
  subscription:Subscription;
  bellboyOrigin;
  getDetail(){
    let locations = [];
    let startTaskHis;
    //customer location, bellboy location, live tracking after starting task
    this.hiringService.getByid(this._id, this.hiringType).subscribe(async(res:any)=>{
      this.detailHiring = res.data;
      // decide url for each module
      let url:string = '';
      switch (this.hiringType) {
        case 'pa':
            url = url+'/hirings/'+this.detailHiring._id;
          break;
        case 'ride':
            url = url+'/RideTracking/'+this.detailHiring.hiring_id;
          break;
        case 'hiring':
            url = url+'/hirings/'+this.detailHiring._id;
          break;
      }
      //calculating order starting time
      if(this.detailHiring.start_time){
        let start_time = new Date(this.detailHiring.start_time);
        let currentDate = new Date();
        let result = this.showDiff(start_time, currentDate);
        hr = result[0];
        min = result[1];
        sec = result[2];
        setTimeout(() => {
          if(this.detailHiring.status ==2 || this.detailHiring.status ==3){this.startTimer();}
        }, 1500);
      }
      // use condition when hiring is on in-progress or non-closed
      if(this.detailHiring.status ==2 || this.detailHiring.status ==3){
        let bbId = res.data.bellboy._id;
        let initialLocation; let geolocation;
        await this.databse.list('/bellboys/'+bbId).snapshotChanges().subscribe((res:any)=>{ 
          res.map((element)=>{
            if(element.key == 'geolocation'){
              geolocation = element.payload.toJSON();
              this.destinition = {
                lat:+geolocation.latitude,
                lng:+geolocation.longitude
              }
            }else if(element.key == 'initialLocation'){
              initialLocation = element.payload.toJSON();
            }
          })
          if(this.bellboyOrigin == undefined || this.bellboyOrigin == null){
            this.bellboyOrigin = {
              lat:+initialLocation.latitude,
              lng:+initialLocation.longitude
            }
            let destinition = {
              lat:this.detailHiring.customer_location.coordinates[1],
              lng:this.detailHiring.customer_location.coordinates[0]
            }
            if(this.hiringType == 'ride'){
              initPolyLines([{
                lat:this.detailHiring.pickup_location.coordinates[1],
                lng:this.detailHiring.pickup_location.coordinates[0]
              }, {
                lat:this.detailHiring.dropoff_location.coordinates[1],
                lng:this.detailHiring.dropoff_location.coordinates[0]
              }], undefined, this.element.nativeElement.querySelector('#estMap'));   
            }else{
              initPolyLines([this.bellboyOrigin, destinition], undefined, this.element.nativeElement.querySelector('#estMap')); 
            }
            setTimeout(() => {
              initMapSingleMarker({
                lat:+geolocation.latitude,
                lng:+geolocation.longitude
              }, this.element.nativeElement.querySelector('#liveTrackingMap'));
            }, 4500);
          }
        })
      }
      // use this condition when hiring has been completed
      else if(this.detailHiring.status == 4){
        this.databse.list(url).snapshotChanges().subscribe((res:any)=>{
          let location = res.find(element => {
            return element.key == 'initialLocation';
          });
          if(startTaskHis == undefined && location){
            startTaskHis = {
              lat:+location.payload.toJSON().latitude,
              lng:+location.payload.toJSON().longitude
            }
          }
        });
        this.databse.list(url+'/geolocations', (query)=>query.orderByChild('time')).valueChanges().subscribe((res:any)=>{
          res.forEach(el => {
            locations.push({
              lat:+el.latitude,
              lng:+el.longitude
            })
          });
        });
      }
    })
    .add(()=>{
      //all html logics will be here conditionally
      if (this.detailHiring.status === 4) {
        setTimeout(() => {
          switch (locations.length) {
            case 1:
              this.element.nativeElement.querySelector('#historyMap')
              .classList.add("d-flex", "justify-content-center", "align-items-center");
              initMapSingleMarker(
                locations[0],
                this.element.nativeElement.querySelector('#historyMap'));
              break;
            case 0:
              this.element.nativeElement.querySelector('#historyMap')
              .classList.remove("d-flex", "justify-content-center", "align-items-center");
              break;
            default:
              this.element.nativeElement.querySelector('#historyMap')
              .classList.add("d-flex", "justify-content-center", "align-items-center");
              initPolyLines(
                locations, 
                startTaskHis,
                this.element.nativeElement.querySelector('#historyMap'));
              break;
          }
        }, 4000);
      }
    })
  }
  getOrderType(){
    if(this.hiringType == 'pa'){
      return 'Personal Assistance';
    }else if(this.hiringType == 'ride'){
      return 'Rides';
    }else{
      return 'Deliveries';
    }
  }
  bigImage(url){
    this.isBigImg = true;
    this.store.dispatch(new allActions.SendUrl(url));
  }
  showDiff(date1, date2){
    var diff = (date2 - date1)/1000;
    diff = Math.abs(Math.floor(diff));
    var days = Math.floor(diff/(24*60*60));
    var leftSec = diff - days * 24*60*60;

    var hrs = Math.floor(leftSec/(60*60));
    var leftSec = leftSec - hrs * 60*60;

    var mins = Math.floor(leftSec/(60));
    var leftSec = leftSec - mins * 60;
    return [hrs, mins, leftSec];
}
  chat:any;
  async getMessageCollection(){
    await this.db.collection('/messages/'+this._id+'/'+this._id).snapshotChanges()
    .subscribe((res:any)=>{
      this.chat = []
      res.map((response:any)=>{
        this.chat.push(response.payload.doc.data());
      })
    })
  }
  showDetail(id, btnId){
    let innertext = $('#'+btnId).text()
    if(innertext =='View Detail'){
      $('#'+btnId).text('Hide Detail')
    }else{
      $('#'+btnId).text('View Detail')
    }
    $('#'+id).prop('hidden', !$('#'+id).prop('hidden'))
  }
  open(content, loc){
    this.loc = loc;
    this.loc['zoom'] = 15;
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title', windowClass: 'bigImage'});
    this.ngZone.runOutsideAngular(()=>{
      initMapSingleMarker({
        lat:loc.latitude,
        lng:loc.longitude
      }, window.document.getElementById('modelMap'))
    })
  }
  cancelledReason(){
    $('#icon').toggleClass('ft-x');
    $('#iconDetail').toggleClass('d-block');
  }
  allBellboys(){
    let subscriptions:Subscription = this.hiringService.availableBellboy().subscribe((res:any)=>{
      this.bellboys = res.data.bellBoys;
    }, error=>{}, ()=>{subscriptions.unsubscribe()})
  }
  assignBellboy(bbId){
  this.spinner = true;
    this.hiringService.assignBellboy(bbId, this.detailHiring._id).subscribe((res:any)=>{
      if(res.success==true){
        this.router.navigate(['hiring/hiringDetail/', this._id]);
        this.spinner = false;
        this.allBellboys();
      }
    })
  }
  trackBellboy(bbId, ref){
    this.spinner = true;
    this.databse.list('/bellboys/'+bbId).valueChanges().subscribe((res:any)=>{
      this.loc = {latitude:res[0].latitude, longitude:res[0].longitude};
    })
    setTimeout(() => {
      this.spinner = false;
      this.open(ref, this.loc);
    }, 2000);
  }
  getEstimatedRoute(origin){
    let destinition = {
      lat:this.detailHiring.customer_location.coordinates[1],
      lng:this.detailHiring.customer_location.coordinates[0]
    }
    this.hiringService.estimatedRoute(origin, destinition).subscribe((res:any)=>{
      this.estimatedTimeDistance = {
        distance:res.distance.text,
        time:res.duration.text 
      };
    });
  }
  onMouseOver(infoWindow, $event: MouseEvent) {
    infoWindow.open();
  }
  onMouseOut(infoWindow, $event: MouseEvent) {
    infoWindow.close();
  }
  //stopwatcher
  startTimer() {
    el = this.element.nativeElement.querySelector("p span.stopWatch");
    rendrer = this.renderer2;
    setInterval(this.timerCycle, 1000);
  }
  timerCycle() {
    sec = sec + 1;
    if (sec == 60) {
      min = min + 1;
      sec = 0;
    }
    if (min == 60) {
      hr = hr + 1;
      min = 0;
      sec = 0;
    }
    let timer;
    if(hr !== 0){
      timer = `${hr} hrs ${min} mins ${sec} sec`;
    }else{
      timer = `${min} mins ${sec} sec`;
    }
    rendrer.setProperty(el, 'innerHTML', timer);
}
}