import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Course } from '../models/course';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CourseServiceService {
  private baseUrl: string = 'https://localhost:7226/api/Course/';

  constructor(private http: HttpClient) {}

  getClassName() {
    return this.http.get(`${this.baseUrl}GetClass`);
  }

  findAllCourses() {
    return this.http.get(`${this.baseUrl}GetAllCourse`);
  }

  findCourseById(id: number): Observable<Course> {
    return this.http.get<Course>(`${this.baseUrl}${id}`);
  }
}
