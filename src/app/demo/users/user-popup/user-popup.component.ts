import { Component, OnInit, inject } from '@angular/core';
import { SharedModule } from 'src/app/theme/shared/shared.module';

import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogTitle,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogModule,
  MatDialogRef
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Roles } from '../models/user.model';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-popup',
  standalone: true,
  imports: [
    SharedModule,
    MatDialogModule,
    MatFormFieldModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatSelectModule,
    MatDialogActions,
    MatDialogClose,
    MatDialogTitle,
    MatDialogContent
  ],
  templateUrl: './user-popup.component.html',
  styleUrl: './user-popup.component.scss'
})
export class UserPopupComponent implements OnInit {
  data: any = inject(MAT_DIALOG_DATA);

  constructor(
    private ref: MatDialogRef<UserPopupComponent>,
    private fb: FormBuilder,
    private svc: UserService
  ) {}

  usersForms: any = FormGroup;

  roles: Roles[] = [];

  inputdata: any;

  closemessage: any = 'close message using directive';

  closepopup() {
    this.ref.close('closed using function');
  }

  ngOnInit(): void {
    this.createForm();
    this.getRoles();
    this.inputdata = this.data;
    this.setPopupData(this.inputdata.id);
  }

  createForm() {
    this.usersForms = this.fb.group({
      firstname: ['', [Validators.required, Validators.pattern('^[a-zA-Z]+$'), Validators.maxLength(20)]],
      lastname: ['', [Validators.required, Validators.pattern('^[a-zA-Z]+$'), Validators.maxLength(20)]],
      email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$'), Validators.maxLength(200)]],
      address: [''],
      mobileno: ['', [Validators.minLength(10), Validators.maxLength(10)]],
      role: ['', [Validators.required]]
    });
  }

  get getemail() {
    return this.usersForms.controls['email'];
  }
  get fname() {
    return this.usersForms.controls['firstname'];
  }
  get lname() {
    return this.usersForms.controls['lastname'];
  }
  get getpassword() {
    return this.usersForms.controls['password'];
  }

  get getmobileno() {
    return this.usersForms.controls['mobileno'];
  }
  get getrole() {
    return this.usersForms.controls['role'];
  }
  onSubmit() {}

  setPopupData(id: string) {}

  getRoles() {
    this.svc.GetAllRoles().subscribe((res: any) => {
      if(res.length>0){
        this.roles= res;
        console.log(this.roles);
      }else{

      }
    });
  }
}
