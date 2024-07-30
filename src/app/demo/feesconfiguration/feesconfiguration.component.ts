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
import FeesheadModalPopupComponent from './feeshead-modal-popup/feeshead-modal-popup.component';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { PromptService } from '../shared/prompt.service';

@Component({
  selector: 'app-feesconfiguration',
  standalone: true,
  imports: [SharedModule, FeeheadComponent],
  providers: [PromptService],
  templateUrl: './feesconfiguration.component.html',
  styleUrl: './feesconfiguration.component.scss'
})
export default class FeesconfigurationComponent implements OnInit {
  constructor(
    public feesHeadSvc: FeesheadService,
    private dialog: MatDialog,
    public toast: ToastrService,
    public promptSvc: PromptService
  ) {}

  displayedColumns: string[] = ['id', 'classname', 'feename', 'feeamount', 'shortdescription', 'action'];

  feesHeadList: Feeshead[] = [];

  dataSource: any;

  loading = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  filterchange(data: Event) {
    debugger
    const value = (data.target as HTMLInputElement).value;
    this.dataSource.filter = value.trim().toLowerCase();
  }

  ngOnInit(): void {
    this.getFeesHead();
  }

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

  editFees(id: number) {
    this.openpoup(id, 'Edit Fees Head');
  }
  openpoup(id: number, title: any) {
    var _popup = this.dialog.open(FeesheadModalPopupComponent, {
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
        this.getFeesHead();
      }
    });
  }
  deletePromptPopup(id: number) {
    this.promptSvc.openPromptDialog(id).subscribe((res: any) => {
      if (res === true) {
        this.feesHeadSvc.DELETE(id).subscribe((res: any) => {
          this.toast.success('Deleted successfully.', 'Deleted.', { timeOut: 3000 });
          this.getFeesHead();
        });
      }
    });
  }
}
