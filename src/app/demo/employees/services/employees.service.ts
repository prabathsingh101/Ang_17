import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Classes } from '../../classes/model/classes';
import { Employee } from '../models/employee';
import { Observable } from 'rxjs';
import { Status } from '../models/status';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {
  private readonly baseUrl = 'https://localhost:7226/api/employee/';

  constructor(private http: HttpClient) {}

  Post(file: File, filename: string, description: string, registrationno: string) {
    console.log('ff', file);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('filename', filename);
    formData.append('description', description);
    formData.append('registrationno', registrationno);

    return this.http.post(`${this.baseUrl}upload`, formData);
  }
  add(data: Employee) {
    debugger
    let formData = new FormData();
    formData.append('fname', data.fname?? '');
    formData.append('lname', data.lname?? '');
    formData.append('imagefile', data.imagefile ?? '');
    console.log('formdata', formData)
    return this.http.post<Status>(`${this.baseUrl}create`, formData);
  }
}
