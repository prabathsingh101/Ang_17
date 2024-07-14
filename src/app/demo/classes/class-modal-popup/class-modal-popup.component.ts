import { Component, inject, OnInit } from '@angular/core';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { Classes, TeacherName } from '../model/classes';
import { CourseModel } from '../../cources/model/course.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TeachersService } from '../../teachers/teachers.service';
import { ClassService } from '../services/class.service';
import { ToastrService } from 'ngx-toastr';
import { CourseService } from '../../cources/services/course.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-class-modal-popup',
  standalone: true,
  imports: [SharedModule],
  providers: [TeachersService, ClassService, ToastrService, CourseService],
  templateUrl: './class-modal-popup.component.html',
  styleUrl: './class-modal-popup.component.scss'
})
export class ClassModalPopupComponent implements OnInit {
  constructor(
    public fb: FormBuilder,
    public teacherSvc: TeachersService,
    public classSvc: ClassService,
    public toast: ToastrService,
    public courseSvc: CourseService,
    private ref: MatDialogRef<ClassModalPopupComponent>,
  ) {}

  closemessage: any = 'close message using directive';

  data: any = inject(MAT_DIALOG_DATA);

  inputdata: any;

  editdata: any;

  classes!: Classes;

  courses: CourseModel[] = [];

  loading = false;
  forms: any = FormGroup;

  teacherName: TeacherName[] = [];

  createform() {
    this.forms = this.fb.group({
      classname: ['', [Validators.required, Validators.maxLength(20)]],
      teacherid: ['', [Validators.required]],
      courseid: ['', [Validators.required]],
      studentlimit: ['', [Validators.required, Validators.pattern(/^[0-9]*$/), Validators.maxLength(2)]]
    });
  }

  ngOnInit(): void {
    this.createform();
    this.getTeacherName();
    this.bindCourseName();
    this.inputdata = this.data;
    this.setPopupData(this.inputdata.id);
  }
  get getclassname() {
    return this.forms.controls['classname'];
  }
  get getcourse() {
    return this.forms.controls['courseid'];
  }
  get getteacher() {
    return this.forms.controls['teacherid'];
  }
  get getlimit() {
    return this.forms.controls['studentlimit'];
  }
  getTeacherName() {
    this.teacherSvc.GetTeacherName().subscribe((res: any) => {
      this.teacherName = res;
    });
  }
  bindCourseName() {
    this.courseSvc.GetAll().subscribe((res: any) => {
      this.courses = res;
    });
  }
  setPopupData(id: number) {
    this.classSvc.getClassesById(id).subscribe((res: any) => {
      this.editdata = res;
      console.log('editdata', this.editdata);
      this.forms.setValue({
        classname: this.editdata.classname,
        teacherid: this.editdata.teacherid,
        courseid: this.editdata.courseid,
        studentlimit: this.editdata.studentlimit,
      });
    });
  }

  closepopup() {
    this.ref.close('closed using function');
  }

  onSubmit() {
    this.loading = true;
    if (this.forms.valid) {
      this.classes = {
        classname: this.forms.value.classname,
        teacherid: this.forms.value.teacherid,
        courseid: this.forms.value.courseid,
        studentlimit: this.forms.value.studentlimit
      };
      this.classSvc.PUT(this.inputdata.id, this.classes).subscribe(
        (res: any) => {
          this.closepopup();
        },
        (error) => {
          this.loading = false;
          this.toast.success(error, 'Error.', { timeOut: 3000 });
        }
      );
    }
  }
}
