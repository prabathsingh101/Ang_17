import { Component, OnInit, ViewChild } from '@angular/core';
import { provideNativeDateAdapter } from '@angular/material/core';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { ClassService } from '../classes/services/class.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdmissionService } from '../students/registration/services/admission.service';
import { Admission } from '../students/registration/models/registration';
import { RouterLink } from '@angular/router';
import { SelectionModel } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Mapfeename } from '../feesconfiguration/models/mapfeename';
import { Feeshead } from '../feesconfiguration/models/feeshead';

@Component({
  selector: 'app-fees-paid',
  standalone: true,
  imports: [SharedModule, RouterLink],
  providers: [provideNativeDateAdapter()],
  templateUrl: './fees-paid.component.html',
  styleUrl: './fees-paid.component.scss'
})
export default class FeesPaidComponent implements OnInit {

  className: any = [];

  studentName:Admission[]=[];

  DisplayColumns: string[] = ['isselected', 'id', 'classid', 'feename', 'feeamount'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  @ViewChild(MatSort) sort!: MatSort;

  currentDate: any = new Date();

  dataSource: any;

  checkboxval: boolean = false;

  isVal: boolean = false;

  selection = new SelectionModel<Mapfeename>(true, []);

  maxval: any;

  newobj: any = {};
  totalval: any = 0;
  finalAmtval: any = 0;
  discountAmt: any = 0;

  feesHead!: Feeshead;

  feesheadList: Feeshead[] = [];

  mapfeenameList: Mapfeename[] = [];

  isChecked = false;

  studentid!: number;
  classid!: number;

  admission!: Admission;

  constructor(
    public classSvc: ClassService,
    public fb: FormBuilder,
    public studentSvc: AdmissionService
  ) {}

  paymentForms: any = FormGroup;


  ngOnInit(): void {
    this.isChecked = false;
    this.createForm();
    this.fillClassName();
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
  onSubmit(){}
  getFeeNameByClassid(id:number){}

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
      this.finalAmtval = this.totalval - discount.value;
    } else {
      this.finalAmtval = this.totalval;
    }
  }
  onfeesHeadToggled(mapfeename: Mapfeename, data: any) {
    this.isVal = data;
    this.isChecked = false;
    this.selection.toggle(mapfeename);

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
    return this.selection.selected?.length == this.mapfeenameList?.length;
  }
  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      this.isChecked = false;
      this.totalval = 0;
      this.finalAmtval = 0;
      this.discountAmt = 0;
    } else {
      this.selection.select(...this.mapfeenameList);
      this.isChecked = true;
      this.getTotal();
    }
  }

  getTotal() {
    this.totalval = this.mapfeenameList.map((t) => t.feeamount).reduce((acc, value: any) => acc + value, 0);
    this.finalAmtval = this.totalval;
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
      paymentsession: ['', [Validators.required]],
    });
  }
}
