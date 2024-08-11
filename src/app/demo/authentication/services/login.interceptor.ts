import { HttpErrorResponse, HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from './login.service';
import { Observable, catchError, switchMap, throwError } from 'rxjs';
import { TokenApiModel } from '../models/token-api.model';

export const loginInterceptor: HttpInterceptorFn = (req, next) => {
  var loginSvc = inject(LoginService);

  var toast = inject(ToastrService);

  const myToken = loginSvc.getToken();

  let cloneRequest: any;

  cloneRequest = req.clone({
    setHeaders: {
      Authorization: `Bearer ${myToken}`,
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  });

  return next(cloneRequest).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        return handleUnAuthorizedError(cloneRequest, next);
      }
      return throwError(() => error);
    })
  );

  function handleUnAuthorizedError(req: HttpRequest<any>, next: HttpHandlerFn) {

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
        return next(req);
      }),
      catchError((err) => {
        return throwError(() => {
          toast.warning('Session is expired, Please Login again', 'warning');
          loginSvc.Logout();
        });
      })
    );
  }
};
