import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, retry } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable()
export class HttpSetHeaderInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler)  {
    const headersConfig = {};
    let token = localStorage.getItem('token');
    headersConfig['Authorization'] = `bearer ${token}`;
    return next.handle(request.clone({ setHeaders: headersConfig })).pipe(
      retry(1),
      catchError((error: HttpErrorResponse) => {
        let errorMessage = '';
        if (error.error instanceof ErrorEvent) {
          // client-side error
          errorMessage = `Error: ${error.error.message}`;
        } else {
          // server-side error
          errorMessage = `${error.error.message}`;
        }
        return throwError(errorMessage);
      }),
    );
  }
}