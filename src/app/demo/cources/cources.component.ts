import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { CourseModel } from './model/course.model';
import { CourseService } from './services/course.service';
import { catchError, finalize, throwError } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { PromptService } from '../shared/prompt.service';
import CreateCourseComponent from './create-course/create-course.component';

@Component({
  selector: 'app-cources',
  standalone: true,
  imports: [SharedModule, CreateCourseComponent],
  providers: [ToastrService, PromptService, CourseService,],
  templateUrl: './cources.component.html',
  styleUrl: './cources.component.scss'
})
export default class CourcesComponent implements OnInit {
  constructor(
    public toast: ToastrService,
    public courseSvc: CourseService,
    public promptSvc: PromptService
  ) {}

  displayedColumns: string[] = ['id', 'title', 'longdescription', 'action'];

  courseList: CourseModel[] = [];

  dataSource: any;

  loading = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  filterchange(data: Event) {
    const value = (data.target as HTMLInputElement).value;
    this.dataSource.filter = value;
  }
  ngOnInit(): void {
    this.getAll();
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
          this.dataSource = new MatTableDataSource<CourseModel>(this.courseList);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        } else {
          this.dataSource = new MatTableDataSource<CourseModel>(this.courseList);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }
      });
  }

  editCourse(id: number) {
    
  }

  deletePromptPopup(id: number) {
    this.promptSvc.openPromptDialog(id).subscribe((res: any) => {
      if (res === true) {
        this.courseSvc.DELETE(id).subscribe((res: any) => {
          this.toast.success('Deleted successfully.', 'Deleted.', { timeOut: 3000 });
          this.getAll();
        });
      }
    });
  }
}
