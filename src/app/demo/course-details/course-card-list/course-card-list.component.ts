import { Component, Input, OnInit } from '@angular/core';
import { Course } from '../models/course';
import { MatDialog } from '@angular/material/dialog';

//import {openEditCourseDialog} from '../course-dialog/course-dialog.component';

import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-course-card-list',
  standalone: true,
  imports: [
    SharedModule,
    MatCardModule,
    MatGridListModule,
    RouterLink,
    MatButtonModule,
    MatIconModule,
    MatGridListModule
  ],
  templateUrl: './course-card-list.component.html',
  styleUrl: './course-card-list.component.scss'
})
export default class CourseCardListComponent  implements OnInit{
  constructor(private dialog: MatDialog,
    private responsive: BreakpointObserver) {
}

  @Input()
  courses!: Course[];


  ngOnInit(): void {
    console.log('courseslist', this.courses)
  }

  cols = 1;

    rowHeight = '500px';

    handsetPortrait = false;

    editCourse(course: Course) {

  }

}
