import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, retry, take } from 'rxjs/operators';
import { Subscription, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { sweetAlert } from '../services/global';

@Injectable()
export class HttpSetHeaderInterceptor {

  constructor(private router:Router) {}
  subscription:Subscription;
  intercept(request: HttpRequest<unknown>, next: HttpHandler)  {
    const headersConfig = {};
    let token = localStorage.getItem('token');
    headersConfig['Authorization'] = `bearer ${token}`;
    return next.handle(request.clone({ setHeaders: headersConfig })).pipe(
      retry(1),
      catchError((error: HttpErrorResponse) => {
        if(error.status === 401 && error.error.message!=='jwt malformed'){
          localStorage.clear();
          return this.router.navigateByUrl('/').then(()=>{
            sweetAlert('error', 'Session Expired');
          })
        }
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