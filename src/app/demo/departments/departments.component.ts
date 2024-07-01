import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { SharedModule } from 'src/app/theme/shared/shared.module';

import { MatDialog } from '@angular/material/dialog';
import { DepartmentService } from './department.service';
import { Department } from './department.model';
import { MatTableDataSource } from '@angular/material/table';
import DepartmentModalComponent from './department-modal/department-modal.component';

@Component({
  selector: 'app-departments',
  standalone: true,
  imports: [SharedModule],
  providers: [DepartmentService],
  templateUrl: './departments.component.html',
  styleUrl: './departments.component.scss'
})
export default class DepartmentsComponent implements OnInit {
  constructor(
    private dialog: MatDialog,
    private deptSvc: DepartmentService
  ) {}

  displayedColumns: string[] = ['Id', 'DepartmentName', 'Description', 'action'];

  deptList: Department[] = [];

  dataSource: any;

  loading = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  filterchange(data: Event) {
    const value = (data.target as HTMLInputElement).value;
    this.dataSource.filter = value;
  }

  openpoup(id:number, title:any) {
    var _popup = this.dialog.open(DepartmentModalComponent, {
      width: '400px',
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '1000ms',
      data: {
        title: title,
        id:id
      }
    });
    _popup.afterClosed().subscribe({
      next: (res) => {
        console.log(res);
        this.getAlldept();
      }
    });
  }

  editDept(id: number) {
    this.openpoup(id,"Edit Department")
  }

  getAlldept() {
    this.loading = true;
    this.deptSvc.GetAll(this.deptList).subscribe((res: any) => {
      if (res.length > 0) {
        this.deptList = res;
        this.dataSource = new MatTableDataSource(this.deptList);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.loading = true;
      } else {
      }
    });
  }

  ngOnInit(): void {
    this.getAlldept();
  }
 }
