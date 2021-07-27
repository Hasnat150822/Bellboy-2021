import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { checkPage } from 'app/shared/services/global';
import { PagerService } from 'app/shared/services/pager.service';
import { BellboyService } from '../bellboy.service';

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
  constructor(private bbService:BellboyService, private modalService:NgbModal, private pagerService:PagerService,
    private router:Router) { }
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
  hiringDetail(id){
    const url = this.router.serializeUrl(
      this.router.createUrlTree([`/hiring/hiringDetail/${id}`])
    );
    window.open(url, '_blank')
  }
  closeModal(){
    this.modalService.dismissAll();
  }
}
