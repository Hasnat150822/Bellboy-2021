import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class HttpSetHeaderInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const headersConfig = {
      'Content-Type':'application/json',
      'Accept': '*/*'
    }; 
    let token = localStorage.getItem('token');
    headersConfig['Authorization'] = `bearer ${token}`;
    return next.handle(request.clone({ setHeaders: headersConfig }));
  }
}
