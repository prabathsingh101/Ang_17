import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ClassDetail } from '../model/classdetail.model';
import { Student } from '../model/student';
import { Attendancelist } from '../model/attendancelist';

@Injectable({
  providedIn: 'root'
})
export class AttendanceService {

  private readonly baseUrl='https://localhost:7226/api/Attendance/'


  constructor(private http: HttpClient) { }


  getClassesById(id:number) {
    return this.http.get<Student[]>(`${this.baseUrl}studentbyclassid/${id}`)
  }
  POSTStudent(body:any) {
    return this.http.post(`${this.baseUrl}create`, body)
  }
  POSTTeacher(body:any){
    return this.http.post(`${this.baseUrl}teacherattendance`, body)
  }
  StudentAttendanceList() {
    return this.http.get<Attendancelist>(`${this.baseUrl}studentattendancelist`)
  }
  TeacherAttendanceList() {
    return this.http.get<Attendancelist>(`${this.baseUrl}teacherattendancelist`)
  }
}
