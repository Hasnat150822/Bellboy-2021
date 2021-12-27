<<<<<<< HEAD
import { Component, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { checkPage, startDateWeek } from 'app/shared/services/global';
=======
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { checkPage } from 'app/shared/services/global';
>>>>>>> webfix/bellboy-copy
import { PagerService } from 'app/shared/services/pager.service';
import { BellboyService } from '../bellboy.service';

@Component({
  selector: 'app-bellboy-hirings',
  templateUrl: './bellboy-hirings.component.html',
  styleUrls: ['./bellboy-hirings.component.scss']
})
export class BellboyHiringsComponent implements OnInit {
  bbHirings;
<<<<<<< HEAD
  filterForm:FormGroup;
  spinner:boolean;
  totalHirings;
  pager:any = {};
  dateValue
  type = 'hiring';
  get filter(){
    return this.filterForm.controls.filter;
  }
  constructor(
    private bbService:BellboyService, 
    private modalService:NgbModal, 
    private pagerService:PagerService,
    private router:Router, 
    private rendrer2: Renderer2,
    private el:ElementRef, 
    private fb:FormBuilder) { 
      this.filterForm = this.fb.group({
        filter:''
      })
     }
=======
  spinner:boolean;
  totalHirings;
  pager:any = {};
  constructor(private bbService:BellboyService, private modalService:NgbModal, private pagerService:PagerService,
    private router:Router) { }
>>>>>>> webfix/bellboy-copy
  @Input() bbId;
  ngOnInit() {
    this.getBellboyHiring(1);
  }
<<<<<<< HEAD
  startDate;
  endDate;
=======

>>>>>>> webfix/bellboy-copy
  getBellboyHiring(page){
    page = checkPage(page, this.pager.totalPages);
    this.bbHirings = [];
    this.spinner = true;
<<<<<<< HEAD
    this.bbService.getBellboysHirings(this.bbId, page, 6, this.startDate, this.endDate, this.type).subscribe((res:any)=>{
      this.bbHirings = res.data.hirings;
      if(res.data.totalHiringsCount){
        this.pager = this.pagerService.getPager(res.data.totalHiringsCount, page, 6);
      }
      if(res.data.totalRidesCount){
        this.totalHirings = res.data.totalRidesCount;
      }
      if(res.data.totalPaCount){
        this.totalHirings = res.data.totalPaCount;
      }
=======
    this.bbService.getBellboysHirings(this.bbId, page, 6).subscribe((res:any)=>{
      this.bbHirings = res.data.hirings;
      this.totalHirings = res.data.totalHiringsCount;
      this.pager = this.pagerService.getPager(this.totalHirings, page, 6);
>>>>>>> webfix/bellboy-copy
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
<<<<<<< HEAD
  
  openClose(id){
    let el = this.el.nativeElement.querySelector('#'+id);
    if(el==null) return;
    if(el.className.includes('d-none')){
      this.rendrer2.removeClass(el, 'd-none');
    }else{
      this.rendrer2.addClass(el, 'd-none');
    }
  }
  
  reset(){
    this.dateValue = '';
    this.filterForm.reset();
    this.openClose('filterOpt')
  }
  
  searchByDate(){
    let dateObj = {};
    if(this.filter.value=='byDay'){
      this.startDate = this.dateValue;
      this.endDate = this.dateValue;
      this.openClose('filterOpt')
    }else if(this.filter.value == 'byWeek'){
      let year = this.dateValue.split('-')[0];
      let week = this.dateValue.split('-')[1].split('W')[1];
      let startDate = startDateWeek(year, week);
      let endDate = startDateWeek(year, week);
      endDate.setDate(startDateWeek(year, week).getDate()+6);
      this.startDate = startDate.toISOString().split('T')[0];
      this.endDate = endDate.toISOString().split('T')[0];
      this.openClose('filterOpt')
    }else{
      let year = this.dateValue.split('-')[0];
      let month = this.dateValue.split('-')[1];
      let lastDate = new Date(year, month, 0);
      // 2021, 12
      this.startDate = year+'-'+month+'-'+'1';
      this.endDate = year+'-'+month+'-'+lastDate.getDate();
      this.openClose('filterOpt')
    }
    this.getBellboyHiring(1);
  }
  getByType(type){
    this.type = type;
    this.getBellboyHiring(1);
    setTimeout(() => {
      this.openClose('hiringType');
    }, 2000);
  }
=======
>>>>>>> webfix/bellboy-copy
}
