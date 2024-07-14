import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { TeachersService } from '../../teachers/teachers.service';
import { Classes, TeacherName } from '../model/classes';
import { ClassService } from '../services/class.service';
import { ToastrService } from 'ngx-toastr';
import { ClassDetail } from '../model/classdetail.model';
import { forkJoin } from 'rxjs';
import { CourseModel } from '../../cources/model/course.model';
import { CourseService } from '../../cources/services/course.service';

@Component({
  selector: 'app-create-class',
  standalone: true,
  imports: [SharedModule],
  providers: [TeachersService, ToastrService],
  templateUrl: './create-class.component.html',
  styleUrl: './create-class.component.scss'
})
export default class CreateClassComponent implements OnInit {
  @Output() parentFunction: EventEmitter<any> = new EventEmitter();

  classes!: Classes;

  courses: CourseModel[]=[];

  loading = false;

  constructor(
    private fb: FormBuilder,
    public teacherSvc: TeachersService,
    public classSvc: ClassService,
    public toast: ToastrService,
    public courseSvc: CourseService
  ) {}

  ngOnInit(): void {
    this.createform();
    this.getTeacherName();
    this.bindCourseName();
  }

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
  onSubmit() {
    this.loading = true;
    if (this.forms.valid) {
      this.classes = {
        classname: this.forms.value.classname,
        teacherid: this.forms.value.teacherid,
        courseid: this.forms.value.courseid,
        studentlimit: this.forms.value.studentlimit
      };
      forkJoin({
        postData: this.classSvc.Post(this.classes),
        classData: this.classSvc.getclassDetails()
      }).subscribe(
        (results: any) => {
          if (results.postData.StatusCode === 201) {
            this.classes = results.postData;
            this.parentFunction.emit(results.classData);
            this.toast.success(results.postData.Message, 'Saved.', { timeOut: 3000 });
            this.loading = false;
          } else {
            this.toast.error(results.postData.Message, 'Error.', { timeOut: 3000 });
          }
        },
        (error) => {
          console.error('Error in API calls', error);
          this.loading = false;
        }
      );
    }
  }
}
