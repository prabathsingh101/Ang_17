import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Department } from './department.model';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {
  private readonly baseUrl = 'https://localhost:7226/api/Department/';

  constructor(private http: HttpClient) {}

  Post(departments: Department) {
    return this.http.post(`${this.baseUrl}Create`, departments)
  }

  GetAll(departments: Department[]) {
    return this.http.get(`${this.baseUrl}GetAll`)
  }

  GetDeptById(id:number) {
    return this.http.get(`${this.baseUrl}${id}`)
  }

  PUT(id: number, departments: Department) {
    return this.http.put(`${this.baseUrl}${id}`,departments);
  }

  DELETE(id: number) {
    return this.http.delete(`${this.baseUrl}${id}`);
  }
}
