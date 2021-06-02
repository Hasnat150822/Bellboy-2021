import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { amazonUrl } from 'app/shared/services/global';
import { URL } from '../../../../ngrx-states/model/url.model';
import * as allActions from '../../../../ngrx-states/actions';
import { zoomin, zoomout } from '../zoom-in-out';
@Component({
  selector: 'app-big-image',
  templateUrl: './big-image.component.html',
  styleUrls: ['./big-image.component.scss']
})
export class BigImageComponent implements OnInit, OnDestroy {
  amazonImgUrl:string = amazonUrl;
  @ViewChild('bigImg', {static:true}) bigImg:ElementRef;
  constructor(private  modalService:NgbModal, private store:Store<URL>) { 
   }

  ngOnInit(): void {
    this.store.subscribe((res:any)=>{
      if(res.BigImage.url!==undefined){
        this.bigImage( this.bigImg,res.BigImage);
      }
    })
  }

  currentImage;
  bigImage(content, imgLink){
    this.modalService.dismissAll();
    this.currentImage = imgLink.url;
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title', windowClass: 'bigImage'})
  }
  zoomin(){
    zoomin('fullView');
  }
  zoomout(){
    zoomout('fullView');
  }
  closeModal(){
    this.modalService.dismissAll();
    this.store.dispatch(new allActions.ResetUrl());
  }
  ngOnDestroy() {
    this.modalService.dismissAll();
    this.store.dispatch(new allActions.ResetUrl());
  }
}