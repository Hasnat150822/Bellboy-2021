import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
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
  currentPage;
  totalHirings;
  constructor(private bbService:BellboyService, private modalService:NgbModal) { }
  @Input() bbId;
  ngOnInit() {
    this.getBellboys(1);
  }

  getBellboys(page){
    this.bbHirings = [];
    this.currentPage = page;
    this.spinner = true;
    this.bbService.getBellboysHirings(this.bbId, page, 6).subscribe((res:any)=>{
      this.bbHirings = res.data.hirings;
      this.totalHirings = res.data.totalHiringsCount;
      this.spinner = false;
    })
  }
  closeModal(){
    this.modalService.dismissAll();
  }
}
