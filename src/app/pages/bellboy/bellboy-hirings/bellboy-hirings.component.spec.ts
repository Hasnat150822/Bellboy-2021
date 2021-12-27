import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { BellboyHiringsComponent } from './bellboy-hirings.component';

describe('BellboyHiringsComponent', () => {
  let component: BellboyHiringsComponent;
  let fixture: ComponentFixture<BellboyHiringsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ BellboyHiringsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BellboyHiringsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
