import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BellboyReportsComponent } from './bellboy-reports.component';

describe('BellboyReportsComponent', () => {
  let component: BellboyReportsComponent;
  let fixture: ComponentFixture<BellboyReportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BellboyReportsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BellboyReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
