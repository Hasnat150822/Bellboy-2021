import { Component, OnInit, OnDestroy } from '@angular/core';
import { FinanceService } from '../finance.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';
declare const $:any;
@Component({
  selector: 'app-charges',
  templateUrl: './deliver-charges.component.html',
  styleUrls: ['./deliver-charges.component.scss']
})
export class ChargesComponent implements OnInit {
  inputId;
  isDisable:boolean = true
  deliveryCharges:any = []
  constructor() { }
  ngOnInit() {
  }
}