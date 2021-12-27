import { Component, Input, OnChanges, OnInit } from '@angular/core';
declare const $:any;
@Component({
  selector: 'app-location-card',
  templateUrl: './location-card.component.html',
  styleUrls: ['./location-card.component.css']
})
export class LocationCardComponent implements OnInit, OnChanges {
  @Input() personLocation;
  typeLocation = 'all';
  locations = [];
  lat:number;
  lng:number;
  zoom: Number = 10;
  singleLocation;
  constructor() { }

  ngOnInit(){
  }
  
  maximize() {
    $('#mapView').toggleClass('col-sm-8 col-sm-12')
    $('#bellboy').toggleClass('col-sm-4 d-none')
  }

  ngOnChanges(){

  }

  changeCurrent(item){
    this.typeLocation = 'selected';
    this.singleLocation = item;
  }

  resetMap(){
    this.typeLocation = 'all';
  }

  change;
  onMouseOver(infoWindow, $event: MouseEvent) {
    infoWindow.open();
  }
  onMouseOut(infoWindow, $event: MouseEvent) {
    infoWindow.close();
  }
}
