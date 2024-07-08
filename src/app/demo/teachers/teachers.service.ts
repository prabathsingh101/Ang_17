import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Teachers } from './Model/teacher.model';

@Injectable({
  providedIn: 'root'
})
export class TeachersService {
private readonly baseUrl='https://localhost:7226/api/Teacher/'


  constructor(private http: HttpClient) { }

  Post(teachers: Teachers) {
    return this.http.post(`${this.baseUrl}create`, teachers)
  }

  GetAll() {
    return this.http.get<Teachers>(`${this.baseUrl}GetAll`)
  }


  getTeacherById(id:number) {
    return this.http.get(`${this.baseUrl}${id}`)
  }

  PUT(id: number, teacher: Teachers) {
    return this.http.put(`${this.baseUrl}${id}`,teacher);
  }

  DELETE(id: number) {
    return this.http.delete(`${this.baseUrl}${id}`);
  }
  
}
