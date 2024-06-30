import { Component, OnInit, ViewChild } from '@angular/core';
import { Course } from '../models/course';
import { ActivatedRoute } from '@angular/router';
import { CourseServiceService } from '../services/course-service.service';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTableModule } from '@angular/material/table';
import { MatListModule } from '@angular/material/list';
import { Lesson } from '../models/lesson';
import { SelectionModel } from '@angular/cdk/collections';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { LessonService } from '../services/lesson.service';
import { parse } from 'path';

@Component({
  selector: 'app-course',
  standalone: true,
  imports: [
    SharedModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatButtonModule,
    MatPaginatorModule,
    MatCheckboxModule,
    MatTableModule,
    MatListModule
  ],
  templateUrl: './course.component.html',
  providers:[LessonService],
  styleUrl: './course.component.scss'
})
export default class CourseComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private coursesService: CourseServiceService,
    private lessonSvc: LessonService
  ) {}

  course!: Course;

  lessons: Lesson[] = [];

  loading = false;

  ids!: any;

  mylesson:any;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  @ViewChild(MatSort)
  sort!: MatSort;

  selection = new SelectionModel<Lesson>(true, []);

  displayedColumns = ['select', 'seqNo', 'description', 'duration'];

  expandedLesson!: Lesson ;

  ngOnInit(): void {
    this.course = this.route.snapshot.data['course'];
    this.ids= this.course.Id
    this.getLesson();
  }

  isAllSelected() {
    return this.selection.selected?.length == this.lessons?.length;
  }
  onLessonToggled(lesson:Lesson) {

    this.selection.toggle(lesson);

    console.log(this.selection.selected);

}
  toggleAll() {
    if (this.isAllSelected()) {
      this.selection.clear();
    } else {
      this.selection.select(...this.lessons);
    }
  }
getLesson(){
this.lessonSvc.getLessons(parseInt(this.ids)).subscribe(res=>{
this.mylesson = res as Lesson;
})
}
  onToggleLesson(lesson: Lesson) {
    if (lesson == this.expandedLesson) {
      this.expandedLesson;
    } else {
      this.expandedLesson = lesson;
    }
  }
}
