import { AfterViewInit, Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HiringService } from '../hiring.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireDatabase } from '@angular/fire/database';
import { Subscription } from 'rxjs';
import { amazonUrl } from 'app/shared/services/global';
import { Store } from '@ngrx/store';
import { URL } from 'app/ngrx-states/model/url.model';
import * as allActions from '../../../ngrx-states/actions';
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
  selector: 'app-hiring-detail',
  templateUrl: './hiring-detail.component.html',
  styleUrls: ['./hiring-detail.component.scss']
})
export class HiringDetailComponent implements OnInit, AfterViewInit {
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
  public icon = {
    url: '../../../../assets/img/ico/map-marker/blue-marker.png',
    scaledSize: {
      width: 11,
      height: 11
    }
  }
  public renderOptions = {
    suppressMarkers: true,
  }
  
  public markerOptions = {
    origin:{
      icon:'../../../../assets/img/ico/map-marker/running2.png'
    },
    destination:{
      icon:'../../../../assets/img/ico/map-marker/running.png'
    }
  }
  public estimateRouteMarkers = {
    origin:{
      icon:'../../../../assets/img/ico/map-marker/running.png'
    },
    destination:{
      icon:'../../../../assets/img/ico/map-marker/cusotmer-marker.png'
    }
  }
  public historyMarkers = {
    origin: {
      url: '../../../../assets/img/ico/map-marker/running2.png'
    },
    destination: {
      url: '../../../../assets/img/ico/map-marker/running.png'
    },
  }
  estimatedTimeDistance
  constructor(private route:ActivatedRoute, private hiringService:HiringService,private databse:AngularFireDatabase,
    private modalService:NgbModal, private db:AngularFirestore, private router:Router, private store:Store<URL>, 
    private element:ElementRef, private renderer2:Renderer2) { }
  ngOnInit() {
    this.route.params.subscribe((res:any)=>{
      this._id = res.id
    })
    this.getDetail();
    this.getMessageCollection();
    this.allBellboys();
  }
  ngAfterViewInit(){
  }
  subscription:Subscription;
  bellboyOrigin;
  getDetail(){
    this.hiringService.getByid(this._id).subscribe((res:any)=>{
      this.detailHiring = res.data;
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
      if(this.detailHiring.status ==2 || this.detailHiring.status ==3){
        let bbId = res.data.bellboy._id;
        this.databse.list('/bellboys/'+bbId).valueChanges().subscribe((res:any)=>{
          if(this.bellboyOrigin == undefined || this.bellboyOrigin == null){
            this.bellboyOrigin = {
              lat:+res[1].latitude?+res[1].latitude:+res[0].latitude,
              lng:+res[1].longitude?+res[1].longitude:+res[0].longitude
            }
            this.getEstimatedRoute(this.bellboyOrigin);
          }
          this.destinition = {
            lat:+res[0].latitude,
            lng:+res[0].longitude
          }
        })
        this.databse.list('/hirings/'+this.detailHiring._id+'/initialLocation').snapshotChanges().subscribe((res:any)=>{
          // console.log(res, 'res')
          let latitude; let longitude;
          res.forEach((el:any) => {
            if(el.key == 'latitude'){
              latitude = el.payload.toJSON();
            }else if(el.key == 'longitude'){
              longitude = el.payload.toJSON();
            }
          });
            if(this.origin == undefined && latitude && longitude){
              this.origin = {
                lat:+latitude,
                lng:+longitude
              }
              console.log(this.origin, 'origin', this.destinition, 'destination')
            }
        })
      }else if(this.detailHiring.status == 4){
        this.databse.list('/hirings/'+this.detailHiring._id+'/initialLocation').snapshotChanges().subscribe((res:any)=>{
          // console.log(res, 'res')
          let latitude; let longitude;
          res.forEach((el:any) => {
            if(el.key == 'latitude'){
              latitude = el.payload.toJSON();
            }else if(el.key == 'longitude'){
              longitude = el.payload.toJSON();
            }
          });
            if(this.origin == undefined && latitude && longitude){
              this.origin = {
                lat:+latitude,
                lng:+longitude
              }
            }
        });
        this.databse.list('/hirings/'+this.detailHiring._id+'/geolocations', (query)=>query.orderByChild('time')).valueChanges().subscribe((res:any)=>{
          res.forEach(element => {
            let response;
            let key = Object.keys(element);
            if(key.length !== 1){
              response = element;
            }else{
              response = element[key[0]];
            }
            if(this.origin == undefined){
              this.origin = {
                lat:+response.latitude,
                lng:+response.longitude
              }
            }
            this.destinitions.push({
              lat:+response.latitude,
              lng:+response.longitude
            })
          });
        })
      }
    })
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
      this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title', windowClass: 'bigImage'})
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
      lat:this.detailHiring.location.geolocation.latitude,
      lng:this.detailHiring.location.geolocation.longitude
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