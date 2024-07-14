import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LessonModel } from '../model/lesson.model';

@Injectable({
  providedIn: 'root'
})
export class LessonService {

  private readonly baseUrl = 'https://localhost:7226/api/Lesson/';

  constructor(private http: HttpClient) {}

  Post(lesson: LessonModel) {
    return this.http.post(`${this.baseUrl}create`, lesson);
  }

  GetAll() {
    return this.http.get<LessonModel[]>(`${this.baseUrl}GetAll`);
  }

  getLessonById(id: number) {
    return this.http.get(`${this.baseUrl}${id}`);
  }

  PUT(id: number, lesson: LessonModel) {
    return this.http.put(`${this.baseUrl}${id}`, lesson);
  }

  DELETE(id: number) {
    return this.http.delete(`${this.baseUrl}${id}`);
  }
}
