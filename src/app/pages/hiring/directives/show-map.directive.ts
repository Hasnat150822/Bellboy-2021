import { Directive, ElementRef, Input, OnChanges, OnInit } from '@angular/core';
import { initMapSingleMarker } from '../detail-page/googleMap';

@Directive({
  selector: '[appShowMap]'
})
export class ShowMapDirective implements OnInit {
  @Input('appShowMap') geopoint;
  constructor(private el:ElementRef) { }

  ngOnInit(){
    let position = {
      lat:this.geopoint.geopoint.df,
      lng:this.geopoint.geopoint.wf
    }
    initMapSingleMarker(position, this.el.nativeElement);
  }
}