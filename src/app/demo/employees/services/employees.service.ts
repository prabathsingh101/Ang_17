import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Classes } from '../../classes/model/classes';
import { Employee } from '../models/employee';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {

  private readonly baseUrl='https://localhost:7226/api/Images/'


  constructor(private http: HttpClient) { }

  Post(file: File, filename: string, description: string, registrationno: string) {

    console.log('ff',file)
    const formData = new FormData();
    formData.append('file', file);
    formData.append('filename', filename);
    formData.append('description', description);
    formData.append('registrationno', registrationno);

    return this.http.post(`${this.baseUrl}upload`, formData)
  }
}
