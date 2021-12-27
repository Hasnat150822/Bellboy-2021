<<<<<<< HEAD
import { Component, ElementRef, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Router, ActivatedRoute } from '@angular/router';
import { amazonUrl, loader } from 'app/shared/services/global';
import { MarkerClusterer } from "@googlemaps/markerclusterer";
declare const $: any;
var map: google.maps.Map;
var center: google.maps.LatLngLiteral = {lat: 31.5204, lng: 74.3587};
const labels = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
=======
import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Router, ActivatedRoute } from '@angular/router';
import { amazonUrl } from 'app/shared/services/global';
import { BellboyService } from '../bellboy/bellboy.service';
declare const $: any;
>>>>>>> webfix/bellboy-copy
@Component({
  selector: 'app-bellboy-tracking',
  templateUrl: './bellboy-tracking.component.html',
  styleUrls: ['./bellboy-tracking.component.scss']
})
export class BellboyTrackingComponent implements OnInit {
<<<<<<< HEAD
  locations = [];
=======
  locations;
>>>>>>> webfix/bellboy-copy
  lat = 31.5204;
  lng = 74.3587;
  zoom: Number = 10;
  bellboys: any = [];
  hiring_id: string;
<<<<<<< HEAD
  spinner: boolean; 
  isSelected: boolean = false;
  amazonImgUrl: string = amazonUrl;
  contentString:string;
  mapElement:HTMLElement;
  constructor(
    private db: AngularFireDatabase, 
    private router: Router, 
    private route: ActivatedRoute,
    private el:ElementRef) {
=======
  spinner: boolean; isSelected: boolean = true;
  amazonImgUrl: string = amazonUrl;
  constructor(private db: AngularFireDatabase, private router: Router, private route: ActivatedRoute,
    private bellboyService: BellboyService) {
>>>>>>> webfix/bellboy-copy
  }
  ngOnInit() {
    this.route.params.subscribe((res: any) => {
      this.hiring_id = res.queryParams;
    })
<<<<<<< HEAD
    loader.load().then(()=>{
      this.defaultMap();
    })
  }
  defaultMap() {
    this.db.list('/bellboys').valueChanges().subscribe(
      async(res:any)=>{
      this.locations = [];
      this.bellboys = await res;
      let avgLat:number = 0;
      let avgLng:number = 0;
      await this.bellboys.forEach(element => {
          avgLat += +element.geolocation?.latitude;
          avgLng += +element.geolocation?.longitude
      });
      avgLat = +(avgLat/this.bellboys.length).toFixed(4);
      avgLng = +(avgLng/this.bellboys.length).toFixed(4);
      center = {
        lat:avgLat,
        lng:avgLng
      }
      if(this.isSelected === false){
        this.initMap();
      }
    })
  }

  async initMap() {
    this.mapElement = this.el.nativeElement.querySelector('#map');
    map = new google.maps.Map(this.mapElement as HTMLElement, {
      center,
      zoom: 8
    });
    let markers = await this.bellboys.map((el:any, i:any) => {
      let marker =   new google.maps.Marker({
        position: {
          lat:+el.geolocation?.latitude,
          lng:+el.geolocation?.longitude
        },
        label: labels[i % labels.length],
      });
      this.contentString = 
      '<div class="row align-items-center">'+
        '<div class="col-sm-4">'+
          `<img class="window-img" style="height:100px; width:100px; object-fit:fill; border-radius:50%;" src="${this.amazonImgUrl}${el?.profile?.avatar}" onerror="src='../../../assets/img/gallery/1.jpg'">`+
          '</div>'+
          '<div class="col-sm-8">'+
            `<h5 class="font-weight-500">${el?.profile?.name}</h5>`+
            '<p>'+
              '<span class="font-weight-500">Mobile: &nbsp;</span>'+
              `<span>${el?.profile?.mobile}</span>`+
            '</p>'+
          '</div>'+
        '</div>'+
      '</div>';
      const infowindow = new google.maps.InfoWindow({
        content: this.contentString,
      });
      marker.addListener("mouseover", () => {
        infowindow.open(map, marker)
      });
      marker.addListener("mouseout", () => {
        infowindow.close();
      })
      marker.addListener('click', ()=>{
        this.detailView(el.profile?.id);
      })
      return marker;
    })
    new MarkerClusterer({
      map,
      markers
    })
  }

  zoomCurrent(item) {
    this.isSelected = true;
    if(this.isSelected === true){
      var infowindow;
      let marker:google.maps.Marker;
      let bellboyId;
      let label;
      this.db.list('/bellboys/' + item.profile.id).snapshotChanges()
      .subscribe(async(res:any)=>{
        await res.forEach(element => {
          //asigning profile values here
          if(element.payload.key == 'profile'){
            label = element.payload.val()?.name[0];
            bellboyId = element.payload.val()?.id;
            this.contentString = 
            '<div class="row align-items-center">'+
              '<div class="col-sm-4">'+
                `<img class="window-img" style="height:100px; width:100px; object-fit:fill; border-radius:50%;" src="${this.amazonImgUrl}${element.payload.val()?.avatar}" onerror="src='../../../assets/img/gallery/1.jpg'">`+
                '</div>'+
                '<div class="col-sm-8">'+
                  `<h5 class="font-weight-500">${element.payload.val()?.name}</h5>`+
                  '<p>'+
                    '<span class="font-weight-500">Mobile: &nbsp;</span>'+
                    `<span>${element.payload.val()?.mobile}</span>`+
                  '</p>'+
                '</div>'+
              '</div>'+
            '</div>';
            infowindow = new google.maps.InfoWindow({
              content: this.contentString,
            });
          }
          //asigning location to marker
          if(element.payload.key == 'geolocation'){
            this.mapElement = this.el.nativeElement.querySelector('#map2');
            center = {lat:+element.payload.val().latitude, lng:+element.payload.val().longitude};
            map = new google.maps.Map(this.mapElement as HTMLElement, {
              center,
              zoom: 10
            });
            marker = new google.maps.Marker({ 
              position: center
            });
          }
        });
        marker.addListener("mouseover", () => {
          infowindow.open(map, marker)
        });
        marker.addListener("mouseout", () => {
          infowindow.close();
        })
        marker.addListener('click', ()=>{
          this.detailView(bellboyId);
        })
        marker.setLabel(label)
        new MarkerClusterer({
          map,
          markers:[marker]
        })
      });
    }
  }
  resetMap() {
    this.isSelected = false;
    this.initMap();
=======
    this.defaultMap();
  }
  onMouseOver(infoWindow, $event: MouseEvent) {
    infoWindow.open();
  }
  onMouseOut(infoWindow, $event: MouseEvent) {
    infoWindow.close();
  }
  defaultMap() {
    if (this.isSelected === true) {
      this.db.list('/bellboys').valueChanges().subscribe((res:any)=>{
        this.bellboys = res;
      })
    }
  }
  zoomCurrent(item) {
    this.isSelected = false;
    this.zoom = 18;
    if (this.isSelected === false) {
      this.db.list('/bellboys/' + item.profile.id).valueChanges().subscribe((res: any) => {
        this.locations = { geolocation: {
          latitude:+res[0].latitude,
          longitude:+res[0].longitude
        }, profile: res[2] };
      })
    }
  }
  resetMap() {
    this.isSelected = true;
    this.lat = 31.5204;
    this.lng = 74.3587;
    this.zoom = 10;
    this.defaultMap();
>>>>>>> webfix/bellboy-copy
  }
  detailView(id) {
    this.router.navigate(['/bellboy/bellboydetail', id]);
  }
  maximize() {
    $('#mapView').toggleClass('col-sm-8 col-sm-12')
    $('#bellboy').toggleClass('col-sm-4 d-none')
  }
}