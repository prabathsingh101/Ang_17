import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Registration, SPRegistrationDetails } from '../models/registration';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {
  private readonly baseUrl = 'https://localhost:7226/api/Registration/';

  constructor(private http: HttpClient) {}

  Post(registration: Registration) {
    return this.http.post(`${this.baseUrl}create`, registration);
  }

  GetAll() {
    return this.http.get<Registration[]>(`${this.baseUrl}GetAll`);
  }

  getRegistrationById(id: number) {
    return this.http.get(`${this.baseUrl}${id}`);
  }

  PUT(id: number, registration: Registration) {
    return this.http.put(`${this.baseUrl}${id}`, registration);
  }

  DELETE(id: number) {
    return this.http.delete(`${this.baseUrl}${id}`);
  }

  getregmaxno() {
    return this.http.get<Registration[]>(`${this.baseUrl}getmaxregno`);
  }
  getregistrationdetails(): Observable<SPRegistrationDetails[]> {
    return this.http.get<SPRegistrationDetails[]>(`${this.baseUrl}registrationdetails`);
  }
}
