import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HouseHoldComponent } from './house-hold.component';

describe('HouseHoldComponent', () => {
  let component: HouseHoldComponent;
  let fixture: ComponentFixture<HouseHoldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HouseHoldComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HouseHoldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
