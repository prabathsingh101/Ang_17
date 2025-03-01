import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { PromptService } from '../../shared/prompt.service';
import { RegistrationService } from '../registration/services/registration.service';
import { Admission, SPRegistrationDetails } from '../registration/models/registration';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { AdmissionService } from '../registration/services/admission.service';
import { MatTableDataSource } from '@angular/material/table';
import { catchError, throwError, finalize } from 'rxjs';
import PaymentModalPopupComponent from '../../feesconfiguration/payment-modal-popup/payment-modal-popup.component';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FilterPipe } from '../../shared/filter.pipe';

@Component({
    selector: 'app-admission-list',
    imports: [SharedModule, RouterLink, FilterPipe],
    providers: [DatePipe],
    templateUrl: './admission-list.component.html',
    styleUrl: './admission-list.component.scss'
})
export default class AdmissionListComponent implements OnInit {
  constructor(
    private datePipe: DatePipe,
    public svc: AdmissionService,
    private dialog: MatDialog,
    public promptSvc: PromptService,
    private toast: ToastrService
  ) {}

  searchText:string="";

  loading = false;

  admissionList: Admission[] = [];

  displayedColumns: string[] = [
    'id',
    'registrationno',
    'isStatus',
    'classname',
    'fullname',
    'registrationdate',
    'admissiondate',
    'mobileno',
    'action'
  ];

  dataSource: any;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  @ViewChild(MatSort)
  sort!: MatSort;

  filterchange(data: Event) {
    const value = (data.target as HTMLInputElement).value;
    this.dataSource.filter = value;
  }
  edit(id: number) {}

  deleted(id: number) {}

  ngOnInit(): void {
    this.getAll();
  }

  openpaymentPopup(id: number) {
    this.openpoup(id, 'Payment');
  }
  openpoup(id: number, title: any) {
    var _popup = this.dialog.open(PaymentModalPopupComponent, {
      width: '800px',
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

  getAll() {
    this.loading = true;
    this.svc
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
        this.admissionList = res;
        console.log('res', this.admissionList)
        if (this.admissionList.length > 0) {
          this.dataSource = new MatTableDataSource<Admission>(this.admissionList);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        } else {
          this.dataSource = new MatTableDataSource<Admission>(this.admissionList);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }
      });
  }
}
