import { HttpErrorResponse, HttpEvent, HttpHandler, HttpHandlerFn, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { hasIn } from 'lodash';
import { catchError, Observable, switchMap, throwError } from 'rxjs';
import { LoginService } from './login.service';
import { ToastrService } from 'ngx-toastr';
import { error } from 'console';
import { TokenApiModel } from '../models/token-api.model';

export class HttpErrorInterceptorService implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('interceptor is starting now...');
    var loginSvc = inject(LoginService);

    var toast = inject(ToastrService);

    const myToken = loginSvc.getToken();

    let cloneRequest: any;

    cloneRequest = req.clone({
      setHeaders: {
        Authorization: `Bearer ${myToken}`
      }
    });
    return next.handle(cloneRequest).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          return handleUnAuthorizedError(cloneRequest, next);
        }
        return throwError(() => error);
      })
    );
    function handleUnAuthorizedError(req: HttpRequest<any>, next: HttpHandler) {
      let tokeApiModel = new TokenApiModel();

      tokeApiModel.accessToken = loginSvc.getToken();

      tokeApiModel.refreshToken = loginSvc.getRefreshToken();

      return loginSvc.renewToken(tokeApiModel).pipe(
        switchMap((data: TokenApiModel) => {
          loginSvc.storeRefreshToken(data.refreshToken);
          loginSvc.storeToken(data.accessToken);
          req = req.clone({
            setHeaders: { Authorization: `Bearer ${data.accessToken}` } // "Bearer "+myToken
          });
          return next.handle(req);
        }),
        catchError((err) => {
          return throwError(() => {
            toast.warning('Session is expired, Please Login again', 'warning');
            loginSvc.Logout();
          });
        })
      );
    }
  }
}
