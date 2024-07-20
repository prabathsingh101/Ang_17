import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Admission, Registration } from '../models/registration';

@Injectable({
  providedIn: 'root'
})
export class AdmissionService {

  private readonly baseUrl = 'https://localhost:7226/api/Student/';

  constructor(private http: HttpClient) {}

  Post(admission: Admission) {
    return this.http.post(`${this.baseUrl}create`, admission);
  }

  GetAll() {
    return this.http.get<Admission[]>(`${this.baseUrl}GetAll`);
  }

  getAdmissionById(id: number) {
    return this.http.get(`${this.baseUrl}${id}`);
  }

  PUT(id: number, admission: Admission) {
    return this.http.put(`${this.baseUrl}${id}`, admission);
  }

  DELETE(id: number) {
    return this.http.delete(`${this.baseUrl}${id}`);
  }

  GetTotalStudent() {
    return this.http.get(`${this.baseUrl}totalstudent`);
  }
}
