import { Component, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import CreateClassComponent from './create-class/create-class.component';
import { ClassService } from './services/class.service';

import { catchError, finalize, throwError } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ClassDetail } from './model/classdetail.model';

@Component({
  selector: 'app-classes',
  standalone: true,
  imports: [SharedModule, CreateClassComponent],
  providers: [],
  templateUrl: './classes.component.html',
  styleUrl: './classes.component.scss'
})
export default class ClassesComponent implements OnInit, OnChanges {
  displayedColumns: string[] = ['id', 'classname', 'teachername', 'studentlimit', 'action'];

  constructor(public classSvc: ClassService) {}

  dataSource: any;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  classList: ClassDetail[] = [];

  loading = false;

  ngOnInit(): void {
    this.getClasses();
  }

  ngOnChanges(changes: SimpleChanges): void {
    //this.getClasses();
  }
  parentFunction(data: any) {
    console.log('parent',data)
    if (this.classList.length > 0) {
      this.dataSource = new MatTableDataSource<ClassDetail>(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    } else {
      this.dataSource = new MatTableDataSource<ClassDetail>(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }

  filterchange(data: Event) {
    const value = (data.target as HTMLInputElement).value;
    this.dataSource.filter = value;
  }

  getClasses() {
    this.loading = true;
    this.classSvc
      .getclassDetails()
      .pipe(
        catchError((err) => {
          console.log('Error loading users', err);
          //alert('Error loading users.');
          return throwError(err);
        }),
        finalize(() => (this.loading = false))
      )
      .subscribe((res: any) => {
        this.classList = res;
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
}
