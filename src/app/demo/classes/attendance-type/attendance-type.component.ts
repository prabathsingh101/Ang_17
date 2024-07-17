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
import { SelectionModel } from '@angular/cdk/collections';
import { toggle } from '../model/toggle';

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
  currentDate: any = new Date();
  constructor(
    private fb: FormBuilder,
    public classSvc: ClassService,
    public attnSvc: AttendanceService,
    public datepipe: DatePipe,
    public teacherSvc: TeachersService
  ) {
    this.currentDate = this.datepipe.transform(this.currentDate, 'yyyy-MM-dd');
  }
  displayedColumns: string[] = ['select', 'id', 'fullname'];
  displayedColumns1: string[] = ['select', 'id', 'fullname', 'classname', 'action'];

  studentList: Student[] = [];

  selection = new SelectionModel<Student>(true, []);

  teacherList: Teachers[] = [];

  selection1 = new SelectionModel<Teachers>(true, []);

  result: any = [];
  newobj = {};

  dataSource: any;

  dataSource1: any;

  attendancetype: any = '';

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

  toggle!: toggle;

  mergeval: any = [];

  resultArray: any;

  myFilter = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();
    // Prevent Saturday and Sunday from being selected.
    return day !== 0 && day !== 6;
  };

  onStudentToggled(student: Student, data: any) {
    this.selection.toggle(student);

    const selected = { isSelected: data };

    const currentDate = { date: this.currentDate };

    const attendancetype = { type: this.attendancetype };

    this.selection.selected.map((selectedobject) => {
      this.newobj = { ...selectedobject, ...selected, ...currentDate, ...attendancetype };
    });

    console.log('res', this.newobj);
  }
  isAllSelected() {
    return this.selection.selected?.length == this.studentList?.length;
  }
  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }
    this.selection.select(...this.studentList);
  }

  //////////////////////////////////////////////////////////////
  onStudentToggled1(teacher: Teachers) {
    this.selection1.toggle(teacher);
    console.log(this.selection1.selected);
  }
  isAllSelected1() {
    return this.selection1.selected?.length == this.teacherList?.length;
  }
  toggleAll1() {
    if (this.isAllSelected1()) {
      this.selection1.clear();
    } else {
      this.selection1.select(...this.teacherList);
    }
  }

  ngOnInit(): void {
    //this.createForms();
    this.getClassName();
  }

  getClassName() {
    this.classSvc.getclassName().subscribe((res: any) => {
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
      this.selection1.clear();
    } else {
      this.isCheck = true;
    }
  }
  click(data: any) {
    console.log('data', data);
  }
  clickme() {
    console.log('click', this.selection.selected);
  }
}
