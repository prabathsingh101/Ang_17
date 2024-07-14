import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SharedModule } from 'src/app/theme/shared/shared.module';

import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { ToastrService } from 'ngx-toastr';
import { CourseService } from '../services/course.service';
import { CourseModel } from '../model/course.model';

import { PromptService } from '../../shared/prompt.service';
import { catchError, finalize, throwError } from 'rxjs';

@Component({
  selector: 'app-create-course',
  standalone: true,
  imports: [SharedModule, NgxMaterialTimepickerModule],
  providers: [],
  templateUrl: './create-course.component.html',
  styleUrl: './create-course.component.scss'
})
export default class CreateCourseComponent implements OnInit {
  postCourse!: CourseModel;

  loading = false;
  courseList: any;

  constructor(
    private fb: FormBuilder,
    public toast: ToastrService,
    public courseSvc: CourseService,
    public promptSvc: PromptService
  ) {}

  forms: any = FormGroup;

  get getdescription() {
    return this.forms.controls['longdescription'];
  }

  get gettitle() {
    return this.forms.controls['title'];
  }

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.forms = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]],

      longdescription: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],

      duration: ['', []]
    });
  }

  onSubmit() {
    this.loading = true;
    if (this.forms.valid) {
      this.postCourse = {
        title: this.forms.value.title,
        longdescription: this.forms.value.longdescription,
        duration: this.forms.value.duration
      };
      this.courseSvc.Post(this.postCourse).subscribe(
        (res: any) => {
          if (res.StatusCode === 201) {
            this.loading = false;
            this.getAll();
            this.toast.success(res.Message, 'Saved.', { timeOut: 3000 });
          } else {
            this.loading = false;
            this.toast.error(res.Message, 'Error.', { timeOut: 3000 });
          }
        },
        (error) => {
          this.loading = false;
          this.toast.success('Eternal server error', 'Error.', { timeOut: 3000 });
        }
      );
    }
  }

 
  getAll() {
    this.loading = true;
    this.courseSvc
      .GetAll()
      .pipe(
        catchError((err) => {
          console.log('Error loading course', err);
          return throwError(err);
        }),
        finalize(() => (this.loading = false))
      )
      .subscribe((res: any) => {
        this.courseList = res;
        if (this.courseList.length > 0) {
        } else {
        }
      });
  }

}
