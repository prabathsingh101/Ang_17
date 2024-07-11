import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Classes } from '../model/classes';
import { ClassDetail } from '../model/classdetail.model';

@Injectable({
  providedIn: 'root'
})
export class ClassService {

  private readonly baseUrl='https://localhost:7226/api/Classes/'


  constructor(private http: HttpClient) { }

  Post(classes: Classes) {
    return this.http.post(`${this.baseUrl}create`, classes)
  }

  GetAll() {
    return this.http.get<Classes[]>(`${this.baseUrl}GetAll`)
  }


  getClassesById(id:number) {
    return this.http.get(`${this.baseUrl}${id}`)
  }

  PUT(id: number, classes: Classes) {
    return this.http.put(`${this.baseUrl}${id}`,classes);
  }

  DELETE(id: number) {
    return this.http.delete(`${this.baseUrl}${id}`);
  }

  getclassDetails() {
    return this.http.get<ClassDetail[]>(`${this.baseUrl}getclassdetail`)
  }

  getclassName() {
    return this.http.get<ClassDetail[]>(`${this.baseUrl}classname`)
  }

}
