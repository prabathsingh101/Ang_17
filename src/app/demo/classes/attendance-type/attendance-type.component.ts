import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { provideNativeDateAdapter } from '@angular/material/core';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { ClassService } from '../services/class.service';

import { AttendanceService } from '../services/attendance.service';
import { Student } from '../model/student';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { catchError, finalize, throwError } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { DatePipe } from '@angular/common';
import { TeachersService } from '../../teachers/teachers.service';
import { Teachers } from '../../teachers/Model/teacher.model';
import { SelectionModel } from '@angular/cdk/collections';

import { ToastrService } from 'ngx-toastr';
import { error } from 'console';

@Component({
  selector: 'app-attendance-type',
  standalone: true,
  imports: [SharedModule],
  providers: [provideNativeDateAdapter(), DatePipe, ToastrService],
  templateUrl: './attendance-type.component.html',
  styleUrl: './attendance-type.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class AttendanceTypeComponent implements OnInit {
  currentDate: any = new Date();
  constructor(
    private fb: FormBuilder,
    public classSvc: ClassService,
    public attnSvc: AttendanceService,
    public datepipe: DatePipe,
    public teacherSvc: TeachersService,
    public toast: ToastrService
  ) {
    this.currentDate = this.datepipe.transform(this.currentDate, 'yyyy-MM-dd');
  }
  studentColumns: string[] = ['select', 'studentid', 'fullname'];
  teacherColumns: string[] = ['select', 'teacherid', 'fullname'];

  studentList: Student[] = [];

  selection = new SelectionModel<Student>(true, []);

  teacherList: Teachers[] = [];

  teacherSelection = new SelectionModel<Teachers>(true, []);

  result: any[] = [];

  newobj: any = {};

  dataSource: any;

  dataSource1: any;

  attendancetype: any = '';

  loading = false;

  isCheck = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  @ViewChild(MatSort) sort!: MatSort;

  isChecked = false;

  cols = 3;

  rowHeight = '150px';

  AttendanceForms: any = FormGroup;

  className: any = [];

  classids!: number;

  student: Student[] = [];

  uniqueArray: any = [];

  myFilter = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();
    // Prevent Saturday and Sunday from being selected.
    return day !== 0 && day !== 6;
  };

  onStudentToggled(student: Student, data: any) {
    this.isChecked = false;

    this.selection.toggle(student);

    // this.uniqueArray=this.selection.selected;
    // console.log(this.uniqueArray)

    //const selected = { isSelected: data };

    //const currentDate = { date: this.currentDate };

    //const attendancetype = { type: this.attendancetype };

    this.selection.selected.forEach((a) => {
      (a.isSelected = data), (a.type = this.attendancetype), (a.date = this.currentDate);
    });

    //console.log(this.selection.selected);
    this.newobj = this.selection.selected;
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
    return this.selection.selected?.length == this.studentList?.length;
  }
  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      this.isChecked = false;
      return;
    }
    this.selection.select(...this.studentList);
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
    return this.teacherSelection.selected?.length == this.teacherList?.length;
  }
  toggleTeacherAllRows() {
    if (this.isAllTeacherSelected()) {
      this.teacherSelection.clear();
      this.isChecked = false;
    } else {
      this.teacherSelection.select(...this.teacherList);
      this.isChecked = true;
    }
  }

  ngOnInit(): void {
    //this.createForms();
    this.getClassName();
    this.isChecked = false;
  }

  getClassName() {
    this.classSvc.GetAll().subscribe((res: any) => {
      console.log(res);
      this.className = res;
    });
  }

  createForms() {
    this.AttendanceForms = this.fb.group({
      classid: ['', [Validators.required]],
      attendancetype: ['', [Validators.required]]
      // attendancedate: ['', [Validators.required]]
    });
  }
  // get getclass() {
  //   return this.AttendanceForms.controls['classid'];
  // }
  // get getattendancetype() {
  //   return this.AttendanceForms.controls['attendancetype'];
  // }
  // get getattendancedate() {
  //   return this.AttendanceForms.controls['attendancedate'];
  // }
  getClassid(id: number) {
    this.classids = id;
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
        if (this.teacherList.length > 0) {
          this.dataSource1 = new MatTableDataSource<Teachers>(this.teacherList);
          this.dataSource1.paginator = this.paginator;
          this.dataSource1.sort = this.sort;
        } else {
          this.dataSource1 = new MatTableDataSource<Teachers>(this.teacherList);
          this.dataSource1.paginator = this.paginator;
          this.dataSource1.sort = this.sort;
        }
      });
  }
  getData() {
    if (this.isCheck === false) {
      this.getStudent();
    } else {
      this.getTeacher();
    }
  }
  selectType(data: any) {
    this.attendancetype = data;
    if (data === 'student') {
      this.isCheck = false;
      this.selection.clear();
      this.isChecked = false;
      this.teacherSelection.clear();
    } else {
      this.selection.clear();
      this.teacherSelection.clear();
      this.isCheck = true;
      this.isChecked = false;
    }
  }
  click(data: any) {
    console.log('data', data);
  }
  clickme() {
    if (this.attendancetype === 'student') {
      this.attnSvc.POSTStudent(this.newobj).subscribe(
        (res: any) => {
          if (res.StatusCode === 201) {
            this.selection.clear();
            this.isChecked = false;
            this.toast.success(res.Message, 'Saved.', { timeOut: 3000 });
          } else if (res.StatusCode === 203) {
            this.toast.warning(res.Message, 'Exists.', { timeOut: 3000 });
          } else {
            this.selection.clear();
            this.toast.error(res.Message, 'Error.', { timeOut: 3000 });
          }
        },
        (error) => {
          this.toast.error(error, 'Error.', { timeOut: 3000 });
        }
      );
    } else {
      this.attnSvc.POSTTeacher(this.newobj).subscribe(
        (res: any) => {
          if (res.StatusCode === 201) {
            this.isChecked = false;
            this.toast.success(res.Message, 'Saved.', { timeOut: 3000 });
            this.teacherSelection.clear();
          } else if (res.StatusCode === 203) {
            this.toast.warning(res.Message, 'Exists.', { timeOut: 3000 });
          } else {
            this.teacherSelection.clear();
            this.toast.error(res.Message, 'Error.', { timeOut: 3000 });
          }
        },
        (error: any) => {
          this.toast.error(error, 'Error.', { timeOut: 3000 });
        }
      );
    }
  }
}
