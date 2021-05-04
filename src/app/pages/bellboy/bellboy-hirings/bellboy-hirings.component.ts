import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { checkPage } from 'app/shared/services/global';
import { PagerService } from 'app/shared/services/pager.service';
import { Observable } from 'rxjs';
import { BellboyService } from '../bellboy.service';
import { BellboyHirings } from '../modals/bellboy-hirings';

@Component({
  selector: 'app-bellboy-hirings',
  templateUrl: './bellboy-hirings.component.html',
  styleUrls: ['./bellboy-hirings.component.scss']
})
export class BellboyHiringsComponent implements OnInit {
  bbHirings;
  spinner:boolean;
  totalHirings;
  pager:any = {};
  constructor(private bbService:BellboyService, private modalService:NgbModal, private pagerService:PagerService) { }
  @Input() bbId;
  ngOnInit() {
    this.getBellboyHiring(1);
  }

  getBellboyHiring(page){
    page = checkPage(page, this.pager.totalPages);
    this.bbHirings = [];
    this.spinner = true;
    this.bbService.getBellboysHirings(this.bbId, page, 6).subscribe((res:any)=>{
      this.bbHirings = res.data.hirings;
      this.totalHirings = res.data.totalHiringsCount;
      this.pager = this.pagerService.getPager(this.totalHirings, page, 6);
      this.spinner = false;
    })
  }
  closeModal(){
    this.modalService.dismissAll();
  }
}
