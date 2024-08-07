import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { ClassService } from '../../classes/services/class.service';
import { Registration } from './models/registration';
import { RegistrationService } from './services/registration.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [SharedModule],
  providers: [ClassService, RegistrationService, ToastrService],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.scss'
})
export default class RegistrationComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    public classSvc: ClassService,
    public registrationSvc: RegistrationService,
    public router: Router,
    public toast: ToastrService
  ) {}
  registrationSubscription!: Subscription;

  forms: any = FormGroup;

  maxval = 0;

  className: any = [];

  registration!: Registration;

  firstname = '';
  lastname = '';
  fullname = '';

  ngOnInit(): void {
    this.createForms();
    this.getClassName();
    this.getMaxRegNo();
  }
  getClassName() {
    this.classSvc.GetAll().subscribe((res: any) => {
      this.className = res;
    });
  }
  createForms() {
    this.forms = this.fb.group({
      registrationno: ['', [Validators.required,Validators.maxLength(5), Validators.pattern(/^[0-9]*$/)]],
      fname: ['', [Validators.required, Validators.maxLength(30)]],
      lname: ['', [Validators.required, Validators.maxLength(30)]],
      registrationfees: ['', [Validators.pattern(/^(?![.].*$)+\d*(?:\.\d{0,2})?\s*$/), Validators.maxLength(10)]],
      mobileno: [
        '',
        [Validators.required, Validators.pattern(/^[0-9]*$/), Validators.required, Validators.minLength(10), Validators.maxLength(10)]
      ],
      classid: ['', [Validators.required]],
      fathersname: ['', [Validators.maxLength(30)]],
      address: ['', [Validators.maxLength(200)]],
      gender: ['', []],
    });
  }

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
        fullname: this.fullname,
        registrationfees: this.forms.value.registrationfees,
        mobileno: this.forms.value.mobileno,
        classid: this.forms.value.classid,
        fathersname: this.forms.value.fathersname,
        address: this.forms.value.address,
        gender: this.forms.value.gender,
      };
      console.log(this.registration);
      this.registrationSubscription = this.registrationSvc.Post(this.registration).subscribe((res: any) => {
        if (res.StatusCode === 201) {
          this.router.navigateByUrl('students/reg-list');
          {
            this.toast.success(res.Message, 'Saved.', { timeOut: 3000 });
          }
        } else {
          this.toast.error(res.Message, 'Error.', { timeOut: 3000 });
        }
      });
    }
  }

  clearRegNo(RegistrationFees: any) {
    if (RegistrationFees === 0 || RegistrationFees === undefined || RegistrationFees === null) {
      this.registration.registrationfees = 0;
    }
  }
  setRegNo(RegistrationFees: any) {
    if (RegistrationFees === null || RegistrationFees === undefined || RegistrationFees === '') {
      this.registration.registrationfees = 0;
    }
  }
  getMaxRegNo() {
    this.registrationSvc.getregmaxno().subscribe((res: any) => {
      console.log('res', res);
      if (res.length === 1) {
        if (res[0].registrationno === 0) {
          this.maxval = 100;
          console.log(this.maxval);
        } else if (res[0].registrationno > 0) {
          this.maxval = res[0].registrationno + 1;
          console.log(this.maxval);
        }
      } else {
        this.maxval = 100;
        console.log(this.maxval);
      }
    });
  }
}
