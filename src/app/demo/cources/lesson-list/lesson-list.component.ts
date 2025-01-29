import { Component, OnInit, ViewChild } from '@angular/core';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import CreateLessonComponent from '../create-lesson/create-lesson.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { catchError, finalize, throwError } from 'rxjs';
import { LessonModel } from '../model/lesson.model';
import { LessonService } from '../services/lesson.service';
import { MatTableDataSource } from '@angular/material/table';
import { PromptService } from '../../shared/prompt.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { LessonModalPopupComponent } from '../lesson-modal-popup/lesson-modal-popup.component';
import { DatePipe } from '@angular/common';

@Component({
    selector: 'app-lesson-list',
    imports: [SharedModule, CreateLessonComponent],
    providers: [PromptService, ToastrService, LessonService, DatePipe],
    templateUrl: './lesson-list.component.html',
    styleUrl: './lesson-list.component.scss'
})
export default class LessonListComponent implements OnInit {
  constructor(
    public lessionSvc: LessonService,
    public promptSvc: PromptService,
    public toast: ToastrService,
    private dialog: MatDialog,
    public datepipe: DatePipe
  ) {}

  displayedColumns: string[] = ['id', 'title', 'course', 'duration', 'action'];

  dataSource: any;

  loading = false;

  lessonList: LessonModel[] = [];

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
    this.lessionSvc
      .GetAll()
      .pipe(
        catchError((err) => {
          console.log('Error loading course', err);
          return throwError(err);
        }),
        finalize(() => (this.loading = false))
      )
      .subscribe((res: any) => {
        this.lessonList = res;
        if (this.lessonList.length > 0) {
          this.dataSource = new MatTableDataSource<LessonModel>(this.lessonList);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        } else {
          this.dataSource = new MatTableDataSource<LessonModel>(this.lessonList);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }
      });
  }

  editLesson(id: number) {
    this.openpoup(id, 'Edit Lesson');
  }
  openpoup(id: number, title: any) {
    var _popup = this.dialog.open(LessonModalPopupComponent, {
      width: '500px',
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '1000ms',
      data: {
        title: title,
        id: id
      }
    });
    _popup.afterClosed().subscribe({
      next: (res) => {
        console.log(res);
        this.getAll();
      }
    });
  }
  deletePromptPopup(id: number) {
    this.promptSvc.openPromptDialog(id).subscribe((res: any) => {
      if (res === true) {
        this.lessionSvc.DELETE(id).subscribe((res: any) => {
          this.toast.success('Deleted successfully.', 'Deleted.', { timeOut: 3000 });
          this.getAll();
        });
      }
    });
  }
  parentFunction(data: any) {
    this.lessonList = data;
    this.getAll();
  }
}
