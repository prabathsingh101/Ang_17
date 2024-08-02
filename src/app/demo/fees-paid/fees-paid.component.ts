import { Component, OnInit, ViewChild } from '@angular/core';
import { provideNativeDateAdapter } from '@angular/material/core';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { ClassService } from '../classes/services/class.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdmissionService } from '../students/registration/services/admission.service';
import { Admission } from '../students/registration/models/registration';
import { ActivatedRoute, Router, RouterLink, RouterStateSnapshot } from '@angular/router';
import { SelectionModel } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Mapfeename } from '../feesconfiguration/models/mapfeename';
import { Feeshead } from '../feesconfiguration/models/feeshead';
import { Payment } from '../feesconfiguration/models/payment';
import { PaymentService } from '../feesconfiguration/services/payment.service';
import { MatTableDataSource } from '@angular/material/table';
import { catchError, finalize, throwError } from 'rxjs';

@Component({
  selector: 'app-fees-paid',
  standalone: true,
  imports: [SharedModule, RouterLink],
  providers: [provideNativeDateAdapter()],
  templateUrl: './fees-paid.component.html',
  styleUrl: './fees-paid.component.scss'
})
export default class FeesPaidComponent implements OnInit {
  loading = false;

  className: any = [];

  DisplayColumns: string[] = ['id', 'classid', 'feename', 'feeamount'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  @ViewChild(MatSort) sort!: MatSort;

  currentDate: any = new Date();

  dataSource: any;

  checkboxval: boolean = false;

  isCheckedVal: boolean = false;

  selection = new SelectionModel<Payment>(true, []);

  maxval: any;

  newobj: any = {};

  totalval: any = 0;

  finalAmtval: any = 0;

  discountAmt: any = 0;

  feesHead!: Feeshead;

  mappaymentList: Payment[] = [];

  isChecked = false;

  studentid!: number;

  classid!: number;

  payments: any;

  postPayment!: Payment;

  invoiceno: any;

  session: any;

  editdata: any;

  constructor(
    public classSvc: ClassService,
    public fb: FormBuilder,
    public activatedroute: ActivatedRoute,
    public router: Router,
    public paymentSvc: PaymentService
  ) {}

  paymentForms: any = FormGroup;

  ngOnInit(): void {
    this.isChecked = false;
    this.createForm();
    this.fillClassName();

    this.payments = history.state;

    this.classid = this.payments.classid;
    this.studentid = this.payments.studentid;
    this.invoiceno = this.payments.invoiceno;
    this.session = this.payments.duration;

    //this.fetchDataParameter();
  }

  // geStudentByClassid(id: number) {
  //   this.studentSvc.getAllStudentByClassId(id).subscribe((res: any) => {
  //     this.studentName = res;
  //     console.log(this.studentName);
  //   });
  // }

  fillClassName() {
    this.classSvc.GetAll().subscribe((res: any) => {
      this.className = res;
    });
  }

  onSubmit() {

  }

  get getinvoiceno() {
    return this.paymentForms.controls['invoiceno'];
  }
  get getclass() {
    return this.paymentForms.controls['classid'];
  }
  get getstudentid() {
    return this.paymentForms.controls['studentid'];
  }
  get getfeestype() {
    return this.paymentForms.controls['feestype'];
  }
  get getcollectiondate() {
    return this.paymentForms.controls['collectiondate'];
  }
  get getpaymenttype() {
    return this.paymentForms.controls['paymenttype'];
  }
  get getpaymentstatus() {
    return this.paymentForms.controls['paymentstatus'];
  }
  get getpaymentsession() {
    return this.paymentForms.controls['paymentsession'];
  }
  calculateDiscount(discount: any) {
    if (discount.value != null) {
      this.finalAmtval = parseFloat(this.totalval) - parseFloat(discount.value);
    } else {
      this.finalAmtval = parseFloat(this.totalval);
    }
  }
  onfeesHeadToggled(payments: Payment, data: any) {
    this.isCheckedVal = data;
    this.isChecked = false;
    this.selection.toggle(payments);
    this.selection.selected.forEach((a) => {
      (a.isselected = this.isCheckedVal),
        (a.studentid = this.paymentForms.value.studentid),
        (a.paymenttype = this.paymentForms.value.paymenttype),
        (a.collectiondate = this.paymentForms.value.collectiondate),
        (a.invoiceno = this.paymentForms.value.invoiceno),
        (a.status = this.paymentForms.value.paymentstatus),
        (a.totalamount = this.paymentForms.value.totalamount),
        (a.discount = this.paymentForms.value.discount),
        (a.finalamount = this.paymentForms.value.finalamount);
      a.duration = this.paymentForms.value.paymentsession;
    });

    if (data) {
      this.totalval += parseFloat(payments?.feeamount);
      this.finalAmtval = this.totalval;
      this.discountAmt = 0;
    } else {
      this.totalval -= parseFloat(payments?.feeamount);
      this.finalAmtval = this.totalval;
      this.discountAmt = 0;
    }

    this.newobj = this.selection.selected;
    //console.log(this.newobj);
  }

  isAllSelected() {
    this.isChecked = true;
    this.isCheckedVal = true;
    return this.selection.selected?.length == this.mappaymentList?.length;
  }


  getTotal() {
    this.totalval = this.mappaymentList.map((t) => t.feeamount).reduce((acc, value: any) => acc + value, 0);
    this.finalAmtval =  this.totalval;
  }
  filterchange(data: Event) {
    const value = (data.target as HTMLInputElement).value;
    this.dataSource.filter = value.trim().toLowerCase();
  }
  createForm() {
    this.paymentForms = this.fb.group({
      classid: ['', [Validators.required]],
      studentid: ['', [Validators.required]],
      paymenttype: ['', [Validators.required]],
      collectiondate: ['', [Validators.required]],
      invoiceno: ['', [Validators.required]],
      paymentstatus: ['', [Validators.required]],
      totalamount: ['', []],
      discount: ['', [Validators.pattern(/^(?![.].*$)+\d*(?:\.\d{0,2})?\s*$/), Validators.maxLength(10)]],
      finalamount: ['', []],
      paymentsession: ['', [Validators.required]]
    });
  }

  checkboxChange(checked: boolean) {}

  fetchDataParameter() {
    this.loading = true;
    this.postPayment = {
      classid: this.classid,
      studentid: this.studentid,
      duration: this.session
    };
    this.paymentSvc
      .GetPaymentByFilter(this.postPayment)
      .pipe(
        catchError((err) => {
          console.log('Error loading users', err);
          return throwError(err);
        }),
        finalize(() => (this.loading = false))
      )
      .subscribe((res: any) => {
        this.mappaymentList=res;
        this.editdata = res;
        console.log(res);
        this.paymentForms.setValue({
          classid: this.editdata[0].classid,
          studentid: this.mappaymentList[0].studentid,
          paymenttype: this.mappaymentList[0].paymenttype,
          collectiondate: this.mappaymentList[0].collectiondate,
          invoiceno: this.mappaymentList[0].invoiceno,
          paymentstatus: this.mappaymentList[0].status,
          totalamount: this.mappaymentList[0].totalamount?this.mappaymentList[0].totalamount:0,
          discount: this.mappaymentList[0].discount?this.mappaymentList[0].discount:0,
          finalamount: this.mappaymentList[0].finalamount?this.mappaymentList[0].finalamount:0,
          paymentsession: this.mappaymentList[0].duration
        });
        if (this.mappaymentList.length > 0) {
          this.dataSource = new MatTableDataSource<Payment>(this.mappaymentList);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        } else {
          this.dataSource = new MatTableDataSource<Payment>(this.mappaymentList);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }
      });
  }
}
