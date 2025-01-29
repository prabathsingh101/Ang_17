import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { Attendancelist } from '../../model/attendancelist';
import { AttendanceService } from '../../services/attendance.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { forEach } from 'lodash';
import { parse } from 'path';

@Component({
    selector: 'app-student-attendance',
    imports: [SharedModule],
    templateUrl: './student-attendance.component.html',
    styleUrl: './student-attendance.component.scss'
})
export default class StudentAttendanceComponent implements OnInit {
  DisplayColumns: string[] = ['isselected', 'attnid', 'fullname', 'classname', 'isstatus', 'edit'];

  @Input() studentdata:any="";

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  @ViewChild(MatSort) sort!: MatSort;

  currentDate: any = new Date();

  dataSource: any;

  attnDate!: any;

  isststus: any = '';

  checkboxval: boolean = false;

  studentattendanceList: Attendancelist[] = [];

  studentattendance!: Attendancelist;

  constructor(
    public datepipe: DatePipe,
    public attnsvc: AttendanceService
  ) {
    this.currentDate = this.datepipe.transform(this.currentDate, 'yyyy-MM-dd');
  }

  ngOnInit(): void {
    this.getStudentAttendance();
  }
  getStudentAttendance() {
    this.attnsvc.StudentAttendanceList().subscribe((res: any) => {
      this.studentattendanceList = res;
      console.log(this.studentattendanceList)
      this.studentattendanceList.forEach((element) => {
        this.attnDate = element.date;
      });
      if (this.studentattendanceList.length > 0) {
        this.dataSource = new MatTableDataSource<Attendancelist>(this.studentattendanceList);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      } else {
        this.dataSource = new MatTableDataSource<Attendancelist>(this.studentattendanceList);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    });
  }
  filterchange(data: Event) {
    const value = (data.target as HTMLInputElement).value;
    this.dataSource.filter = value;
  }
  checkboxChange(checkboxchange: any) {
    this.checkboxval = checkboxchange;
  }
  edit(id: number) {
    if (id > 0) {
      this.studentattendance = { isSelected: this.checkboxval };
      this.attnsvc.PUTStudentAttn(id, this.studentattendance).subscribe((res: any) => {
        console.log(res.Message);
        this.getStudentAttendance();
      });
    }
  }
}
