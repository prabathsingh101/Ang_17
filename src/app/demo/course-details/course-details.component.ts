import { Component, OnInit, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatStepperModule } from '@angular/material/stepper';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { Observable, map } from 'rxjs';
import { Course } from './models/course';
import CourseCardListComponent from './course-card-list/course-card-list.component';
import { RouterLink } from '@angular/router';
import { CourseServiceService } from './services/course-service.service';



@Component({
  selector: 'app-course-details',
  standalone: true,
  imports: [
    RouterLink,
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

    CourseCardListComponent
  ],
  providers:[CourseServiceService],
  templateUrl: './course-details.component.html',
  styleUrl: './course-details.component.scss'
})
export default class CourseDetailsComponent implements OnInit {

  coursesService = inject(CourseServiceService)

  beginnerCourses$!: Observable<Course[]>;

  advancedCourses$!: Observable<Course[]>;

  courses:any

  ngOnInit(): void {
    //const courses$ = this.coursesService.findAllCourses();

    // this.beginnerCourses$ = courses$.pipe(
    //   map(courses => courses.filter(course => course.category === 'BEGINNER') )
    // );

    // this.advancedCourses$ = courses$.pipe(
    //     map(courses => courses.filter(course => course.category === 'ADVANCED') )
    // );
    this.coursesService.findAllCourses().subscribe(res=>{
      this.courses=res;

      console.log('res', res)
    })
  }
}
