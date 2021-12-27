import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BBAdvertisementsComponent } from './bb-advertisements.component';

describe('BBAdvertisementsComponent', () => {
  let component: BBAdvertisementsComponent;
  let fixture: ComponentFixture<BBAdvertisementsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BBAdvertisementsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BBAdvertisementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
