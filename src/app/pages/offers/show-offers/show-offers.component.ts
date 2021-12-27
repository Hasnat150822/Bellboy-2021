import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { OfferModel } from 'app/shared/models/offers.model';
import { Observable } from 'rxjs';
import { amazonUrl } from "../../../shared/services/global";
import { OfferService } from '../offers.service';
@Component({
  selector: 'app-show-offers',
  templateUrl: './show-offers.component.html',
  styleUrls: ['./show-offers.component.css']
})
export class ShowOffersComponent implements OnInit, OnChanges {
  @Input() promotions : OfferModel[];
  @Output() page = new EventEmitter();
  pager$;
  amazonUrl = amazonUrl;
  @Input() pageType:string;
  constructor(
    private service:OfferService
  ) { }

  ngOnInit(): void {
    this.pager$ = this.service.pager.asObservable();
  }

  ngOnChanges() {
  }

  getPage(page) {
    this.page.emit(page);
  }

}
