import { TestBed } from '@angular/core/testing';

import { TokenInterceptor } from './token.interceptor';
import { HTTP_INTERCEPTORS, HttpInterceptor } from '@angular/common/http';

describe('TokenInterceptor', () => {
  let interceptor: TokenInterceptor = new TokenInterceptor();

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        TokenInterceptor,
        { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }
      ]
    });
  });
  it('should be created', () => {
    expect(interceptor).toBeTruthy();
  });
});

