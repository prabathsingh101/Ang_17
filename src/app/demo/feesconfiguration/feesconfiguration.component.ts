import { Component, OnInit, ViewChild } from '@angular/core';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import FeeheadComponent from './feehead/feehead.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Department } from '../departments/department.model';
import { Feeshead } from './models/feeshead';
import { FeesheadService } from './services/feeshead.service';
import { catchError, finalize, throwError } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { ClassDetail } from '../classes/model/classdetail.model';

@Component({
  selector: 'app-feesconfiguration',
  standalone: true,
  imports: [SharedModule, FeeheadComponent],
  templateUrl: './feesconfiguration.component.html',
  styleUrl: './feesconfiguration.component.scss'
})
export default class FeesconfigurationComponent implements OnInit {
  constructor(public feesHeadSvc: FeesheadService) {}

  displayedColumns: string[] = ['id', 'classname', 'feename', 'feeamount', 'shortdescription', 'action'];

  feesHeadList: Feeshead[] = [];

  dataSource: any;

  loading = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  filterchange(data: Event) {
    const value = (data.target as HTMLInputElement).value;
    this.dataSource.filter = value;
  }

  ngOnInit(): void {
    this.getFeesHead();
  }

  deletePromptPopup(id: number) {}

  editFees(id: number) {}

  parentFunction(data: any) {
    this.feesHeadList = data;
    this.getFeesHead();
  }
  getFeesHead() {
    this.loading = true;
    this.feesHeadSvc
      .GetAll()
      .pipe(
        catchError((err) => {
          console.log('Error loading users', err);
          return throwError(err);
        }),
        finalize(() => (this.loading = false))
      )
      .subscribe((res: any) => {
        this.feesHeadList = res;
        if (this.feesHeadList.length > 0) {
          this.dataSource = new MatTableDataSource<ClassDetail>(this.feesHeadList);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        } else {
          this.dataSource = new MatTableDataSource<ClassDetail>(this.feesHeadList);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }
      });
  }
}
