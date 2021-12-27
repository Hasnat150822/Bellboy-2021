import { TestBed } from '@angular/core/testing';

import { HttpSetHeaderInterceptor } from './http-set-header.interceptor';

describe('HttpSetHeaderInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      HttpSetHeaderInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: HttpSetHeaderInterceptor = TestBed.inject(HttpSetHeaderInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
