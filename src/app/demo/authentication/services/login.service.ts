import { Injectable } from '@angular/core';
import { Users } from '../models/user.model';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { TokenApiModel } from '../models/token-api.model';

import { JwtHelperService } from '@auth0/angular-jwt';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private baseUrl: string = 'https://localhost:7226/api/Auth/';

  private userPayload:any;

  constructor(private http: HttpClient, private router: Router,
    private toast: ToastrService
  ) {

    this.userPayload = this.decodedToken();

   }


  storeToken(tokenValue: string){
    sessionStorage.setItem('token', tokenValue)
  }
  storeRefreshToken(tokenValue: string){
    sessionStorage.setItem('refreshToken', tokenValue)
  }

  getToken(){
    return sessionStorage.getItem('token')
  }
  getRefreshToken(){
    return sessionStorage.getItem('refreshToken')
  }

  isLoggedIn(): boolean{
    return !!sessionStorage.getItem('token')
  }

  decodedToken(){
    const jwtHelper = new JwtHelperService();
    //alert(jwtHelper)
    const token = this.getToken()!;
    console.log('decodetoken',jwtHelper.decodeToken(token))
    return jwtHelper.decodeToken(token)
  }
  getfullNameFromToken(){
    if(this.userPayload)
    return this.userPayload.name;
  }

  getRoleFromToken(){
    if(this.userPayload)
    return this.userPayload.role;
  }
  renewToken(tokenApi: TokenApiModel) {
    return this.http.post<any>(`${this.baseUrl}refresh`, tokenApi);
  }

  login(user: Users) {
    return this.http.post(`${this.baseUrl}Login`, user);
  }

  Logout() {
    sessionStorage.clear();
    this.router.navigateByUrl('auth/signin');
    this.toast.info('Logged out successfully.', 'Success', {
      timeOut: 3000
    });
  }

  getName() {
    return this.http.get(`${this.baseUrl}GetName`, {
      responseType: 'text',
    });
  }
}
