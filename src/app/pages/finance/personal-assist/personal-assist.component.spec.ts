import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalAssistComponent } from './personal-assist.component';

describe('PersonalAssistComponent', () => {
  let component: PersonalAssistComponent;
  let fixture: ComponentFixture<PersonalAssistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonalAssistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonalAssistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
