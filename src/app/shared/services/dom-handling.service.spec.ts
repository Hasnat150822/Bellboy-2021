import { TestBed } from '@angular/core/testing';

import { DomHandlingService } from './dom-handling.service';

describe('DomHandlingService', () => {
  let service: DomHandlingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DomHandlingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
