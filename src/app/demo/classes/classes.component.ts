import { Component, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import CreateClassComponent from './create-class/create-class.component';
import { ClassService } from './services/class.service';

import { catchError, finalize, throwError } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ClassDetail } from './model/classdetail.model';
import { MatDialog } from '@angular/material/dialog';
import { CourseModalPopupComponent } from '../cources/course-modal-popup/course-modal-popup.component';
import { PromptService } from '../shared/prompt.service';
import { ToastrService } from 'ngx-toastr';
import { ClassModalPopupComponent } from './class-modal-popup/class-modal-popup.component';

@Component({
    selector: 'app-classes',
    imports: [SharedModule, CreateClassComponent],
    providers: [PromptService, ToastrService, ClassService],
    templateUrl: './classes.component.html',
    styleUrl: './classes.component.scss'
})
export default class ClassesComponent implements OnInit, OnChanges {
  displayedColumns: string[] = ['id', 'classname','course', 'teachername', 'studentlimit', 'action'];

  constructor(public classSvc: ClassService,
    public promptSvc: PromptService,
    private dialog: MatDialog,
    public toast: ToastrService
  ) {}

  dataSource: any;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  classList: ClassDetail[] = [];

  loading = false;

  ngOnInit(): void {
    this.getClasses();
  }

  ngOnChanges(changes: SimpleChanges): void {

  }


  filterchange(data: Event) {
    const value = (data.target as HTMLInputElement).value;
    this.dataSource.filter = value;
  }

  getClasses() {
    this.loading = true;
    this.classSvc
      .GetAll()
      .pipe(
        catchError((err) => {
          console.log('Error loading users', err);
          return throwError(err);
        }),
        finalize(() => (this.loading = false))
      )
      .subscribe((res: any) => {
        this.classList = res;
        console.log('myres',res)
        if (this.classList.length > 0) {
          this.dataSource = new MatTableDataSource<ClassDetail>(this.classList);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        } else {
          this.dataSource = new MatTableDataSource<ClassDetail>(this.classList);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }
      });
  }
  editClass(id: number) {
    this.openpoup(id, 'Edit Class');
  }
  openpoup(id: number, title: any) {
    var _popup = this.dialog.open(ClassModalPopupComponent, {
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
        this.getClasses();
      }
    });
  }
  deletePromptPopup(id: number) {
    this.promptSvc.openPromptDialog(id).subscribe((res: any) => {
      if (res === true) {
        this.classSvc.DELETE(id).subscribe((res: any) => {
          this.toast.success('Deleted successfully.', 'Deleted.', { timeOut: 3000 });
          this.getClasses();
        });
      }
    });
  }
  parentFunction(data: any) {
    this.classList = data;
    this.getClasses();
  }
}
