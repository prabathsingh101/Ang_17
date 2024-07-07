import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserRegistration, UsersModel } from './models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl: string = 'https://localhost:7226/api/auth/';

  constructor(private http: HttpClient) {}

  GetAllUsers() {
    return this.http.get(`${this.baseUrl}getusers`);
  }
  GetAllRoles() {
    return this.http.get(`${this.baseUrl}getallrole`);
  }

  postUser(user:UserRegistration){
    return this.http.post(`${this.baseUrl}user-registration`, user)
  }
}
