import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ViewTimelineComponent } from './view-timeline.component';

describe('ViewTimelineComponent', () => {
  let component: ViewTimelineComponent;
  let fixture: ComponentFixture<ViewTimelineComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewTimelineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewTimelineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
