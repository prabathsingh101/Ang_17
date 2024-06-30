import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, input } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { MatCalendarCellClassFunction, MatDatepickerModule } from '@angular/material/datepicker';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TextFieldModule } from '@angular/cdk/text-field';

import { MatNativeDateModule } from '@angular/material/core';
import { StudentClass } from '../models/classmodel';
import { BehaviorSubject } from 'rxjs';
import { CourseServiceService } from '../services/course-service.service';

const SAMPLE_TEXT =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin enim quam, semper et sodales in, aliquam vitae leo. Suspendisse quis eleifend nisl. Nunc ante ligula, ultricies sed quam et, consectetur laoreet enim. Praesent scelerisque velit efficitur blandit dapibus. Etiam vulputate, lacus eu vestibulum faucibus, leo odio consectetur sem, nec rhoncus nulla diam vitae ante. Aenean lacinia porta quam, vel pretium mi. Cras sed leo ut dui gravida faucibus ut at nibh. In hac habitasse platea dictumst. Praesent finibus tempor lobortis. Integer ut urna lacus. Fusce imperdiet dolor efficitur erat facilisis venenatis. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nullam non eros efficitur, accumsan est vel, pulvinar sem.';

@Component({
  selector: 'app-create-course-step1',
  standalone: true,
  imports: [
    SharedModule,
    MatInputModule,
    MatFormFieldModule,
    TextFieldModule,
    MatRadioModule,
    MatSelectModule,
    MatCheckboxModule,
    MatNativeDateModule,
    MatDatepickerModule
  ],
  providers: [CourseServiceService],
  templateUrl: './create-course-step1.component.html',
  styleUrl: './create-course-step1.component.scss'
})
export default class CreateCourseStep1Component implements OnInit, AfterViewInit {
  @Output() course = new EventEmitter<boolean>();

  form: any = FormGroup;
  //formdatasValue: boolean = false;

  classNames: any;

  subjectValues = new BehaviorSubject<boolean>(false);
  constructor(
    private fb: FormBuilder,
    private courseSvc: CourseServiceService
  ) {
    this.form = this.fb.group({
      Classid: ['', [Validators.required]],
      title: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(60)]],
      longDescription: ['', [Validators.required, Validators.minLength(3)]]
    });
  }
  ngAfterViewInit(): void {}
  ngOnInit(): void {
    // if (this.form.valid) {
    //   this.formdatasValue = true;
    // } else {
    //   this.formdatasValue = false;
    // }
    this.getClasses();
  }
  changeValues(event: any) {
    // if (event === '') {
    //   this.subjectValues.next(false);
    // } else {
    //   this.subjectValues.next(true);
    // }
  }
  dateClass: MatCalendarCellClassFunction<Date> = (cellDate, view) => {
    const date = cellDate.getDate();

    if (view == 'month') {
      return date == 1 ? 'highlight-date' : '';
    }
    return '';
  };
  get courseTitle() {
    return this.form.controls['title'];
  }

  getClasses() {
    this.courseSvc.getClassName().subscribe((res) => {
      this.classNames = res;
    });
  }
}
