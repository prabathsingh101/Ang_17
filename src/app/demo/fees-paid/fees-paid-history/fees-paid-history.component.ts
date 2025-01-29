import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { ClassService } from '../../classes/services/class.service';
import { Admission } from '../../students/registration/models/registration';
import { AdmissionService } from '../../students/registration/services/admission.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { PaymentService } from '../../feesconfiguration/services/payment.service';
import { Payment } from '../../feesconfiguration/models/payment';
import { catchError, finalize, throwError } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { Teachers } from '../../teachers/Model/teacher.model';
import { DatePipe } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ReturnStatement } from '@angular/compiler';

@Component({
    selector: 'app-fees-paid-history',
    imports: [SharedModule, RouterLink],
    providers: [DatePipe],
    templateUrl: './fees-paid-history.component.html',
    styleUrl: './fees-paid-history.component.scss'
})
export default class FeesPaidHistoryComponent implements OnInit, AfterViewInit {
  @Input()
  noDataMessage: string = 'Total';

  DisplayColumns: string[] = [
    'id',
    'classid',
    'studentid',
    'paymenttype',
    'invoiceno',
    'status',
    'collectiondate',
    'duration',
    'feename',

    'feeamount',
    'action'
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  @ViewChild(MatSort) sort!: MatSort;

  className: any = [];

  studentName: Admission[] = [];

  dataSource: any;

  loading = false;

  paymentList: Payment[] = [];

  payments!: Payment;

  payIds: any;

  totalAmount: any;

  constructor(
    public classSvc: ClassService,
    public fb: FormBuilder,
    public studentSvc: AdmissionService,
    public paymentSvc: PaymentService,
    public datepipe: DatePipe,
    public activatedRoute: ActivatedRoute
  ) {}

  paymentForms: any = FormGroup;

  get getclass() {
    return this.paymentForms.controls['classid'];
  }

  createForm() {
    this.paymentForms = this.fb.group({
      classid: ['', [Validators.required]],
      studentid: ['', [Validators.required]],
      paymentsession: ['', [Validators.required]],
      collectiondate: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.payIds = this.activatedRoute.snapshot.paramMap.get('id');
    //this.createForm();
    this.fillClassName();
    //this.getAllpayment();
  }

  geStudentByClassid(id: number) {
    this.studentSvc.getAllStudentByClassId(id).subscribe((res: any) => {
      this.studentName = res;
      console.log(this.studentName);
    });
  }

  fillClassName() {
    this.classSvc.GetAll().subscribe((res: any) => {
      this.className = res;
    });
  }
  getAllpayment() {
    this.loading = true;
    this.paymentSvc
      .GetAllPayment()
      .pipe(
        catchError((err) => {
          console.log('Error loading users', err);
          alert('Error loading users.');
          return throwError(err);
        }),
        finalize(() => (this.loading = false))
      )
      .subscribe((res: any) => {
        this.paymentList = res;
        if (this.paymentList.length > 0) {
          this.dataSource = new MatTableDataSource<Teachers>(this.paymentList);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        } else {
          this.dataSource = new MatTableDataSource<Teachers>(this.paymentList);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }
      });
  }

  fectchData(classnames: any, studentid: any, session: any) {
    console.log('classid', classnames);
    console.log('studentid', studentid);
    console.log('session', session);
    this.payments = {
      classid: classnames,
      studentid: studentid,
      duration: session
    };

    this.paymentSvc
      .GetPaymentByFilter(this.payments)
      .pipe(
        catchError((err) => {
          console.log('Error loading users', err);
          alert('Error loading users.');
          return throwError(err);
        }),
        finalize(() => (this.loading = false))
      )
      .subscribe((res: any) => {
        this.paymentList = res;
        console.log('yes', this.paymentList);
        if (this.paymentList.length > 0) {
          this.totalAmount = this.paymentList[0].totalamount ? this.paymentList[0].totalamount : 0;
          this.dataSource = new MatTableDataSource<Payment>(this.paymentList);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        } else {
          console.log('no', this.paymentList);
          this.totalAmount = 0;
          this.dataSource = new MatTableDataSource<Payment>(this.paymentList);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }
      });
    //this.getTotal();
  }
  getTotal() {
    this.totalAmount = this.paymentList.map((t) => t.feeamount).reduce((acc, value: any) => acc + value, 0);
  }

  ngAfterViewInit() {
    //this.getTotal();
    console.log('THE NO DATA MESSAGE IS: ', this.noDataMessage);
  }
}
