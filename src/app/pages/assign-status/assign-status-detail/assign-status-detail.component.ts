import { Component, OnInit, NgZone, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MapsAPILoader } from '@agm/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DeliveriesService } from '../../deliveries/deliveries.service';
import { HiringService } from 'app/pages/hiring/hiring.service';
import { AssignStatusService } from '../assign-status.service';
import { PagerService } from 'app/shared/services/pager.service';
import { AngularFireDatabase } from '@angular/fire/database';
import { amazonUrl } from 'app/shared/services/global';
declare const $:any;
@Component({
  selector: 'app-assign-status-detail',
  templateUrl: './assign-status-detail.component.html',
  styleUrls: ['./assign-status-detail.component.scss']
})
export class AssignStatusDetailComponent implements OnInit, AfterViewInit {
  subscription: Subscription;
  _id
  detailOrder:any
  map2
  latitude: number;
  longitude: number;
  zoom: number;
  address: string;
  constructor(private route:ActivatedRoute, 
    private deliveries:DeliveriesService,
    private mapsAPILoader: MapsAPILoader,
    private modalService:NgbModal) { }
    map;
    service;
    infowindow;
    currentImage;
    type; amazonImgUrl:string = amazonUrl;
  ngOnInit() {
    this.mapsAPILoader.load().then(()=>{
      this.getSingleorder()
    })
    this.subscription = this.route.params.subscribe((res:any)=>{
      this._id = res.id
    })
    this.subscription = this.route.queryParams.subscribe((res:any)=>{
      this.type = res.type
    })
    //load Places Autocomplete
  }
  getSingleorder(){
    this.deliveries.getById(this._id).subscribe((res:any)=>{
      this.detailOrder = res.data
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
    this.currentImage  =  this.amazonImgUrl+url
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title', windowClass: 'bigImage',backdrop:'static'})
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
@Component({
  selector:'assign-status-hiring-detail',
  templateUrl:'./assign-status-detail-hiring.component.html',
  styleUrls:['./assign-status-detail.component.scss']
})
export class AssignDetailHiringComponent implements OnInit{
  _id
  detailHiring
  currentImage;
  loc;spinner:boolean;
  bellboys:any;pagedItems:any;pager:any={};
  amazonImgUrl:string = amazonUrl;
  constructor(private route:ActivatedRoute, private hiringService:HiringService,private router:Router,
    private modalService:NgbModal, private service:AssignStatusService, private pagerService:PagerService, private databse:AngularFireDatabase) { }
  ngOnInit() {
    this.route.params.subscribe((res:any)=>{
      this._id = res.id
    })
    this.getDetail();
    this.allBellboys();
  }
  getDetail(){
    this.hiringService.getByid(this._id).subscribe((res:any)=>{
      this.detailHiring = res.data;
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
  openModel(content, url) {
    this.currentImage  =  'https://api.bellboy.co/'+url
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title', windowClass: 'bigImage'})
  }
  open(content, loc){
    this.loc = loc;
    this.loc['zoom'] = 15;
      this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title', windowClass: 'bigImage'})
  }
  allBellboys(){
    let subscriptions:Subscription = this.service.availableBellboy().subscribe((res:any)=>{
      this.bellboys = res.data.bellBoys;
      this.setPage(1);
    }, error=>{}, ()=>{subscriptions.unsubscribe()})
  }
  setPage(page){
    if(page>this.pager.totalPages){
      page = this.pager.totalPages
    }else if(page<0){
      page = 1
    } 
    this.pager = this.pagerService.getPager(this.bellboys.length, page, 6);
    this.pagedItems = this.bellboys.slice(this.pager.startIndex, this.pager.endIndex+1);
  }
  assignBellboy(bbId){
  this.spinner = true;
    this.service.assignBellboy(bbId, this.detailHiring._id).subscribe((res:any)=>{
      if(res.success==true){
        this.router.navigate(['hiring/hiringDetail/', this._id]);
        this.spinner = false;
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
}