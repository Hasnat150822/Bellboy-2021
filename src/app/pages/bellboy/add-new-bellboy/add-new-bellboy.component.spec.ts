import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewBellboyComponent } from './add-new-bellboy.component';

describe('AddNewBellboyComponent', () => {
  let component: AddNewBellboyComponent;
  let fixture: ComponentFixture<AddNewBellboyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddNewBellboyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewBellboyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
