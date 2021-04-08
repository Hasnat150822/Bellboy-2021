import { Component, OnInit, AfterViewInit } from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { BellboyService } from './bellboy.service';
import { PagerService } from 'app/shared/services/pager.service';
import Swal from 'sweetalert2';
import { amazonUrl } from 'app/shared/services/global';
import { Store } from '@ngrx/store';
import { URL } from '../../ngrx-states/model/url.model';
import * as allActions from '../../ngrx-states/actions';
declare const $:any;
@Component({
  selector: 'app-bellboy',
  templateUrl: './bellboy.component.html',
  styleUrls: ['./bellboy.component.scss']
})
export class BellboyComponent implements OnInit, AfterViewInit{
  closeResult = '';
  isallBellboy:boolean;
  isactiveBellboy:boolean = true;
  ispendingBellboy:boolean
  isrejBellboy:boolean
  isblBellboy:boolean
  // allBellBoy
  pagedBellboy:any[]
  tempBellboy:any[]
  pager:any = {}
  spinner:boolean
  // Active Bellboy
  pagedBellboyA:any[]
  tempAbellBoy:any[]
  pagerA:any = {}
  // pending bellboy
  pagedBellboyP:any[]
  tempPbellBoy:any[]
  pagerP:any = {}
  // Rejected
  pagedBellboyR:any[]
  tempRbellBoy:any[]
  pagerR:any = {}
  // Blocked
  pagedBellboyB:any[]
  tempBbellBoy:any[]
  amazonImgUrl:string = amazonUrl;
  pagerB:any = {}; placeVal:string = "Name";
  searchDropdown = [
    {
      fieldName:"Id",
      type:'text',
      searchType:'searchById'
    }
  ]
  isBigImg:boolean;
  constructor(private modalService: NgbModal, private bellboyService:BellboyService,
    private pagerService:PagerService, private store:Store<URL>){
  }     
  ngOnInit(){
    // 0 => pending, 1=> approved / active, 2=> reject , 3=> blocked
    this.ActiveBellboy();
  }
  // All Bell Boy
  getAllBellBoy(){
    this.spinner = true;
    this.pagedBellboy = [];
    this.bellboyService.getAllBellboy(4).subscribe((res:any)=>{
      this.spinner = false
      this.tempBellboy = res.data.bellBoys
      this.isallBellboy = true
      this.isactiveBellboy = false
      this.isblBellboy = false
      this.ispendingBellboy = false
      this.isrejBellboy = false
      this.setPage(1)
    }, error=>{
      this.spinner = false
    })
  }  
  setPage(page:number){
    if(page>this.pager.totalPages){
      page = this.pager.totalPages
    }else if(page<0){
      page = 1
    }
    this.pager = this.pagerService.getPager(this.tempBellboy.length, page)
    this.pagedBellboy = this.tempBellboy.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }
  searchBellboy(keyword){
    if(keyword.length==0){
      this.pagedBellboy = this.tempBellboy
    }else{
      keyword = keyword.toLowerCase()
      this.pagedBellboy = this.tempBellboy.filter(f=> f.name.toLowerCase().indexOf(keyword) !==-1)
    }
  }
  searchBellboyByCell(keyword){
    if(keyword.length==0){
      this.pagedBellboy = this.tempBellboy;
    }else{
      keyword = +keyword;
      this.pagedBellboy = this.tempBellboy.filter(f=> f.mobile.toLowerCase().indexOf(keyword) !==-1);
    }
  }
  searchBellboyByCNIC(keyword){
    if(keyword.length==0){
      this.pagedBellboy = this.tempBellboy;
    }else{
      keyword = +keyword;
      this.pagedBellboy = this.tempBellboy.filter(f=> f.legals.nic.value.toLowerCase().indexOf(keyword) !==-1);
    }
  }
  searchActive(keyword){
    if(keyword.length==0){
      this.pagedBellboyA = this.tempAbellBoy;
    }else{
      keyword = keyword.toLowerCase()
      this.pagedBellboyA = this.tempAbellBoy.filter(f=> f.name.toLowerCase().indexOf(keyword) !==-1)
    }
  }
  searchActiveByCell(keyword){
    if(keyword.length==0){
      this.pagedBellboyA = this.tempAbellBoy;
    }else{
      keyword = +keyword;
      this.pagedBellboyA = this.tempAbellBoy.filter(f=> f.mobile.toLowerCase().indexOf(keyword) !==-1)
    }
  }
  searchActiveByCNIC(keyword){
    if(keyword.length==0){
      this.pagedBellboyA = this.tempAbellBoy
    }else{
      keyword = +keyword;
      this.pagedBellboyA = this.tempAbellBoy.filter(f=> f.legals.nic.value.toLowerCase().indexOf(keyword) !==-1)
    }
  }
  searchPending(keyword){
    if(keyword.length==0){
      this.pagedBellboyP = this.tempPbellBoy
    }else{
      keyword = keyword.toLowerCase()
      this.pagedBellboyP = this.tempPbellBoy.filter(f=> f.name.toLowerCase().indexOf(keyword) !==-1)
    }
  }
  searchPendingByCell(keyword){
    if(keyword.length==0){
      this.pagedBellboyP = this.tempPbellBoy
    }else{
      keyword = +keyword
      this.pagedBellboyP = this.tempPbellBoy.filter(f=> f.mobile.toLowerCase().indexOf(keyword) !==-1)
    }
  }
  searchPendingByCNIC(keyword){
    if(keyword.length==0){
      this.pagedBellboyP = this.tempPbellBoy
    }else{
      keyword = +keyword
      this.pagedBellboyP = this.tempPbellBoy.filter(f=> f.legals.nic.value.toLowerCase().indexOf(keyword) !==-1)
    }
  }
  searchRejected(keyword){
    if(keyword.length==0){
      this.pagedBellboyR = this.tempRbellBoy
    }else{
      keyword = keyword.toLowerCase()
      this.pagedBellboyR = this.tempRbellBoy.filter(f=> f.name.toLowerCase().indexOf(keyword) !==-1)
    }
  }
  searchRejectedByCell(keyword){
    if(keyword.length==0){
      this.pagedBellboyR = this.tempRbellBoy
    }else{
      keyword = +keyword;
      this.pagedBellboyR = this.tempRbellBoy.filter(f=> f.mobile.toLowerCase().indexOf(keyword) !==-1)
    }
  }
  searchRejectedByCNIC(keyword){
    if(keyword.length==0){
      this.pagedBellboyR = this.tempRbellBoy
    }else{
      keyword = +keyword;
      this.pagedBellboyR = this.tempRbellBoy.filter(f=> f.legals.nic.value.toLowerCase().indexOf(keyword) !==-1)
    }
  }
  searchBlock(keyword){
    if(keyword.length==0){
      this.pagedBellboyB = this.tempBbellBoy
    }else{
      keyword = keyword.toLowerCase()
      this.pagedBellboyB = this.tempBbellBoy.filter(f=> f.name.toLowerCase().indexOf(keyword) !==-1)
    }
  }
  searchBlockByCell(keyword){
    if(keyword.length==0){
      this.pagedBellboyB = this.tempBbellBoy
    }else{
      keyword = +keyword;
      this.pagedBellboyB = this.tempBbellBoy.filter(f=> f.mobile.toLowerCase().indexOf(keyword) !==-1)
    }
  }
  searchBlockByCNIC(keyword){
    if(keyword.length==0){
      this.pagedBellboyB = this.tempBbellBoy
    }else{
      keyword = +keyword;
      this.pagedBellboyB = this.tempBbellBoy.filter(f=> f.legals.nic.value.toLowerCase().indexOf(keyword) !==-1)
    }
  }
  // Active Bellboy
  ActiveBellboy(){
    this.spinner = true
    this.bellboyService.getAllBellboy(1).subscribe((res:any)=>{
      this.spinner = false
      this.tempAbellBoy = res.data.bellBoys
      this.ispendingBellboy = false
      this.isrejBellboy = false
      this.isblBellboy = false
      this.isactiveBellboy = true
      this.isallBellboy = false
      this.setPageA(1)
    }, error=>{
      this.spinner = false
    })
  }
  setPageA(page:number){
    if(page>this.pager.totalPages){
      page = this.pager.totalPages
    }else if(page<0){
      page = 1
    }
      this.pagerA = this.pagerService.getPager(this.tempAbellBoy.length, page)
      this.pagedBellboyA = this.tempAbellBoy.slice(this.pagerA.startIndex, this.pagerA.endIndex + 1);
  }
  // Peniding bellboy
  PendingBellboy(){
    this.spinner = true
    this.bellboyService.getAllBellboy(0).subscribe((res:any)=>{
      this.tempPbellBoy = res.data.bellBoys
      this.ispendingBellboy = true
      this.isrejBellboy = false
      this.spinner = false
      this.isblBellboy = false
      this.isactiveBellboy = false
      this.isallBellboy = false
      this.setPageP(1)
    }, error=>{
      this.spinner = false
    })
  }
  setPageP(page:number){
    if(page>this.pager.totalPages){
      page = this.pager.totalPages
    }else if(page<0){
      page = 1
    }
      this.pagerP = this.pagerService.getPager(this.tempPbellBoy.length, page)
      this.pagedBellboyP = this.tempPbellBoy.slice(this.pagerP.startIndex, this.pagerP.endIndex + 1);
  }
  // Rejected bellboy
  RejectedBellboy(){
    this.spinner = true
    this.bellboyService.getAllBellboy(2).subscribe((res:any)=>{
      this.tempRbellBoy = res.data.bellBoys
      this.ispendingBellboy = false
      this.isrejBellboy = true
      this.isblBellboy = false
      this.isactiveBellboy = false
      this.isallBellboy = false
      this.spinner = false
      this.setPageR(1)
    }, error=>{
      this.spinner = false
    })
  }
  setPageR(page:number){
    if(page>this.pager.totalPages){
      page = this.pager.totalPages
    }else if(page<0){
      page = 1
    }
      this.pagerR = this.pagerService.getPager(this.tempRbellBoy.length, page)
      this.pagedBellboyR = this.tempRbellBoy.slice(this.pagerR.startIndex, this.pagerR.endIndex + 1);
  }
  // Blocked
  BlockedBellboy(){
    this.spinner = true
    this.bellboyService.getAllBellboy(3).subscribe((res:any)=>{
      this.tempBbellBoy = res.data.bellBoys
      this.ispendingBellboy = false
      this.isrejBellboy = false
      this.isblBellboy = true
      this.isactiveBellboy = false
      this.spinner = false
      this.isallBellboy = false
      this.setPageB(1)
    }, error=>{
      this.spinner = false
    })
  }
  setPageB(page:number){
    if(page>this.pager.totalPages){
      page = this.pager.totalPages
    }else if(page<0){
      page = 1
    }
      this.pagerB = this.pagerService.getPager(this.tempBbellBoy.length, page)
      this.pagedBellboyB = this.tempBbellBoy.slice(this.pagerB.startIndex, this.pagerB.endIndex + 1);
  }
  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    });
  }
  bigImage(url){
    this.isBigImg = true;
    this.store.dispatch(new allActions.SendUrl(url));
  }
  responseApproval(item, status){
    if(item.legals.nic.approval==0){
      Swal.fire({
        icon:'warning',
        text:'NIC not Approved',
        width:'300px',
        showCancelButton:false,
        showConfirmButton:false,
        timer:2500
      })
      return false
    }else{
      Swal.fire({
        icon:'question',
        text:'Are You Sure!',
        width:'300px',
        showConfirmButton:true,
        showCancelButton:true
      }).then((result)=>{
        if(result.value == true){
          this.bellboyService.manageStatusbellboy(item._id, status).subscribe((res:any)=>{
            if(status == 0){
              this.RejectedBellboy()
            }else if(status == 1){
              this.PendingBellboy()
              this.BlockedBellboy()
            }else if(status == 2){
              this.PendingBellboy()
            }else if(status == 3){
              this.ActiveBellboy()
            }
          })
        }else{
          return false
        }
      })
    }
  }
  // prev5Items(page){
  //   if(page<1){
  //     this.setPage(this.status, 1);
  //   }else{
  //     this.setPage(this.status, page);
  //   }
  // }
  // next5Items(page){
  //   if(page>this.pager.totalPages){
  //     this.setPage(this.status, this.pager.totalPages);
  //   }else{
  //     this.setPage(this.status, page);
  //   }
  // }
  ngAfterViewInit() {
    // for pending
  }
  }