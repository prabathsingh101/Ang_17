import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { Feeshead } from '../models/feeshead';
import { ToastrService } from 'ngx-toastr';
import { ClassService } from '../../classes/services/class.service';

import { FeesheadService } from '../services/feeshead.service';
import { DatePipe } from '@angular/common';
import { provideNativeDateAdapter } from '@angular/material/core';
import { Mapfeename } from '../models/mapfeename';

import { AdmissionService } from '../../students/registration/services/admission.service';
import { Payment } from '../models/payment';
import { PaymentService } from '../services/payment.service';
import { error } from 'console';
import { Admission } from '../../students/registration/models/registration';
import { forkJoin } from 'rxjs';
import { forEach } from 'lodash';

@Component({
  selector: 'app-payment-modal-popup',
  standalone: true,
  imports: [SharedModule],
  providers: [provideNativeDateAdapter(), DatePipe],
  templateUrl: './payment-modal-popup.component.html',
  styleUrl: './payment-modal-popup.component.scss'
})
export default class PaymentModalPopupComponent implements OnInit {
  createdate: any = new Date();
  modifieddate: any = new Date();

  constructor(
    public fb: FormBuilder,
    public classSvc: ClassService,
    public feesheadSvc: FeesheadService,
    public toast: ToastrService,
    private datePipe: DatePipe,
    public admsvc: AdmissionService,
    private ref: MatDialogRef<PaymentModalPopupComponent>,
    public paymentSvc: PaymentService,
    public admStudent: AdmissionService
  ) {
    this.createdate = this.datePipe.transform(this.createdate, 'yyyy-MM-dd');
    this.modifieddate = this.datePipe.transform(this.modifieddate, 'yyyy-MM-dd');
    console.log('this.createdate', this.createdate);
  }

  ngOnInit(): void {
    this.getClassName();
    this.createForm();
    this.inputdata = this.data;
    this.setPopupData(this.inputdata.id);
  }
  closepopup() {
    this.ref.close('closed using function');
  }

  paymentForms: any = FormGroup;

  loading = false;

  className: any = [];

  feesHead!: Feeshead;

  feesheadList: Feeshead[] = [];

  feesNameList: Feeshead[] = [];

  mapfeename: Mapfeename[] = [];

  closemessage: any = 'close message using directive';

  data: any = inject(MAT_DIALOG_DATA);

  inputdata: any;

  editdata: any;

  feetypeAmount: number = 0;

  discount: any = 0;

  payment!: Payment;

  admission!: Admission;
  computerfees: any;
  annualfees: any;
  tuitionfees: any;
  sportsfess: any;
  admissionfees: any;
  feename:any;

  onSubmit() {
    if (this.paymentForms.valid) {
      this.payment = {
        classid: this.paymentForms.value.classid,
        studentid: this.paymentForms.value.studentid,
        feestype: this.paymentForms.value.feestype,
        collectiondate: this.paymentForms.value.collectiondate,
        paymenttype: this.paymentForms.value.paymenttype,
        invoiceno: this.paymentForms.value.invoiceno,
        status: this.paymentForms.value.status,
        amount: this.paymentForms.value.amount,
        discount: this.paymentForms.value.discount ? this.paymentForms.value.discount : 0,
        finalamount: this.paymentForms.value.finalamount,
        admissionfees: this.paymentForms.value.finalamount
      };
      this.admission = {
        isStatus: true
      };

      forkJoin({
        postPayment: this.paymentSvc.Post(this.payment),
        patchAdmission: this.admsvc.PATCH(this.paymentForms.value.studentid, this.admission)
      }).subscribe(
        (results: any) => {
          if (results.postPayment.StatusCode === 201) {
            this.closepopup();
          }
        },
        (error) => {
          console.error('Error in API calls', error);
          this.loading = false;
        }
      );
    }
  }

  getClassName() {
    this.classSvc.GetAll().subscribe((res: any) => {
      this.className = res;
    });
  }
  getFeeNameByClassid(id: number) {
    this.feesheadSvc.getfeenamebyclassid(id).subscribe((res: any) => {
      this.mapfeename = res;
      // res.forEach((element:any) => {
      //  console.log('computerfees', element);
      // });
      console.log('total', this.mapfeename)
    });
  }
  getfeeamountByfeetypeid(id: number) {
    this.feesheadSvc.getfeeamountbyfeetypeid(id).subscribe((res: any) => {
      //this.feetypeAmount = res[0].feeamount;
      //this.discountamt = res[0].feeamount;
      //this.feename=res[0].feename;
      // res.forEach((element:any) => {
      //     console.log('feename',element.feename)
      // });
      console.log('res', res);
    });
  }
  getcheckeditems(){
    
  }
  createForm() {
    this.paymentForms = this.fb.group({
      classid: ['', [Validators.required]],
      studentid: ['', [Validators.required]],
      feestype: ['', [Validators.required]],
      collectiondate: ['', [Validators.required]],
      paymenttype: ['', [Validators.required]],
      invoiceno: ['', [Validators.required]],
      status: ['', [Validators.required]],
      amount: ['', [Validators.required]],
      discount: ['', [Validators.pattern(/^(?![.].*$)+\d*(?:\.\d{0,2})?\s*$/), Validators.maxLength(10)]],
      finalamount: ['', [Validators.required]]
    });
  }

  get getinvoiceno() {
    return this.paymentForms.controls['invoiceno'];
  }
  get getclass() {
    return this.paymentForms.controls['classid'];
  }
  get feestype() {
    return this.paymentForms.controls['feestype'];
  }
  get collectiondate() {
    return this.paymentForms.controls['collectiondate'];
  }
  get getpaymenttype() {
    return this.paymentForms.controls['paymenttype'];
  }
  get paymentstatus() {
    return this.paymentForms.controls['status'];
  }
  setPopupData(id: number) {
    this.admsvc.getAdmissionById(id).subscribe((res: any) => {
      this.editdata = res;
      console.log(this.editdata);
      this.paymentForms.patchValue({
        classid: this.editdata.classid,
        studentid: this.editdata.id
      });
      this.getFeeNameByClassid(this.editdata.id);
    });
  }
  // onFocusOut(event:any){
  //   if(event.target.value===0 || event.target.value===undefined || event.target.value===null){
  //     this.discount?0:null;
  //   }
  // }
  clearComputerfees(computerfees: any) {
    if (computerfees === 0 || computerfees === undefined || computerfees === null) {
      this.computerfees = '';
    }
  }
  setComputerfees(computerfees: any) {
    if (computerfees === null || computerfees === undefined || computerfees === '') {
      this.computerfees = 0;
    }
  }
  discountamt: number = 0;
  calculateDiscount(val: any) {
    // if (val.value <= this.feetypeAmount) {
    //   this.discountamt = this.feetypeAmount - val.value;
    // } else {
    //   alert('Discount should be less than tuition amount.');
    //   this.discountamt = 0;
    // }
  }
}
