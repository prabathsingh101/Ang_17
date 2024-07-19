import { Component, OnInit, ViewChild } from '@angular/core';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { Student } from '../model/student';
import { SelectionModel } from '@angular/cdk/collections';
import { Teachers } from '../../teachers/Model/teacher.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { DatePipe } from '@angular/common';
import { AttendanceService } from '../services/attendance.service';
import { Attendancelist } from '../model/attendancelist';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-attendance-list',
  standalone: true,
  providers: [DatePipe, AttendanceService],
  imports: [SharedModule],
  templateUrl: './attendance-list.component.html',
  styleUrl: './attendance-list.component.scss'
})
export default class AttendanceListComponent implements OnInit {
  currentDate: any = new Date();

  constructor(
    public datepipe: DatePipe,
    public attnsvc: AttendanceService
  ) {
    this.currentDate = this.datepipe.transform(this.currentDate, 'yyyy-MM-dd');
  }

  studentColumns: string[] = ['isselected', 'attnid', 'fullname','classname','date','action'];
  teacherColumns: string[] = ['isselected', 'attnid', 'fullname','classname','date','action'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  @ViewChild(MatSort) sort!: MatSort;

  studentdataSource: any;

  teacherdataSource: any;

  studentattendanceList: Attendancelist[] = [];
  teacherattendanceList: Attendancelist[] = [];

  isChecked = false;

  attendancetype: any = '';

  newobj: any = {};

  studentselection = new SelectionModel<Attendancelist>(true, []);

  teacherSelection = new SelectionModel<Attendancelist>(true, []);

  onStudentToggled(student: Student, data: any) {
    this.isChecked = false;

    this.studentselection.toggle(student);

    this.studentselection.selected.forEach((a) => {
      (a.isSelected = data), (a.type = this.attendancetype), (a.date = this.currentDate);
    });

    //console.log(this.selection.selected);
    this.newobj = this.studentselection.selected;
    console.log(this.newobj);

    // this.selection.selected.map((selectedobject) => {
    //   this.newobj = { ...selectedobject, ...selected, ...currentDate, ...attendancetype };
    //   this.result.push(this.newobj);
    // });

    //this.uniqueArray = Array.from(new Set(this.result.map((obj: any) => JSON.stringify(obj)))).map((str: any) => JSON.parse(str));
    //console.log(this.uniqueArray);
  }
  isAllSelected() {
    this.isChecked = true;
    return this.studentselection.selected?.length == this.studentattendanceList?.length;
  }
  toggleAllRows() {
    if (this.isAllSelected()) {
      this.studentselection.clear();
      this.isChecked = false;
      return;
    }
    this.studentselection.select(...this.studentattendanceList);
    this.isChecked = true;
  }

  //////////////////////////////////////////////////////////////
  onTeacherToggled(teacher: Teachers, data: any) {
    this.isChecked = false;

    this.teacherSelection.toggle(teacher);

    //const selected = { isSelected: data };

    //const currentDate = { date: this.currentDate };

    //const attendancetype = { type: this.attendancetype };
    this.teacherSelection.selected.forEach((a) => {
      (a.isSelected = data), (a.type = this.attendancetype), (a.date = this.currentDate);
    });
    this.newobj = this.teacherSelection.selected;
    console.log(this.newobj);
  }
  isAllTeacherSelected() {
    this.isChecked = true;
    return this.teacherSelection.selected?.length == this.teacherattendanceList?.length;
  }
  toggleTeacherAllRows() {
    if (this.isAllTeacherSelected()) {
      this.teacherSelection.clear();
      this.isChecked = false;
    } else {
      this.teacherSelection.select(...this.teacherattendanceList);
      this.isChecked = true;
    }
  }
  ngOnInit(): void {
    this.getStudentAttendance();
    this.getTeacherAttendance();
  }

  getStudentAttendance() {
    this.attnsvc.StudentAttendanceList().subscribe((res: any) => {
      this.studentattendanceList = res;
      if (this.studentattendanceList.length > 0) {
        this.studentdataSource = new MatTableDataSource<Attendancelist>(this.studentattendanceList);
        this.studentdataSource.paginator = this.paginator;
        this.studentdataSource.sort = this.sort;
      } else {
        this.studentdataSource = new MatTableDataSource<Attendancelist>(this.studentattendanceList);
        this.studentdataSource.paginator = this.paginator;
        this.studentdataSource.sort = this.sort;
      }
    });
  }
  getTeacherAttendance() {
    this.attnsvc.TeacherAttendanceList().subscribe((res: any) => {
      this.teacherattendanceList = res;
      if (this.teacherattendanceList.length > 0) {
        this.teacherdataSource = new MatTableDataSource<Attendancelist>(this.teacherattendanceList);
        this.teacherdataSource.paginator = this.paginator;
        this.teacherdataSource.sort = this.sort;
      } else {
        this.teacherdataSource = new MatTableDataSource<Attendancelist>(this.teacherattendanceList);
        this.teacherdataSource.paginator = this.paginator;
        this.teacherdataSource.sort = this.sort;
      }
    });
  }
}
