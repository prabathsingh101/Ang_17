import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import CreateCourseStep1Component from '../create-course-step1/create-course-step1.component';
import CreateCourseStep2Component from '../create-course-step2/create-course-step2.component';

@Component({
  selector: 'app-create-course',
  standalone: true,
  imports: [
    SharedModule,
    MatTabsModule,
    MatStepperModule,
    MatIconModule,
    MatCheckboxModule,
    MatGridListModule,
    MatProgressSpinnerModule,
    MatDatepickerModule,
    MatCardModule,
    MatTableModule,
    MatPaginatorModule,
    MatListModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatTooltipModule,
    MatInputModule,
    MatToolbarModule,
    MatSortModule,
    MatDialogModule,
    CreateCourseStep1Component,
    CreateCourseStep2Component
  ],
  templateUrl: './create-course.component.html',
  styleUrl: './create-course.component.scss'
})
export default class CreateCourseComponent implements OnInit, AfterViewInit {
  values: boolean = false;

  // @ViewChild(CreateCourseStep1Component) courseFormdata!: CreateCourseStep1Component;
  constructor() {

  }

  ngAfterViewInit(): void {
    //this.values = this.courseFormdata.formdatasValue;
  }
  ngOnInit(): void {

  }

  // parent(event: any) {
  //   this.values = event;
  // }
}
