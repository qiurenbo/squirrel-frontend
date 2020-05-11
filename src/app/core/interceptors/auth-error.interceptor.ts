import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, EMPTY } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class AuthErrorInterceptor implements HttpInterceptor {
  constructor(private router: Router) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    //https://stackoverflow.com/questions/46019771/catching-errors-in-angular-httpclient
    // add authorization header with jwt token if available
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.error instanceof Error) {
          // A client-side or network error occurred. Handle it accordingly.
          //   console.error('An error occurred:', error.error.message);
        } else if (error.error.error.includes('Token')) {
          // The backend returned an unsuccessful response code.
          // The response body may contain clues as to what went wrong,
          //   console.error(
          //     `Backend returned code ${error.status}, body was: ${error.error}`
          //   );

          this.router.navigateByUrl('/login');
        }

        // If you want to return a new response:
        //return of(new HttpResponse({body: [{name: "Default value..."}]}));

        // If you want to return the error on the upper level:
        //return throwError(error);

        // or just return nothing:
        return EMPTY;
      })
    );
  }
}
