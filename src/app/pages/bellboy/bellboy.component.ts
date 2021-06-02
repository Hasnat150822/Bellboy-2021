import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core'
import { BellboyService } from './bellboy.service';
import { PagerService } from 'app/shared/services/pager.service';
import { amazonUrl, checkPage, confirmationDialog, sweetAlert } from 'app/shared/services/global';
import { Store } from '@ngrx/store';
import { AngularFireDatabase } from '@angular/fire/database';
import { URL } from '../../ngrx-states/model/url.model';
import * as allActions from '../../ngrx-states/actions';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-bellboy',
  templateUrl: './bellboy.component.html',
  styleUrls: ['./bellboy.component.scss']
})
export class BellboyComponent implements OnInit, AfterViewInit{
  pager:any = {}
  spinner:boolean
  inputType:number;
  searchValue;
  searchType:string = "search";
  amazonImgUrl:string = amazonUrl;
  placeVal:string = "Name";
  status:number;
  itemPerPage:number;
  totalItems:number;
  searchDropdown = [
    {
      fieldName:"Name",
      type:'text',
      searchType:'search'
    },
    {
      fieldName:"Cell No",
      type:'number',
      searchType:'mobile'
    }
  ]
  isBigImg:boolean;
  bellboys:Array<any>;
  tabstatus:string;
  @ViewChild('tabset', {static:true}) tabset;
  constructor(private bellboyService:BellboyService, private cdr:ChangeDetectorRef, private db: AngularFireDatabase,
    private pagerService:PagerService, private store:Store<URL>, private router:Router, private activatedRoute:ActivatedRoute){
  }     
  ngOnInit(){
    // 0 => pending, 1=> approved / active, 2=> reject , 3=> blocked, 4=>all
    // this.getBellboys();
    this.getQueryParams();
  }
  bigImage(url){
    this.isBigImg = true;
    this.store.dispatch(new allActions.SendUrl(url));
  }
  getBellboys(page=1, itemPerPage=10, status=1){
    this.bellboys = [];
    this.spinner = true;
    this.status = status; 
    this.itemPerPage = itemPerPage;
    page = checkPage(page, this.pager.totalPages);
    this.bellboyService.getAllBellboy(page, itemPerPage, status,this.searchType, this.searchValue)
    .subscribe((res:any)=>{
      this.totalItems = +res.count;
      this.spinner = false
      this.bellboys = res.bellBoys;
      this.pager = this.pagerService.getPager(this.totalItems, page, itemPerPage);
    }, err=>this.spinner = false)
  }
  onEnter(event){
    let key = event.keyCode;
    if(key === 13){
      event.preventDefault();
    }
  }
  setQueryParams(searchValue, itemPerPage, status, searchType){
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams:{ q:searchValue, perPage:itemPerPage, status:status, searchType:searchType },
      queryParamsHandling:'merge'
    })
  }
  getQueryParams(){
    this.activatedRoute.queryParams.subscribe((res:any)=>{
      if(res.status){
        this.searchValue = res.q;
        this.searchType = res.searchType;
        this.status = res.status;
        this.itemPerPage = res.perPage;
        this.getBellboys(1, res.perPage, res.status);
        switch (res.status) {
          case '1':
            this.tabstatus = 'tab1';
            break;
          case '0':
            this.tabstatus = 'tab2';
            break;
          case '2':
            this.tabstatus = 'tab3';
            break;
          case '3':
            this.tabstatus = 'tab4';
            break;
          case '4':
            this.tabstatus = 'tab5';
            break;
          default:
            break;
        }
      }else{
        this.getBellboys();
      }
    })
  }
  ngAfterViewInit(){
    this.tabset.select(this.tabstatus);
    // this.cdr.detectChanges();
  }
  responseApproval(item, status){
    if(item.legals.nic.approval==0){
      sweetAlert('warning', 'NIC not Approved');
      return false;
    }else{
      confirmationDialog().then((result)=>{
        if(result.value == true){
          this.bellboyService.manageStatusbellboy(item._id, status).subscribe((res:any)=>{
            if(status==3){
              this.db.list('/bellboys/'+res.data._id).remove();
            }else if(status == 1){
              this.db.database.ref('/bellboys/').child(res.data._id).set({
                geolocation:{
                  latitude:'31.377812808457396',
                  longitude:'74.18572878868932'
                },
                profile:{
                  id:res.data._id,
                  avatar:res.data.avatar.value,
                  name:res.data.name,
                  mobile:res.data.mobile
                },
                initialLocation:{
                  latitude:'31.377812808457396',
                  longitude:'74.18572878868932'
                }
              })
            }
            this.getBellboys(1, this.itemPerPage, this.status);
          })
        }else{
          return false
        }
      })
    }
  }
  }