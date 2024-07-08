import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { TeachersService } from '../teachers.service';
import { catchError, finalize, throwError } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { Teachers } from '../Model/teacher.model';
import { MatDialog } from '@angular/material/dialog';
import { TeacherModalPopupComponent } from '../teacher-modal-popup/teacher-modal-popup.component';
import { DatePipe } from '@angular/common';
import { provideNativeDateAdapter } from '@angular/material/core';
import { ToastrService } from 'ngx-toastr';
import { PromptService } from '../../shared/prompt.service';

@Component({
  selector: 'app-teacher-list',
  standalone: true,
  imports: [SharedModule],
  providers:[provideNativeDateAdapter(), TeachersService, DatePipe, ToastrService],
  templateUrl: './teacher-list.component.html',
  styleUrl: './teacher-list.component.scss'
})
export default class TeacherListComponent implements OnInit {

  constructor(private dialog: MatDialog, public promptSvc: PromptService, private toast: ToastrService,) {}

  hidecolmn = false;

  loading = false;

  teacherSvc = inject(TeachersService);

  displayedColumns: string[] = ['id', 'fname', 'lname', 'email', 'phone', 'degree', 'proficiency', 'address', 'action'];

  teacherList: Teachers[] = [];

  dataSource: any;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  filterchange(data: Event) {
    const value = (data.target as HTMLInputElement).value;
    this.dataSource.filter = value;
  }

  ngOnInit(): void {
    this.getAllTeachers();
  }

  getAllTeachers() {
    this.loading = true;
    this.teacherSvc
      .GetAll()
      .pipe(
        catchError((err) => {
          console.log('Error loading users', err);
          alert('Error loading users.');
          return throwError(err);
        }),
        finalize(() => (this.loading = false))
      )
      .subscribe((res: any) => {
        this.teacherList = res;
        if (this.teacherList.length > 0) {
          this.dataSource = new MatTableDataSource<Teachers>(this.teacherList);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        } else {
          this.dataSource = new MatTableDataSource<Teachers>(this.teacherList);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }
      });
  }

  openpoup(id: number, title: any) {
    var _popup = this.dialog.open(TeacherModalPopupComponent, {
      width: '740px',
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
        this.getAllTeachers();
      }
    });
  }

  editTeacher(id: number) {
    this.openpoup(id, 'Edit Teacher');
  }
  deleteData(id:number){
    this.promptSvc.openPromptDialog(id).subscribe((res: any) => {
      if (res === true) {
        this.teacherSvc.DELETE(id).subscribe((res: any) => {
          this.toast.success('Deleted successfully.', 'Deleted.', { timeOut: 3000 });
          this.getAllTeachers();
        });
      }
    });
  }
}
