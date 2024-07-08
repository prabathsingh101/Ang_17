import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { provideNativeDateAdapter } from '@angular/material/core';
import { Router, RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { Teachers } from '../Model/teacher.model';
import { TeachersService } from '../teachers.service';
import { Subscription } from 'rxjs';
import { DatePipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-teacher',
  standalone: true,
  imports: [SharedModule, RouterModule],
  providers: [provideNativeDateAdapter(), TeachersService, DatePipe, ToastrService],
  templateUrl: './create-teacher.component.html',
  styleUrl: './create-teacher.component.scss'
})
export default class CreateTeacherComponent implements OnInit, OnDestroy {

  createdate: any = new Date();
  modifieddate: any = new Date();

  constructor(
    private fb: FormBuilder,
    public teacherSvc: TeachersService,
    private router: Router,
    private datePipe: DatePipe,
    private toast: ToastrService
  ) {
    this.createdate = this.datePipe.transform(this.createdate, 'yyyy-MM-dd');
    this.modifieddate = this.datePipe.transform(this.modifieddate, 'yyyy-MM-dd');
    console.log('this.createdate', this.createdate);
  }

  teacherForms: any = FormGroup;

  teachers!: Teachers;

  teacherSubscription!: Subscription;

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.teacherForms = this.fb.group({
      fname: ['', [Validators.required, Validators.maxLength(50)]],

      mname: ['', [Validators.maxLength(50)]],

      lname: ['', [Validators.required, Validators.maxLength(50)]],

      email: ['', [Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$'), Validators.maxLength(100)]],

      phone: [
        '',
        [Validators.required, Validators.pattern(/^[0-9]*$/), Validators.required, Validators.minLength(10), Validators.maxLength(10)]
      ],

      dob: ['', []],

      degree: ['', []],

      proficiency: ['', []],

      address: ['', [Validators.maxLength(500)]],

      pincode: ['', [Validators.pattern(/^[0-9]*$/), Validators.minLength(6), Validators.maxLength(6)]],

      dateofjoining: ['', []]
    });
  }

  get getfname() {
    return this.teacherForms.controls['fname'];
  }
  get getlname() {
    return this.teacherForms.controls['lname'];
  }
  get getmname() {
    return this.teacherForms.controls['mname'];
  }
  get getphone() {
    return this.teacherForms.controls['phone'];
  }
  get getemail() {
    return this.teacherForms.controls['email'];
  }
  get getpincode() {
    return this.teacherForms.controls['pincode'];
  }
  get getaddress() {
    return this.teacherForms.controls['address'];
  }

  reset(event: any) {
    event.preventDefault();
    this.teacherForms.reset();
  }

  ngOnDestroy(): void {
    //this.teacherSubscription.unsubscribe();
  }

  onSubmit() {
    if (this.teacherForms.valid) {
      this.teachers = {
        fname: this.teacherForms.value.fname,
        mname: this.teacherForms.value.mname,
        lname: this.teacherForms.value.lname,
        email: this.teacherForms.value.email,
        dob: this.teacherForms.value.dob,
        phone: this.teacherForms.value.phone,
        degree: this.teacherForms.value.degree,
        proficiency: this.teacherForms.value.proficiency,
        address: this.teacherForms.value.address,
        dateofjoining: this.teacherForms.value.dateofjoining,
        pincode: this.teacherForms.value.pincode,
        createdated: this.createdate,
        modfieddate: this.modifieddate
      };
      this.teacherSubscription=this.teacherSvc.Post(this.teachers).subscribe((res: any) => {
        if (res.StatusCode === 201) {
          this.router.navigateByUrl('list');
          {
            this.toast.success(res.Message, 'Saved.', { timeOut: 3000 });
          }
        } else {
          this.toast.error(res.Message, 'Error.', { timeOut: 3000 });
        }
      });
    }
  }
}
