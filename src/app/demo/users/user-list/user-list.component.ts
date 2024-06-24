import { Component, ViewChild, AfterViewInit, OnInit, inject } from '@angular/core';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { HttpClientModule } from '@angular/common/http';
import { UserService } from '../user.service';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { UserPopupComponent } from '../user-popup/user-popup.component';
import { title } from 'process';
import { DialogAnimationsExampleDialogComponent } from '../dialog-animations-example-dialog/dialog-animations-example-dialog.component';
import { UserRegistration } from '../models/user.model';

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
    MatDialogModule,
    DialogAnimationsExampleDialogComponent
  ],
  providers: [UserService],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss'
})
export default class UserListComponent implements OnInit {
  constructor(private dialog: MatDialog) {}

  userSvc = inject(UserService);

  displayedColumns: string[] = ['id', 'name', 'rolename', 'email', 'mobileno', 'action'];

  usersList: any = [];

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
    this.userSvc.GetAllUsers().subscribe({
      next: (res) => {
        this.usersList = res;
        this.dataSource = new MatTableDataSource<UserRegistration>(this.usersList);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    });
  }
  openpoup() {
    var _popup = this.dialog.open(UserPopupComponent, {
      width: '530px',
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


  //readonly dialog = inject(MatDialog);

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(DialogAnimationsExampleDialogComponent, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }
  //santosh
  //23-June
}
