import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler
} from '@angular/common/http';

@Injectable()
export class HttpSetHeaderInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler)  {
    const headersConfig = {};
    let token = localStorage.getItem('token');
    headersConfig['Authorization'] = `bearer ${token}`;
    return next.handle(request.clone({ setHeaders: headersConfig }));
  }
}