import { Component, OnInit } from '@angular/core';
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
export class HiringDetailComponent implements OnInit {
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
  lat = 31.5204; lng =  74.3587
  public icon = {
    url: '../../../../assets/img/ico/map-marker/blue-marker.png',
    scaledSize: {
      width: 16,
      height: 16
    }
  }
  public renderOptions = {
    suppressMarkers: true,
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
  constructor(private route:ActivatedRoute, private hiringService:HiringService,private databse:AngularFireDatabase,
    private modalService:NgbModal, private db:AngularFirestore, private router:Router, private store:Store<URL>) { }
  ngOnInit() {
    this.route.params.subscribe((res:any)=>{
      this._id = res.id
    })
    this.getDetail();
    this.getMessageCollection();
    this.allBellboys();
  }
  subscription:Subscription;
  async getDetail(){
    this.hiringService.getByid(this._id).subscribe((res:any)=>{
      this.detailHiring = res.data;
      this.databse.list('/hirings/'+this.detailHiring._id).snapshotChanges().subscribe((res:any)=>{
        res.forEach(element => {
          element.payload.forEach((el) => {
            if(this.origin == undefined){
              this.origin = {
                lat: el.child(el.key).child("latitude").toJSON(),
                lng: el.child(el.key).child("longitude").toJSON()
              }
            }
            if(el.child(el.key).child("latitude").toJSON()!==undefined){
              this.destinitions.push({
                lat:el.child(el.key).child("latitude").toJSON(),
                lng:el.child(el.key).child("longitude").toJSON()
              })
            }
          });
        });
        this.getEstimatedRoute(this.destinitions[0]);
      })
    })
  }
  bigImage(url){
    this.isBigImg = true;
    this.store.dispatch(new allActions.SendUrl(url));
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
    this.hiringService.estimatedRoute(origin, destinition).subscribe()
  }
  onMouseOver(infoWindow, $event: MouseEvent) {
    infoWindow.open();
  }
  onMouseOut(infoWindow, $event: MouseEvent) {
    infoWindow.close();
  }
}