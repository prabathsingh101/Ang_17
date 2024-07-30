import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Feeshead } from '../models/feeshead';

@Injectable({
  providedIn: 'root'
})
export class FeesheadService {

  private readonly baseUrl = 'https://localhost:7226/api/classes/';

  constructor(private http: HttpClient) {}

  Post(feeshead: Feeshead) {
    return this.http.post(`${this.baseUrl}createfeeshead`, feeshead);
  }

  GetAll() {
    return this.http.get<Feeshead[]>(`${this.baseUrl}getfeeshead`);
  }

  getFeesHeadById(id: number) {
    return this.http.get(`${this.baseUrl}getbyidfeeshead/${id}`);
  }

  PUT(id: number, feeshead: Feeshead) {
    return this.http.put(`${this.baseUrl}updatefeeshead/${id}`, feeshead);
  }

  DELETE(id: number) {
    return this.http.delete(`${this.baseUrl}deletefeeshead/${id}`);
  }

  getfeenamebyclassid(id: number) {
    return this.http.get(`${this.baseUrl}getfeenamelistbyclass/${id}`);
  }

  getfeeamountbyfeetypeid(id: number) {
    return this.http.get(`${this.baseUrl}getfeeamountbyfeetype/${id}`);
  }
}
