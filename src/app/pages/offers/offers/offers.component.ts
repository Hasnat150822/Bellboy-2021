import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OfferModel } from 'app/shared/models/offers.model';
import { Observable } from 'rxjs';
import { OfferService } from '../offers.service';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.css'],
  providers:[OfferService]
})

export class OffersComponent implements OnInit {
  page:number = 1; 
  perPage:number = 10;
  pager$:Observable<{}>;
  promotions$:Observable<OfferModel[]>;
  type:string;
  constructor(
    private service:OfferService,
    private activatedRoute:ActivatedRoute
  ) { }

  ngOnInit() {
    this.type = this.activatedRoute.snapshot.data.text;
    this.getPromotions();
  }

  getPromotions() {
    this.promotions$ = this.service.getOffers(this.page, this.perPage, this.type);
  }

  recievePageStat(event){

  }

  getPage(event){
    this.page = event;
    this.getPromotions();
  }
}