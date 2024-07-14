import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { SharedModule } from 'src/app/theme/shared/shared.module';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CourseModel } from '../model/course.model';
import { CourseService } from '../services/course.service';
import { LessonModel } from '../model/lesson.model';
import { forkJoin } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { LessonService } from '../services/lesson.service';

@Component({
  selector: 'app-create-lesson',
  standalone: true,
  imports: [SharedModule],
  providers: [ToastrService],
  templateUrl: './create-lesson.component.html',
  styleUrl: './create-lesson.component.scss'
})
export default class CreateLessonComponent implements OnInit {
  @Output() parentFunction: EventEmitter<any> = new EventEmitter();

  constructor(
    private fb: FormBuilder,
    public courseSvc: CourseService,
    public toast: ToastrService,
    public lessonSvc: LessonService
  ) {}

  forms: any = FormGroup;

  courses: CourseModel[] = [];

  lesson!: LessonModel;

  loading = false;

  get getdescription() {
    return this.forms.controls['description'];
  }
  get getcourse() {
    return this.forms.controls['courseid'];
  }
  get gettitle() {
    return this.forms.controls['title'];
  }

  ngOnInit(): void {
    this.createForm();
    this.bindCourseName();
  }
  createForm() {
    this.forms = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(40)]],
      courseid: ['', [Validators.required]],
      description: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]]
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
      this.lesson = {
        title: this.forms.value.title,
        courseid: this.forms.value.courseid,
        description: this.forms.value.description
      };
      forkJoin({
        postData: this.lessonSvc.Post(this.lesson),
        getData: this.lessonSvc.GetAll()
      }).subscribe(
        (res: any) => {
          if (res.postData.StatusCode === 201) {
            this.parentFunction.emit(res.getData);
            console.log('res',res.getData);
            this.loading = false;
            this.toast.success(res.postData.Message, 'Saved.', { timeOut: 3000 });
          } else {
            this.toast.error(res.postData.Message, 'Error.', { timeOut: 3000 });
            this.loading = false;
          }
        },
        (error) => {
          this.loading = false;
          this.toast.success(error, 'Error.', { timeOut: 3000 });
        }
      );
    }
  }
}
