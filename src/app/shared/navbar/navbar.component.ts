import { Component, Output, EventEmitter, OnInit, AfterViewInit, Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { LayoutService } from '../services/layout.service';
import { ConfigService } from '../services/config.service';
import { Router } from '@angular/router';
import { UserService } from 'app/pages/user-management/user.service';
import { GlobalService } from '../services/global-service.service';
import { ResolverService } from '../services/resolver.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { Store } from '@ngrx/store';
import { USER_NAME } from 'app/ngrx-states/model/url.model';
import * as allActions from '../../ngrx-states/actions';
import { amazonUrl } from '../services/global';
import { Subscription } from 'rxjs';

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"]
})
export class NavbarComponent implements OnInit, AfterViewInit {
  currentLang = "en";
  toggleClass = "ft-maximize";
  placement = "bottom-right";
  amazonUrl = amazonUrl;
  subscription:Subscription;
  public isCollapsed = true;
  @Output() directionEvent = new EventEmitter<any>();
  @Output() 
  toggleHideSidebar = new EventEmitter<Object>();
  public config: any = {};
  child;parent;
  userObj = {
    name:null, role:null, image:null
  }
  constructor(private router:Router, public translate: TranslateService, private layoutService: LayoutService, 
    private configService:ConfigService, private gs:GlobalService,private resolver:ResolverService,
    private fauth:AngularFireAuth, private store:Store<USER_NAME>) {
    this.getUserDetail();
    const browserLang: string = translate.getBrowserLang();
    translate.use(browserLang.match(/en|es|pt|de|ur/) ? browserLang : "en");
  }
  ngOnInit() {
    this.resolver.routeInfo.subscribe((route:any)=>{
      this.parent = {}
      this.child = route.data
      if(route['parent'] !== undefined && route.url.length>0)
        this.parent = route['parent'].data
      if(route.data.text == route['parent'].data.text){
        this.parent = undefined;
      }
    })
    this.config = this.configService.templateConf;
    this.translate.addLangs(['ur'])
  }
  getUserDetail(){
    this.subscription = this.store.subscribe((res:any)=>{ 
      if(res.UserData.data!==undefined){
        this.userObj.name = res.UserData.data.name;
        this.userObj.role = res.UserData.data.role.title;
        this.userObj.image = res.UserData.data.avatar.value;
      }
    }, err=>{}, ()=>{this.subscription.unsubscribe()})
  }
  ngAfterViewInit() {
    if(this.config.layout.dir) {
      const dir = this.config.layout.dir;
        if (dir === "rtl") {
          this.placement = "bottom-left";
        } else if (dir === "ltr") {
          this.placement = "bottom-right";
        }
    }
  }
  ChangeLanguage(language: string) {
    this.translate.use(language);
  }
  changeDir(dir){
    this.directionEvent.emit(dir)
  }
  ToggleClass() {
    if (this.toggleClass === "ft-maximize") {
      this.toggleClass = "ft-minimize";
    } else {
      this.toggleClass = "ft-maximize";
    }
  }
  Logout(){
    this.fauth.auth.signOut();
    this.gs.registerFcmToken('jjhasldk');
    localStorage.removeItem('token');
    localStorage.removeItem('Permissions');
    localStorage.removeItem('userId');
    this.router.navigateByUrl('/');
  }
  myProfile(){
    let userId = localStorage.getItem('userId')
    this.router.navigate(['/myprofile', userId])
  }
  toggleNotificationSidebar() {
    this.layoutService.emitChange(true);
  }
  toggleSidebar() {
    const appSidebar = document.getElementsByClassName("app-sidebar")[0];
    if (appSidebar.classList.contains("hide-sidebar")) {
      this.toggleHideSidebar.emit(false);
    } else {
      this.toggleHideSidebar.emit(true);
    }
  }
  routeParent(parent){
    let route = {
      data:{
        text:parent.text,
        path:parent.path
      }
    }
    this.resolver.routeInfo.next(route)
    this.parent = {}
  }
}