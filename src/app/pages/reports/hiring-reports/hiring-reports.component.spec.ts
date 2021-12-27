import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HiringReportsComponent } from './hiring-reports.component';

describe('HiringReportsComponent', () => {
  let component: HiringReportsComponent;
  let fixture: ComponentFixture<HiringReportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HiringReportsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HiringReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
