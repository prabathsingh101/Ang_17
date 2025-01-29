import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { SPRegistrationDetails } from '../registration/models/registration';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { DatePipe } from '@angular/common';
import { catchError, finalize, merge, tap, throwError } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';

import { RegistrationService } from '../registration/services/registration.service';
import RegistrationModalPopupComponent from '../registration-modal-popup/registration-modal-popup.component';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { PromptService } from '../../shared/prompt.service';
import AdmissionComponent from '../admission/admission.component';

@Component({
    selector: 'app-registration-list',
    imports: [SharedModule],
    providers: [DatePipe, RegistrationService, PromptService, ToastrService],
    templateUrl: './registration-list.component.html',
    styleUrl: './registration-list.component.scss'
})
export default class RegistrationListComponent implements OnInit, AfterViewInit {
  constructor(
    private datePipe: DatePipe,
    public svc: RegistrationService,
    private dialog: MatDialog,
    public promptSvc: PromptService,
    private toast: ToastrService
  ) {}

  loading = false;

  displayedColumns: string[] = ['id', 'registrationno', 'classname', 'fullname','gender', 'registrationdate', 'mobileno', 'isstatus','islocked', 'action'];

  registrations: SPRegistrationDetails[] = [];

  dataSource: any;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  @ViewChild(MatSort)
  sort!: MatSort;

  edit(id: number) {
    this.openpoup(id, 'Edit Registration');
  }

  deleted(id: number) {
    this.promptSvc.openPromptDialog(id).subscribe((res: any) => {
      if (res === true) {
        this.svc.DELETE(id).subscribe((res: any) => {
          this.toast.success('Deleted successfully.', 'Deleted.', { timeOut: 3000 });
          this.getAll();
        });
      }
    });
  }

  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    this.loading = true;
    this.svc
      .getregistrationdetails()
      .pipe(
        catchError((err) => {
          console.log('Error loading users', err);
          alert('Error loading users.');
          return throwError(err);
        }),
        finalize(() => (this.loading = false))
      )
      .subscribe((res: any) => {
        this.registrations = res;
        if (this.registrations.length > 0) {
          this.dataSource = new MatTableDataSource<SPRegistrationDetails>(this.registrations);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        } else {
          this.dataSource = new MatTableDataSource<SPRegistrationDetails>(this.registrations);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }
      });
  }
  filterchange(data: Event) {
    const value = (data.target as HTMLInputElement).value;
    this.dataSource.filter = value;
  }
  ngAfterViewInit() {
    // this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));
    // merge(this.sort.sortChange, this.paginator.page)
    //   .pipe(tap(() => this.getAll()))
    //   .subscribe();
  }
  openpoup(id: number, title: any) {
    var _popup = this.dialog.open(RegistrationModalPopupComponent, {
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
        this.getAll();
      }
    });
  }
  title = 'Add Admission';
  Admissionpoup(id: number) {
    var _popup = this.dialog.open(AdmissionComponent, {
      width: '740px',
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '1000ms',
      data: {
        title: this.title,
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
}
