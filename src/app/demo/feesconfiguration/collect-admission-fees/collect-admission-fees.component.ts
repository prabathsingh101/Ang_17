import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ToastrService } from 'ngx-toastr';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { ClassService } from '../../classes/services/class.service';
import { AdmissionService } from '../../students/registration/services/admission.service';

import { FeesheadService } from '../services/feeshead.service';
import { PaymentService } from '../services/payment.service';
import { Feeshead } from '../models/feeshead';
import { Mapfeename } from '../models/mapfeename';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { provideNativeDateAdapter } from '@angular/material/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Student } from '../../classes/model/student';
import { Admission } from '../../students/registration/models/registration';
import { forkJoin } from 'rxjs';

@Component({
    selector: 'app-collect-admission-fees',
    imports: [SharedModule, RouterLink],
    providers: [DatePipe, provideNativeDateAdapter()],
    templateUrl: './collect-admission-fees.component.html',
    styleUrl: './collect-admission-fees.component.scss'
})
export default class CollectAdmissionFeesComponent implements OnInit {
  createdate: any = new Date();
  modifieddate: any = new Date();
  DisplayColumns: string[] = ['isselected', 'id', 'classid', 'feename', 'feeamount'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  @ViewChild(MatSort) sort!: MatSort;

  currentDate: any = new Date();

  dataSource: any;

  checkboxval: boolean = false;

  isCheckedVal: boolean = false;

  selection = new SelectionModel<Mapfeename>(true, []);

  maxval: any;

  newobj: any = {};
  totalval: any = 0;
  finalAmtval: any = 0;
  discountAmt: any = 0;

  isChecked = false;

  studentid!: number;
  classid!: number;

  admission!: Admission;

  stdids: any;

  constructor(
    public fb: FormBuilder,
    public classSvc: ClassService,
    public feesheadSvc: FeesheadService,
    public toast: ToastrService,
    private datePipe: DatePipe,
    public admsvc: AdmissionService,
    public paymentSvc: PaymentService,
    public route: ActivatedRoute,
    public router: Router
  ) {
    this.createdate = this.datePipe.transform(this.createdate, 'yyyy-MM-dd');
    this.modifieddate = this.datePipe.transform(this.modifieddate, 'yyyy-MM-dd');
  }

  paymentForms: any = FormGroup;

  className: any = [];

  feesHead!: Feeshead;

  feesheadList: Feeshead[] = [];

  mapfeenameList: Mapfeename[] = [];

  globalmapname!: any;

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
      paymentsession: ['', [Validators.required]],
    });
  }
  ngOnInit(): void {
    this.isChecked = false;
    this.createForm();
    this.fillClassName();
    this.getMaxInvoiceNo();
    this.stdids = this.route.snapshot.paramMap.get('id');
    this.getStudentById(this.stdids);
  }
  fillClassName() {
    this.classSvc.GetAll().subscribe((res: any) => {
      this.className = res;
    });
  }
  getFeeNameByClassid(id: number) {
    this.feesheadSvc.getfeenamebyclassid(id).subscribe((res: any) => {
      this.mapfeenameList = res;
      if (this.mapfeenameList.length > 0) {
        this.dataSource = new MatTableDataSource<Mapfeename>(this.mapfeenameList);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      } else {
        this.dataSource = new MatTableDataSource<Mapfeename>(this.mapfeenameList);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    });
  }
  checkboxChange(checkboxchange: any) {
    this.checkboxval = checkboxchange;
    console.log(this.checkboxval);
  }
  onfeesHeadToggled(mapfeename: Mapfeename, data: any) {
    this.isCheckedVal = data;
    this.isChecked = false;
    this.selection.toggle(mapfeename);
    // this.selection.selected.forEach((a) => {
    //   (a.isselected = data),
    //     (a.studentid = this.paymentForms.value.studentid),
    //     (a.paymenttype = this.paymentForms.value.paymenttype),
    //     (a.collectiondate = this.paymentForms.value.collectiondate),
    //     (a.invoiceno = this.paymentForms.value.invoiceno),
    //     (a.paymentstatus = this.paymentForms.value.paymentstatus),
    //     (a.totalamount = this.paymentForms.value.totalamount),
    //     (a.discount = this.paymentForms.value.discount),
    //     (a.finalamount = this.paymentForms.value.finalamount);
    //     (a.duration = this.paymentForms.value.paymentsession);
    // });

    if (data) {
      this.totalval += mapfeename?.feeamount;
      this.finalAmtval = this.totalval;
      this.discountAmt = 0;
    } else {
      this.totalval -= mapfeename?.feeamount;
      this.finalAmtval = this.totalval;
      this.discountAmt = 0;
    }

    this.newobj = this.selection.selected;
    //console.log(this.newobj);
  }

  isAllSelected() {
    this.isChecked = true;
    this.isCheckedVal=true;
    return this.selection.selected?.length == this.mapfeenameList?.length;
  }
  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      this.isChecked = false;
      this.isCheckedVal=false
      this.totalval = 0;
      this.finalAmtval = 0;
      this.discountAmt = 0;
    } else {
      this.selection.select(...this.mapfeenameList);
      this.isChecked = true;
      this.isCheckedVal=true
      this.getTotal();
    }
  }

  getTotal() {
    this.totalval = this.mapfeenameList.map((t) => t.feeamount).reduce((acc, value: any) => acc + value, 0);
    this.finalAmtval = this.totalval;
  }

  calculateDiscount(discount: any) {
    if (discount.value != null) {
      this.finalAmtval = this.totalval - discount.value;
    } else {
      this.finalAmtval = this.totalval;
    }
  }
  onSubmit() {
    if (this.paymentForms.valid) {
      this.admission = {
        isStatus: true
      };
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
          (a.duration = this.paymentForms.value.paymentsession);
      });
      this.newobj = this.selection.selected;
      forkJoin({
        postPayment: this.paymentSvc.Post(this.newobj),
        patchAdmission: this.admsvc.PATCH(this.paymentForms.value.studentid, this.admission)
      }).subscribe(
        (results: any) => {
          if (results.postPayment.StatusCode === 201) {
            this.toast.success(results.postPayment.Message, 'Saved.', { timeOut: 3000 });
            this.router.navigateByUrl('/students/adm-list');
            this.paymentForms.reset();
            this.selection.clear();
            this.isChecked = false;
          }
        },
        (error) => {
          console.error('Error in API calls', error);
        }
      );
      console.log('newjob',this.newobj)
    }
  }
  getStudentById(id: any) {
    this.admsvc.getAdmissionById(id).subscribe((res: any) => {
      this.studentid = res.id;
      this.classid = res.classid;
      this.getFeeNameByClassid(this.classid);
    });
  }
  getMaxInvoiceNo() {
    this.paymentSvc.getmaxinvoiceno().subscribe((res: any) => {
      //debugger;
      console.log('res', res);
      if (res.length === 1) {
        if (res[0].invoiceno === '0') {
          this.maxval = 100;
        } else if (res[0].invoiceno > 0) {
          this.maxval = parseInt(res[0].invoiceno) + 1;
        }
      } else {
        this.maxval = 100;
      }
    });
  }
  filterchange(data: Event) {
    //debugger;
    const value = (data.target as HTMLInputElement).value;
    this.dataSource.filter = value.trim().toLowerCase();
  }
}
