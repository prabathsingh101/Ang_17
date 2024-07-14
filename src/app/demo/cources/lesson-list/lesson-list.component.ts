import { Component, ViewChild } from '@angular/core';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import CreateLessonComponent from '../create-lesson/create-lesson.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';


@Component({
  selector: 'app-lesson-list',
  standalone: true,
  imports: [SharedModule, CreateLessonComponent],
  templateUrl: './lesson-list.component.html',
  styleUrl: './lesson-list.component.scss'
})
export default class LessonListComponent {
  displayedColumns: string[] = ['id', 'title','course', 'description','duration', 'action'];


  dataSource: any;

  loading = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  filterchange(data: Event) {
    const value = (data.target as HTMLInputElement).value;
    this.dataSource.filter = value;
  }

  deletePromptPopup(id:number){}

  editCourse(id:number){}
}
