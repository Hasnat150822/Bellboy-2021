import { Component, OnInit, ViewChild, ElementRef, Renderer2, AfterViewInit } from "@angular/core";
import { Router } from "@angular/router";
import { TranslateService } from '@ngx-translate/core';
import { customAnimations } from "../animations/custom-animations";
import { ConfigService } from '../services/config.service';
import { sideBarData } from './sidebar.metadeta';
import { environment } from '../../../environments/environment';
<<<<<<< HEAD
import { Store } from "@ngrx/store";
import { USER_NAME } from "app/ngrx-states/model/url.model";
import { take } from "rxjs/operators";
=======
>>>>>>> webfix/bellboy-copy
@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  animations: customAnimations
})
export class SidebarComponent implements OnInit, AfterViewInit {
  @ViewChild('toggleIcon') toggleIcon: ElementRef;
  public menuItems: any[];
  depth: number;
  version:string;
  activeTitle: string;
  activeTitles: string[] = [];
  expanded: boolean;
  nav_collapsed_open = false;
  logoUrl = 'assets/img/photos/logo.svg';
  public config: any = {};
  allPermissions:any = []
  permission:any  = []
  routes:any[]=[]
  constructor(
    private renderer: Renderer2,
    private router: Router,
    public translate: TranslateService,
<<<<<<< HEAD
    private configService: ConfigService,
    private store:Store<USER_NAME>
=======
    private configService: ConfigService
>>>>>>> webfix/bellboy-copy
  ) {
    if (this.depth === undefined) {
      this.depth = 0;
      this.expanded = true;
    }
  }
  // for order section
  ngOnInit() {
    this.version = environment.appVersion;
<<<<<<< HEAD
    let permissions = JSON.parse(localStorage.getItem('Permissions'));
    this.routes = sideBarData(permissions);
    this.setRoutes();
    this.store.pipe(take(2)).subscribe((res:any)=>{
      if(res.UserData?.data){
        let permissions = res.UserData.data.role.permissions;
        this.routes = sideBarData(permissions);
        this.setRoutes();
      }
    })
    this.config = this.configService.templateConf;
  }
  setRoutes(){
=======
    this.routes = sideBarData();
    this.config = this.configService.templateConf;
>>>>>>> webfix/bellboy-copy
    this.routes = this.routes.filter(()=>{return true})
    this.menuItems = this.routes;
  }
  ngAfterViewInit() {
    setTimeout(() => {
      if (this.config.layout.sidebar.collapsed != undefined) {
        if (this.config.layout.sidebar.collapsed === true) {
          this.expanded = false;
          this.renderer.addClass(this.toggleIcon.nativeElement, 'ft-toggle-left');
          this.renderer.removeClass(this.toggleIcon.nativeElement, 'ft-toggle-right');
          this.nav_collapsed_open = true;
        }
        else if (this.config.layout.sidebar.collapsed === false) {
          this.expanded = true;
          this.renderer.removeClass(this.toggleIcon.nativeElement, 'ft-toggle-left');
          this.renderer.addClass(this.toggleIcon.nativeElement, 'ft-toggle-right');
          this.nav_collapsed_open = false;
        }
      }
    }, 0);
  }
  toggleSlideInOut() {
    this.expanded = !this.expanded;
  }
  handleToggle(titles) {
    this.activeTitles = titles;
  }
  // NGX Wizard - skip url change
  ngxWizardFunction(path: string) {
    if (path.indexOf("forms/ngx") !== -1)
      this.router.navigate(["forms/ngx/wizard"], { skipLocationChange: false });
  }
}