import { ApplicationRef, Component, ComponentFactoryResolver, Injector, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CdkPortal, DomPortalOutlet } from '@angular/cdk/portal';

@Component({
    selector: 'show-pagination',
    template: `
    <ng-template cdk-portal>
      <ng-content></ng-content>
    </ng-template>
    `
})

export class ShowPaginationComponent implements OnInit, OnDestroy {
    @ViewChild(CdkPortal) private portal: CdkPortal;
    private host: DomPortalOutlet;
    constructor(
        private cfr: ComponentFactoryResolver,
        private appRef: ApplicationRef,
        private injector: Injector
    ) { }

    ngOnInit() { 
        this.host = new DomPortalOutlet(
          document.querySelector('#action'),
          this.cfr,
          this.appRef,
          this.injector
        );
        this.host.attach(this.portal);
     }
    ngOnDestroy(){
        this.host.detach();
    }
}