import { TestBed } from '@angular/core/testing';

import { WalletDetailService } from './wallet-detail.service';

describe('WalletDetailService', () => {
  let service: WalletDetailService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WalletDetailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
