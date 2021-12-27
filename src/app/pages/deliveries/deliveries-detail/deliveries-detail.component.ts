import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { DeliveriesService } from '../deliveries.service';
<<<<<<< HEAD
=======
import { MapsAPILoader } from '@agm/core';
>>>>>>> webfix/bellboy-copy
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AngularFirestore } from '@angular/fire/firestore';
import { amazonUrl } from 'app/shared/services/global';

@Component({
  selector: 'app-deliveries-detail',
  templateUrl: './deliveries-detail.component.html',
  styleUrls: ['./deliveries-detail.component.scss']
})
export class DeliveriesDetailComponent implements OnInit, AfterViewInit {
  subscription: Subscription;
  _id;
  detailOrder:any
  map2;
  latitude: number;
  longitude: number;
  zoom: number;
  address: string;
  goodsPurchased:number = 0;
  totalbill:number;
  totalCharges:number;
  amazonImgUrl:string = amazonUrl;
  constructor(private route:ActivatedRoute, 
    private deliveries:DeliveriesService,
<<<<<<< HEAD
=======
    private mapsAPILoader: MapsAPILoader,
>>>>>>> webfix/bellboy-copy
    private modalService:NgbModal, private db:AngularFirestore) { }
    map;
    service;
    infowindow;
    currentImage;
    chat:any;
  ngOnInit() {
<<<<<<< HEAD
    this.getSingleorder()  
=======
    this.mapsAPILoader.load().then(()=>{
      this.getSingleorder()
    })  
>>>>>>> webfix/bellboy-copy
    this.subscription = this.route.params.subscribe((res:any)=>{
      this._id = res.id
    })
    this.getMessageCollection()  
  }
  async getMessageCollection(){
    await this.db.collection('/delivery_messages/'+this._id+'/'+this._id).snapshotChanges()
    .subscribe((res:any)=>{
      this.chat = []
      res.map((response:any)=>{
        this.chat.push(response.payload.doc.data())
      })
    })
  }
  getSingleorder(){
    this.deliveries.getById(this._id).subscribe((res:any)=>{
      this.detailOrder = res.data
      for(let i=0; i<this.detailOrder['bill_images'].length; i++){
        this.goodsPurchased = this.goodsPurchased+this.detailOrder['bill_images'][i].bill
      }
      this.totalCharges = this.detailOrder.charges.fuelCharges.calculated+
      this.detailOrder.charges.serviceCharges.calculated + 
      this.detailOrder.charges.timeCosting.calculated + 
      this.detailOrder.charges.waitingCharges.calculated
      let loc = this.detailOrder.deliveryAddress.address
      if(loc.length!=0){
        this.initMap(loc)
      }else{
        return false
      }
      let loc1 = this.detailOrder.pickUpAddress.address
      if(loc1.length!=0){
        this.initMap2(loc1)
      }else{
        return false
      }
    })
  }
  openModel(content, url) {
    this.currentImage  =  'https://api.bellboy.co/'+url
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title', windowClass: 'bigImage', backdrop:'static', keyboard:false})
  }
  // For delivery
  initMap(location){
    var sydney = new google.maps.LatLng(31.379584225366795, 73.12545899301767);
    this.infowindow = new google.maps.InfoWindow();
    this.map = new google.maps.Map(
    document.getElementById('map'), {center: sydney, zoom: 15});
    var request = {
      query: location,
      fields: ['name', 'geometry'],
    };
    this.service = new google.maps.places.PlacesService(this.map);
    this.service.findPlaceFromQuery(request, (results, status)=> {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < results.length; i++) {
          this.createMarker(results[i]);
        }
        this.map.setCenter(results[0].geometry.location);
      }
    });
  }
  createMarker(place) {
    var marker = new google.maps.Marker({
      map: this.map,
      position: place.geometry.location
    });
    google.maps.event.addListener(marker, 'click', ()=> {
      this.infowindow.setContent(place.name);
      this.infowindow.open(this.map, this);
    });
  }
  // for pickup location
  initMap2(location){
    var sydney = new google.maps.LatLng(31.379584225366795, 73.12545899301767);
    this.infowindow = new google.maps.InfoWindow();
    this.map2 = new google.maps.Map(
    document.getElementById('map1'), {center: sydney, zoom: 15});
    var request = {
      query: location,
      fields: ['name', 'geometry'],
    };
    this.service = new google.maps.places.PlacesService(this.map2);
    this.service.findPlaceFromQuery(request, (results, status)=> {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < results.length; i++) {
          this.createMarker2(results[i]);
        }
        this.map2.setCenter(results[0].geometry.location);
      }
    });
  }
  createMarker2(place) {
    var marker = new google.maps.Marker({
      map: this.map2,
      position: place.geometry.location
    });
    google.maps.event.addListener(marker, 'click', ()=> {
      this.infowindow.setContent(place.name);
      this.infowindow.open(this.map2, this);
    });
  }
  ngAfterViewInit() {
  }
}