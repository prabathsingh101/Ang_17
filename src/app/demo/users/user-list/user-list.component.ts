import { Component, ViewChild, AfterViewInit, OnInit, inject } from '@angular/core';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { HttpClientModule } from '@angular/common/http';
import { UserService } from '../user.service';

import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { UserPopupComponent } from '../user-popup/user-popup.component';

import { UserRegistration, UsersModel } from '../models/user.model';
import { tap } from 'lodash';
import { catchError, finalize, throwError } from 'rxjs';
import { auto } from '@popperjs/core';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [
    SharedModule,
    MatTableModule,
    MatPaginatorModule,
    HttpClientModule,
    MatSortModule,
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule
  ],
  providers: [UserService],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss'
})
export default class UserListComponent implements OnInit {
  constructor(private dialog: MatDialog) {}

  loading = false;

  userSvc = inject(UserService);

  displayedColumns: string[] = ['id', 'name', 'address', 'mobileno', 'email', 'role', 'action'];

  usersList: UsersModel[] = [];

  dataSource: any;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  filterchange(data: Event) {
    const value = (data.target as HTMLInputElement).value;
    this.dataSource.filter = value;
  }
  ngOnInit(): void {
    this.getAllUsers();
  }

  getAllUsers() {
    this.loading = true;
    this.userSvc
      .GetAllUsers()
      .pipe(
        catchError((err) => {
          console.log('Error loading users', err);
          alert('Error loading users.');
          return throwError(err);
        }),
        finalize(() => (this.loading = false))
      )
      .subscribe((res: any) => {
        this.usersList = res;
        if (this.usersList.length > 0) {
          this.dataSource = new MatTableDataSource<UserRegistration>(this.usersList);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        } else {
          this.dataSource = new MatTableDataSource<UserRegistration>(this.usersList);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }
      });
  }
  openpoup() {
    var _popup = this.dialog.open(UserPopupComponent, {
      width: '700px',
      maxHeight:auto,
      minHeight:auto,
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '1000ms',
      data: {
        title: 'User Edit'
      }
    });
    _popup.afterClosed().subscribe({
      next: (res) => {
        console.log(res);
      }
    });
  }

  //santosh
  //23-June
}
