import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyEarningsComponent } from './company-earnings.component';

describe('CompanyEarningsComponent', () => {
  let component: CompanyEarningsComponent;
  let fixture: ComponentFixture<CompanyEarningsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompanyEarningsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyEarningsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
