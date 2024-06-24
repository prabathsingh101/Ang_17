import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserRegistration } from './models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl: string = 'https://localhost:7226/api/';
  constructor(private http: HttpClient) {}

  GetAllUsers() {
    return this.http.get(this.baseUrl +'user/'+ 'getAllUser');
  }
  postUser(user:UserRegistration){
    return this.http.post(this.baseUrl +'auth/'+ 'user-registration', user)
  }
}
