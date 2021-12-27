import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBellboyVehicleComponent } from './add-bellboy-vehicle.component';

describe('AddBellboyVehicleComponent', () => {
  let component: AddBellboyVehicleComponent;
  let fixture: ComponentFixture<AddBellboyVehicleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddBellboyVehicleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddBellboyVehicleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
