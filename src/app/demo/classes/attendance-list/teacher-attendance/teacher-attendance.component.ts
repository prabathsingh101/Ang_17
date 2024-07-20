import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AttendanceService } from '../../services/attendance.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Attendancelist } from '../../model/attendancelist';
import { MatTableDataSource } from '@angular/material/table';
import { SharedModule } from 'src/app/theme/shared/shared.module';

@Component({
  selector: 'app-teacher-attendance',
  standalone: true,
  imports: [SharedModule, DatePipe],
  templateUrl: './teacher-attendance.component.html',
  styleUrl: './teacher-attendance.component.scss'
})
export default class TeacherAttendanceComponent implements OnInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  @ViewChild(MatSort) sort!: MatSort;

  currentDate: any = new Date();

  teacherattendanceList: Attendancelist[] = [];

  teacherattendance!: Attendancelist;

  teacherdataSource: any;

  attnDate!: any;

  checkboxval: boolean = false;

  constructor(
    public datepipe: DatePipe,
    public attnsvc: AttendanceService
  ) {
    this.currentDate = this.datepipe.transform(this.currentDate, 'yyyy-MM-dd');
  }

  displayColumns: string[] = ['isselected', 'attnid', 'fullname', 'classname', 'isstatus','edit'];

  getTeacherAttendance() {
    this.attnsvc.TeacherAttendanceList().subscribe((res: any) => {
      this.teacherattendanceList = res;
      this.teacherattendanceList.forEach((element) => {
        this.attnDate=element.date
       });
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
  ngOnInit(): void {
    this.getTeacherAttendance();
  }
  filterchange(data: Event) {
    const value = (data.target as HTMLInputElement).value;
    this.teacherdataSource.filter = value;
  }
  checkboxChange(checkboxchange: any) {
    this.checkboxval = checkboxchange;
  }
  edit(id: number) {
    if (id > 0) {
      this.teacherattendance = { isSelected: this.checkboxval };
      this.attnsvc.PUTTeacherAttn(id, this.teacherattendance).subscribe((res: any) => {
        console.log(res.Message);
        this.getTeacherAttendance();
      });
    }
  }
}
