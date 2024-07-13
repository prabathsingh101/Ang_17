import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { Registration } from '../registration/models/registration';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ClassService } from '../../classes/services/class.service';
import { RegistrationService } from '../registration/services/registration.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-registration-modal-popup',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './registration-modal-popup.component.html',
  styleUrl: './registration-modal-popup.component.scss'
})
export default class RegistrationModalPopupComponent implements OnInit, OnDestroy {
  data: any = inject(MAT_DIALOG_DATA);

  inputdata: any;

  editdata: any;

  closemessage: any = 'close message using directive';

  constructor(
    private fb: FormBuilder,
    public classSvc: ClassService,
    public registrationSvc: RegistrationService,
    public router: Router,
    public toast: ToastrService,
    private ref: MatDialogRef<RegistrationModalPopupComponent>
  ) {}

  reset(event: any) {}

  registrationSubscription!: Subscription;

  forms: any = FormGroup;

  maxval = 0;

  className: any = [];

  registration!: Registration;

  firstname = '';
  lastname = '';
  fullname = '';

  get getfname() {
    return this.forms.controls['fname'];
  }
  get getlname() {
    return this.forms.controls['lname'];
  }
  get getregistrationno() {
    return this.forms.controls['registrationno'];
  }
  get getphone() {
    return this.forms.controls['mobileno'];
  }

  get getclassid() {
    return this.forms.controls['classid'];
  }
  get getaddress() {
    return this.forms.controls['address'];
  }
  get getfathersname() {
    return this.forms.controls['fathersname'];
  }
  get getregistrationfees() {
    return this.forms.controls['registrationfees'];
  }
  onSubmit() {
    if (this.forms.valid) {
      this.fullname = this.forms.value.fname + ' ' + this.forms.value.lname;
      this.registration = {
        registrationno: this.forms.value.registrationno,
        fname: this.forms.value.fname,
        lname: this.forms.value.lname,
        registrationfees: this.forms.value.registrationfees,
        mobileno: this.forms.value.mobileno,
        classid: this.forms.value.classid,
        fathersname: this.forms.value.fathersname,
        address: this.forms.value.address
      };
      console.log(this.registration);
      this.registrationSubscription = this.registrationSvc.PUT(this.inputdata.id, this.registration).subscribe((res: any) => {
        this.closepopup();
      });
    }
  }
  ngOnInit(): void {
    this.createForms();
    this.getClassName();
    this.inputdata = this.data;
    this.setPopupData(this.inputdata.id);
  }
  getClassName() {
    this.classSvc.getclassName().subscribe((res: any) => {
      this.className = res;
    });
  }
  createForms() {
    this.forms = this.fb.group({
      registrationno: ['', [Validators.required, Validators.maxLength(5), Validators.pattern(/^[0-9]*$/)]],
      fname: ['', [Validators.required, Validators.maxLength(30)]],
      lname: ['', [Validators.required, Validators.maxLength(30)]],
      registrationfees: ['', [Validators.pattern(/^(?![.].*$)+\d*(?:\.\d{0,2})?\s*$/), Validators.maxLength(10)]],
      mobileno: [
        '',
        [Validators.required, Validators.pattern(/^[0-9]*$/), Validators.required, Validators.minLength(10), Validators.maxLength(10)]
      ],
      classid: ['', [Validators.required]],
      fathersname: ['', [Validators.maxLength(30)]],
      address: ['', [Validators.maxLength(200)]]
    });
  }
  setPopupData(id: number) {
    this.registrationSvc.getRegistrationById(id).subscribe((res: any) => {
      this.editdata = res;
      console.log('editdata', this.editdata);
      this.forms.setValue({
        registrationno: this.editdata.registrationno,
        fname: this.editdata.fname,
        lname: this.editdata.lname,
        registrationfees: this.editdata.registrationfees,
        mobileno: this.editdata.mobileno,
        classid: this.editdata.classid,
        fathersname: this.editdata.fathersname,
        address: this.editdata.address
      });
    });
  }

  closepopup() {
    this.ref.close('closed using function');
  }
  ngOnDestroy(): void {
    this.registrationSubscription.unsubscribe();
  }
}
