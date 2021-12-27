import { Component, OnInit, ElementRef, Inject, Renderer2, AfterViewInit, ViewChild } from '@angular/core';
import { ConfigService } from 'app/shared/services/config.service';
import { DOCUMENT } from '@angular/common';
import { UserService } from 'app/pages/user-management/user.service';
import { ActivatedRoute, NavigationEnd, ResolveEnd, Router, RoutesRecognized } from '@angular/router';
import { routeAnimations } from '../animations/router-animations';
import { filter } from 'rxjs/operators';
@Component({
    selector: 'app-full-layout',
    templateUrl: './full-layout.component.html',
    styleUrls: ['./full-layout.component.scss'],
    animations:[routeAnimations]
})

export class FullLayoutComponent implements OnInit, AfterViewInit {
    @ViewChild('sidebarBgImage') sidebarBgImage: ElementRef;
    @ViewChild('appSidebar') appSidebar: ElementRef;
    @ViewChild('wrapper') wrapper: ElementRef;

    options = {
        direction: 'ltr',
        bgColor: 'black',
        bgImage: 'assets/img/sidebar-bg/01.jpg'
    };
    hideSidebar: boolean;
    iscollapsed = false;
    isSidebar_sm = false;
    isSidebar_lg = false;
    bgColor = 'black';
    bgImage = 'assets/img/sidebar-bg/01.jpg';
    public config: any = {};
    constructor(private elementRef: ElementRef, private configService: ConfigService,
        @Inject(DOCUMENT) private document: Document, private userService:UserService,
        private renderer: Renderer2) {
    }

    ngOnInit() {
<<<<<<< HEAD
=======
      
    // this.router.events.pipe(
    //   filter(event => event instanceof ResolveEnd)
    // ).subscribe((value)=>{
    //   console.log(this.route, 'value')
    // })
>>>>>>> webfix/bellboy-copy
      this.config = this.configService.templateConf;
      this.bgColor = this.config.layout.sidebar.backgroundColor;
      if (!this.config.layout.sidebar.backgroundImage) {
        this.bgImage = '';
      }
      else {
        this.bgImage = this.config.layout.sidebar.backgroundImageURL;
      }

      if (this.config.layout.variant === "Transparent") {
        if(this.config.layout.sidebar.backgroundColor.toString().trim() === '') {
          this.bgColor = 'bg-glass-1';
        }
      }
      else {
        if(this.config.layout.sidebar.backgroundColor.toString().trim() === '') {
          this.bgColor = 'black';
        }
      }
      setTimeout(() => {
        if (this.config.layout.sidebar.size === 'sidebar-lg') {
          this.isSidebar_sm = false;
          this.isSidebar_lg = true;
        }
        else if (this.config.layout.sidebar.size === 'sidebar-sm') {
          this.isSidebar_sm = true;
          this.isSidebar_lg = false;
        }
        else {
          this.isSidebar_sm = false;
          this.isSidebar_lg = false;
        }
        this.iscollapsed = this.config.layout.sidebar.collapsed;
      }, 0);
    }

    ngAfterViewInit() {
      setTimeout(() => {
        if (this.config.layout.dir) {
          this.options.direction = this.config.layout.dir;
        }
        if (this.config.layout.variant === "Dark") {
          this.renderer.addClass(this.document.body, 'layout-dark');
        }
        else if (this.config.layout.variant === "Transparent") {
          this.renderer.addClass(this.document.body, 'layout-dark');
          this.renderer.addClass(this.document.body, 'layout-transparent');
          if (this.config.layout.sidebar.backgroundColor) {
            this.renderer.addClass(this.document.body, this.config.layout.sidebar.backgroundColor);
          }
          else {
            this.renderer.addClass(this.document.body, 'bg-glass-1');
          }
          this.bgColor = 'black';
          this.options.bgColor = 'black';
          this.bgImage = '';
          this.options.bgImage = '';
          this.bgImage = '';
          this.renderer.setAttribute(this.sidebarBgImage.nativeElement, 'style', 'display: none');

        }


      }, 0);

    }
    viewDetail(){
      // this.router.navigate(['/assignstatus/assigndetailhiring','45f481'])
    }
    directionEvent(dir){
      this.options.direction = dir
    }

    toggleHideSidebar($event: boolean): void {
        setTimeout(() => {
            this.hideSidebar = $event;
        }, 0);
    }

    getOptions($event): void {
        this.options = $event;
    }

}
