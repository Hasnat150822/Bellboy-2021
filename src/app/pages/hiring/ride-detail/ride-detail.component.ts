import { Component,ElementRef,Input,OnInit} from '@angular/core';
import { MarkerClusterer } from "@googlemaps/markerclusterer";
import { amazonUrl, loader } from 'app/shared/services/global';
declare const $:any;
var map: google.maps.Map;
var center: google.maps.LatLngLiteral = {lat: 31.5204, lng: 74.3587};
const labels = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
@Component({
  selector: 'app-ride-detail',
  templateUrl: './ride-detail.component.html',
  styleUrls: ['./ride-detail.component.css']
})
export class RideDetailComponent implements OnInit{
  @Input() detailHiring;
  typeLocation = 'all';
  locations = [];
  lat:number;
  lng:number;
  zoom: Number = 10;
  singleLocation;
  mapElement:HTMLElement;
  contentString:string;
  amazonImgUrl: string = amazonUrl;
  constructor(private el:ElementRef){}

  ngOnInit(){
    
  }

  async ngOnChanges(){
    if (this.detailHiring) {
      this.detailHiring.bellboy_location['location_type']='Bellboy';
      this.detailHiring.customer_location['location_type']='Customer';
      this.detailHiring.pickup_location['location_type']='Pickup';
      this.detailHiring.dropoff_location['location_type']='Dropoff';
      this.locations.push(this.detailHiring.bellboy_location);
      this.locations.push(this.detailHiring.customer_location);
      this.locations.push(this.detailHiring.pickup_location);
      this.locations.push(this.detailHiring.dropoff_location);
      this.locations = await this.locations.filter((item)=>{
        return item.coordinates[0]!==0 || item.coordinates[1]!==0;
      })
      let avgLat:number = 0;
      let avgLng:number = 0;
      await this.locations.forEach(element => {
        avgLat += +element.coordinates[1];
        avgLng += +element.coordinates[0]
      });
      avgLat = +(avgLat/this.locations.length).toFixed(4);
      avgLng = +(avgLng/this.locations.length).toFixed(4);
      center = {
        lat:avgLat,
        lng:avgLng
      }
      loader.load().then(()=>{
        this.initMap();
      })
    }
  }

  maximize() {
    $('#mapView').toggleClass('col-sm-8 col-sm-12')
    $('#bellboy').toggleClass('col-sm-4 d-none')
  }

  async initMap() {
    this.mapElement = this.el.nativeElement.querySelector('#map');
    map = new google.maps.Map(this.mapElement as HTMLElement, {
      center,
      zoom: 8
    });
    let markers = await this.locations.map((el:any, i:any) => {
      let marker =   new google.maps.Marker({
        position: {
          lat:+el.coordinates[1],
          lng:+el.coordinates[0]
        },
        label: labels[i % labels.length],
      });
      this.contentString = 
      '<div class="row align-items-center">'+
          '<div class="col-sm-8">'+
            `<h5 class="font-weight-500">${el?.location_type}</h5>`+
            '<p>'+
              '<span class="font-weight-500">Address: &nbsp;</span>'+
              `<span>${el?.address}</span>`+
            '</p>'+
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
      return marker;
    })
    new MarkerClusterer({
      map,
      markers
    })
  }

  changeCurrent(item){
    this.typeLocation = 'selected';    
    this.mapElement = this.el.nativeElement.querySelector('#map2');
    map = new google.maps.Map(this.mapElement as HTMLElement, {
      center:{lat:+item.coordinates[1],lng:+item.coordinates[0]},
      zoom: 8
    });
    this.contentString = 
    '<div class="row align-items-center">'+
        '<div class="col-sm-8">'+
          `<h5 class="font-weight-500">${item?.location_type}</h5>`+
          '<p>'+
            '<span class="font-weight-500">Address: &nbsp;</span>'+
            `<span>${item?.address}</span>`+
          '</p>'+
        '</div>'+
      '</div>';
      let infowindow = new google.maps.InfoWindow({
        content: this.contentString,
      });
      let marker:google.maps.Marker = new google.maps.Marker({ 
        position: {lat:+item.coordinates[1],lng:+item.coordinates[0]}
      });
      marker.addListener("mouseover", () => {
        infowindow.open(map, marker)
      });
      marker.addListener("mouseout", () => {
        infowindow.close();
      })
      new MarkerClusterer({
        map,
        markers:[marker]
      })
  }

  resetMap(){
    this.typeLocation = 'all';
  }

}