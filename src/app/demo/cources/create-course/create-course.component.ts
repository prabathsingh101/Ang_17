import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SharedModule } from 'src/app/theme/shared/shared.module';

import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { ToastrService } from 'ngx-toastr';
import { CourseService } from '../services/course.service';
import { CourseModel } from '../model/course.model';

import { PromptService } from '../../shared/prompt.service';
import { catchError, finalize, forkJoin, throwError } from 'rxjs';
import { error } from 'console';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-create-course',
  standalone: true,
  imports: [SharedModule, NgxMaterialTimepickerModule],
  providers: [DatePipe],
  templateUrl: './create-course.component.html',
  styleUrl: './create-course.component.scss'
})
export default class CreateCourseComponent implements OnInit {
  @Output() parentFunction: EventEmitter<any> = new EventEmitter();

  postCourse!: CourseModel;

  getCourse: CourseModel[] = [];

  loading = false;
  courseList: any;

  constructor(
    private fb: FormBuilder,
    public toast: ToastrService,
    public courseSvc: CourseService,
    public promptSvc: PromptService,
    public datepipe: DatePipe
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

      duration: ['', [Validators.pattern('^([01][0-9]|2[0-3]):([0-5][0-9])$')]]
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
      forkJoin({
        postData: this.courseSvc.Post(this.postCourse),
        getData: this.courseSvc.GetAll()
      }).subscribe(
        (res: any) => {
          if (res.postData.StatusCode === 201) {
            this.parentFunction.emit(res.getData);
            this.toast.success(res.postData.Message, 'Saved.', { timeOut: 3000 });
          } else {
            this.toast.error(res.postData.Message, 'Error.', { timeOut: 3000 });
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
