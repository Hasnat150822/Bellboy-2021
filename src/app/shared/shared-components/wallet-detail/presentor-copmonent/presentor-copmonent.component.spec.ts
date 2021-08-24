import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PresentorCopmonentComponent } from './presentor-copmonent.component';

describe('PresentorCopmonentComponent', () => {
  let component: PresentorCopmonentComponent;
  let fixture: ComponentFixture<PresentorCopmonentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PresentorCopmonentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PresentorCopmonentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
