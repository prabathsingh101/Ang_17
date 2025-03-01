import { Component, OnInit, ViewChild } from '@angular/core';
import { SharedModule } from 'src/app/theme/shared/shared.module';

import { DatePipe } from '@angular/common';
import { AttendanceService } from '../services/attendance.service';
import StudentAttendanceComponent from './student-attendance/student-attendance.component';
import TeacherAttendanceComponent from './teacher-attendance/teacher-attendance.component';
import { Attendancelist } from '../model/attendancelist';

@Component({
    selector: 'app-attendance-list',
    providers: [DatePipe, AttendanceService],
    imports: [SharedModule, StudentAttendanceComponent, TeacherAttendanceComponent],
    templateUrl: './attendance-list.component.html',
    styleUrl: './attendance-list.component.scss'
})
export default class AttendanceListComponent implements OnInit {
  constructor() {}



  ngOnInit(): void {

  }

}
