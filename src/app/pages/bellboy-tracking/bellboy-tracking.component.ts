import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Router, ActivatedRoute } from '@angular/router';
import { amazonUrl } from 'app/shared/services/global';
import { BellboyService } from '../bellboy/bellboy.service';
declare const $: any;
@Component({
  selector: 'app-bellboy-tracking',
  templateUrl: './bellboy-tracking.component.html',
  styleUrls: ['./bellboy-tracking.component.scss']
})
export class BellboyTrackingComponent implements OnInit {
  locations;
  lat = 31.5204;
  lng = 74.3587;
  zoom: Number = 10;
  bellboys: any = [];
  hiring_id: string;
  spinner: boolean; isSelected: boolean = true;
  amazonImgUrl: string = amazonUrl;
  constructor(private db: AngularFireDatabase, private router: Router, private route: ActivatedRoute,
    private bellboyService: BellboyService) {
  }
  ngOnInit() {
    this.route.params.subscribe((res: any) => {
      this.hiring_id = res.queryParams;
    })
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
  }
  detailView(id) {
    this.router.navigate(['/bellboy/bellboydetail', id]);
  }
  maximize() {
    $('#mapView').toggleClass('col-sm-8 col-sm-12')
    $('#bellboy').toggleClass('col-sm-4 d-none')
  }
}