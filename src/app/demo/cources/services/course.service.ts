import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CourseModel } from '../model/course.model';


@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private readonly baseUrl = 'https://localhost:7226/api/Course/';

  constructor(private http: HttpClient) {}

  Post(course: CourseModel) {
    return this.http.post(`${this.baseUrl}create`, course);
  }

  GetAll() {
    return this.http.get<CourseModel[]>(`${this.baseUrl}GetAll`);
  }

  getCourseById(id: number) {
    return this.http.get(`${this.baseUrl}${id}`);
  }

  PUT(id: number, course: CourseModel) {
    return this.http.put(`${this.baseUrl}${id}`, course);
  }

  DELETE(id: number) {
    return this.http.delete(`${this.baseUrl}${id}`);
  }
}
