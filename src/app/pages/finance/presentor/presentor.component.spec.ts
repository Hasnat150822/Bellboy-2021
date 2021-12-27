import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PresentorComponent } from './presentor.component';

describe('PresentorComponent', () => {
  let component: PresentorComponent;
  let fixture: ComponentFixture<PresentorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PresentorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PresentorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
