import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DateRangeButtonComponent } from './date-range-button.component';

describe('DateRangeButtonComponent', () => {
  let component: DateRangeButtonComponent;
  let fixture: ComponentFixture<DateRangeButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DateRangeButtonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DateRangeButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
