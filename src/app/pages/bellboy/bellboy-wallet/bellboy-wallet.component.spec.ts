import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BellboyWalletComponent } from './bellboy-wallet.component';

describe('BellboyWalletComponent', () => {
  let component: BellboyWalletComponent;
  let fixture: ComponentFixture<BellboyWalletComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BellboyWalletComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BellboyWalletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
