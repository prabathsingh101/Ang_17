import { Component, inject, OnInit } from '@angular/core';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { LessonModel } from '../model/lesson.model';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LessonService } from '../services/lesson.service';
import { ToastrService } from 'ngx-toastr';
import { DatePipe } from '@angular/common';
import { CourseService } from '../services/course.service';
import { CourseModel } from '../model/course.model';

@Component({
  selector: 'app-lesson-modal-popup',
  standalone: true,
  imports: [SharedModule],
  providers: [DatePipe],
  templateUrl: './lesson-modal-popup.component.html',
  styleUrl: './lesson-modal-popup.component.scss'
})
export class LessonModalPopupComponent implements OnInit {
  constructor(
    public lessonSvc: LessonService,
    public toast: ToastrService,
    public fb: FormBuilder,
    private ref: MatDialogRef<LessonModalPopupComponent>,
    public datepipe: DatePipe,
    public courseSvc: CourseService
  ) {}

  get getdescription() {
    return this.forms.controls['description'];
  }
  get getcourse() {
    return this.forms.controls['courseid'];
  }
  get gettitle() {
    return this.forms.controls['title'];
  }

  putCourse!: LessonModel;

  courses: CourseModel[] = [];

  loading = false;

  data: any = inject(MAT_DIALOG_DATA);

  inputdata: any;

  editdata: any;
  forms: any = FormGroup;

  closemessage: any = 'close message using directive';

  ngOnInit(): void {
    this.createForm();
    this.bindCourseName();
    this.inputdata = this.data;
    this.setPopupData(this.inputdata.id);
  }
  createForm() {
    this.forms = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(40)]],

      description: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],

      courseid: ['', [Validators.required]]
    });
  }
  bindCourseName() {
    this.courseSvc.GetAll().subscribe((res: any) => {
      this.courses = res;
    });
  }

  setPopupData(id: number) {
    this.lessonSvc.getLessonById(id).subscribe((res: any) => {
      this.editdata = res;
      this.forms.setValue({
        title: this.editdata.title,
        description: this.editdata.description,
        courseid: this.editdata.courseid
      });
    });
  }

  closepopup() {
    this.ref.close('closed using function');
  }

  onSubmit() {
    this.loading = true;
    if (this.forms.valid) {
      this.putCourse = {
        title: this.forms.value.title,
        courseid: this.forms.value.courseid,
        description: this.forms.value.description
      };
      this.lessonSvc.PUT(this.inputdata.id, this.putCourse).subscribe(
        (res: any) => {
          this.closepopup();
        },
        () => {
          this.loading = false;
          this.toast.success('Eternal server error', 'Error.', { timeOut: 3000 });
        }
      );
    }
  }
}
