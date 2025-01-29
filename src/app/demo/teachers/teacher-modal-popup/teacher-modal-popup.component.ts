import { DatePipe } from '@angular/common';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { Teachers } from '../Model/teacher.model';
import { TeachersService } from '../teachers.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { provideNativeDateAdapter } from '@angular/material/core';

@Component({
    selector: 'app-teacher-modal-popup',
    imports: [SharedModule],
    providers: [provideNativeDateAdapter(), TeachersService, DatePipe, ToastrService],
    templateUrl: './teacher-modal-popup.component.html',
    styleUrl: './teacher-modal-popup.component.scss'
})
export class TeacherModalPopupComponent implements OnInit, OnDestroy {

  data: any = inject(MAT_DIALOG_DATA);

  createdate: any = new Date();
  modifieddate: any = new Date();

  constructor(
    private fb: FormBuilder,
    public teacherSvc: TeachersService,
    private router: Router,
    private datePipe: DatePipe,
    private toast: ToastrService,
    private ref: MatDialogRef<TeacherModalPopupComponent>
  ) {
    this.createdate = this.datePipe.transform(this.createdate, 'yyyy-MM-dd');
    this.modifieddate = this.datePipe.transform(this.modifieddate, 'yyyy-MM-dd');
    console.log('this.createdate', this.createdate);
  }

  teacherForms: any = FormGroup;

  teachers!: Teachers;

  teacherSubscription!: Subscription;

  inputdata: any;

  editdata: any;

  closemessage: any = 'close message using directive';

  ngOnInit(): void {
    this.inputdata = this.data;
    this.setPopupData(this.inputdata.id);
    this.createForm();
  }

  setPopupData(id: number) {
    this.teacherSvc.getTeacherById(id).subscribe((res: any) => {
      this.editdata = res;
      console.log('editdata', this.editdata);
      this.teacherForms.setValue({
        fname: this.editdata.fname,
        mname: this.editdata.mname,
        lname: this.editdata.lname,
        email: this.editdata.email,
        dob: this.editdata.dob,
        phone: this.editdata.phone,
        degree: this.editdata.degree,
        proficiency: this.editdata.proficiency,
        address: this.editdata.address,
        dateofjoining: this.editdata.dateofjoining,
        pincode: this.editdata.pincode
      });
    });
  }

  closepopup() {
    this.ref.close('closed using function');
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

      this.teacherSubscription = this.teacherSvc.PUT(this.inputdata.id, this.teachers).subscribe((res: any) => {
        this.closepopup();
      });
    }
  }

  reset(event: any) {
    event.preventDefault();
    this.teacherForms.reset();
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

  ngOnDestroy(): void {
    this.teacherSubscription.unsubscribe();
  }
}
