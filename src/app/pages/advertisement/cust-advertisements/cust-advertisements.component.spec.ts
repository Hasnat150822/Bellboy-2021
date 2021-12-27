import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustAdvertisementsComponent } from './cust-advertisements.component';

describe('CustAdvertisementsComponent', () => {
  let component: CustAdvertisementsComponent;
  let fixture: ComponentFixture<CustAdvertisementsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustAdvertisementsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustAdvertisementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
