import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Lesson } from '../models/lesson';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LessonService {

  private baseUrl: string = 'https://localhost:7226/api/Lesson/';

  constructor(private http: HttpClient) {}

  getLessons(id: number): Observable<Lesson> {
    return this.http.get<Lesson>(`${this.baseUrl}${id}`);
  }
}
