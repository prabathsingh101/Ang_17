import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { provideNativeDateAdapter } from '@angular/material/core';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { ClassService } from '../services/class.service';
import { ClassDetail } from '../model/classdetail.model';
import { AttendanceService } from '../services/attendance.service';
import { Student } from '../model/student';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { catchError, finalize, throwError } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { DatePipe } from '@angular/common';
import { TeachersService } from '../../teachers/teachers.service';
import { Teachers } from '../../teachers/Model/teacher.model';

@Component({
  selector: 'app-attendance-type',
  standalone: true,
  imports: [SharedModule],
  providers: [provideNativeDateAdapter(), DatePipe],
  templateUrl: './attendance-type.component.html',
  styleUrl: './attendance-type.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class AttendanceTypeComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    public classSvc: ClassService,
    public attnSvc: AttendanceService,
    public datepipe: DatePipe,
    public teacherSvc: TeachersService
  ) {}
  displayedColumns: string[] = ['id', 'fullname', 'admissiondate','classname', 'action'];
  displayedColumns1: string[] = ['id', 'fullname', 'classname', 'action'];

  studentList: Student[] = [];

  teacherList: Teachers[]=[];

  dataSource: any;

  dataSource1: any;

  loading = false;

  isCheck = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  isChecked = true;
  cols = 3;

  rowHeight = '150px';

  AttendanceForms: any = FormGroup;

  className: any = [];

  classids!: number;

  student: Student[] = [];

  myFilter = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();
    // Prevent Saturday and Sunday from being selected.
    return day !== 0 && day !== 6;
  };

  ngOnInit(): void {
    this.createForms();
    this.getClassName();
  }

  getClassName() {
    this.classSvc.getclassName().subscribe((res: any) => {
      this.className = res;
    });
  }

  createForms() {
    this.AttendanceForms = this.fb.group({
      classid: ['', [Validators.required]],
      attendancetype: ['', [Validators.required]],
      attendancedate: ['', [Validators.required]]
    });
  }
  get getclass() {
    return this.AttendanceForms.controls['classid'];
  }
  get getattendancetype() {
    return this.AttendanceForms.controls['attendancetype'];
  }
  get getattendancedate() {
    return this.AttendanceForms.controls['attendancedate'];
  }
  getClassid(id: number) {
    this.classids = id;
    // this.attnSvc.getClassesById(id).subscribe((res: any) => {
    //   this.student = res;
    //   console.log(this.student);
    // });
  }

  getStudent() {
    this.loading = true;
    this.attnSvc
      .getClassesById(this.classids)
      .pipe(
        catchError((err) => {
          console.log('Error loading users', err);
          alert('Error loading users.');
          return throwError(err);
        }),
        finalize(() => (this.loading = false))
      )
      .subscribe((res: any) => {
        this.studentList = res;
        console.log(this.studentList);
        if (this.studentList.length > 0) {
          this.dataSource = new MatTableDataSource<Student>(this.studentList);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        } else {
          this.dataSource = new MatTableDataSource<Student>(this.studentList);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }
      });
  }
  getTeacher() {
    this.loading = true;
    this.teacherSvc
      .getteacherByClassId(this.classids)
      .pipe(
        catchError((err) => {
          console.log('Error loading users', err);
          alert('Error loading users.');
          return throwError(err);
        }),
        finalize(() => (this.loading = false))
      )
      .subscribe((res: any) => {
        this.teacherList = res;
        console.log(this.teacherList);
        if (this.studentList.length > 0) {
          this.dataSource1 = new MatTableDataSource<Student>(this.teacherList);
          this.dataSource1.paginator = this.paginator;
          this.dataSource1.sort = this.sort;
        } else {
          this.dataSource1 = new MatTableDataSource<Student>(this.teacherList);
          this.dataSource1.paginator = this.paginator;
          this.dataSource1.sort = this.sort;
        }
      });
  }
  onSubmit() {
    if (this.isCheck === false) {
      this.getStudent();
    }else{
      this.getTeacher();
    }
  }
  selectType(data: any) {
    if (data === '0') {
      this.isCheck = false;
    } else {
      this.isCheck = true;
    }
  }
  click(data: any) {
    console.log('data', data);
  }
}
