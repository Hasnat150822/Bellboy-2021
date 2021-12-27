import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpErrorResponse
} from '@angular/common/http';
<<<<<<< HEAD
import { catchError, retry, take } from 'rxjs/operators';
import { Subscription, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { sweetAlert } from '../services/global';
=======
import { catchError, retry } from 'rxjs/operators';
import { throwError } from 'rxjs';
>>>>>>> webfix/bellboy-copy

@Injectable()
export class HttpSetHeaderInterceptor {

<<<<<<< HEAD
  constructor(private router:Router) {}
  subscription:Subscription;
=======
  constructor() {}

>>>>>>> webfix/bellboy-copy
  intercept(request: HttpRequest<unknown>, next: HttpHandler)  {
    const headersConfig = {};
    let token = localStorage.getItem('token');
    headersConfig['Authorization'] = `bearer ${token}`;
    return next.handle(request.clone({ setHeaders: headersConfig })).pipe(
      retry(1),
      catchError((error: HttpErrorResponse) => {
<<<<<<< HEAD
        if(error.status === 401 && error.error.message!=='jwt malformed'){
          localStorage.clear();
          return this.router.navigateByUrl('/').then(()=>{
            sweetAlert('error', 'Session Expired');
          })
        }
=======
>>>>>>> webfix/bellboy-copy
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