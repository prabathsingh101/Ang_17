import { Component, OnInit } from '@angular/core';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';

import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserRegistration } from '../models/user.model';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-create-user',
    imports: [SharedModule, MatInputModule, MatSelectModule, MatFormFieldModule, MatIconModule, MatListModule, MatButtonModule],
    providers: [UserService],
    templateUrl: './create-user.component.html',
    styleUrl: './create-user.component.scss'
})
export default class CreateUserComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private userSvc: UserService,
    private router: Router
  ) {}

  usersForms: any = FormGroup;

  titleAlert: string = 'This field is required';

  registrationForm!: any;

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.usersForms = this.fb.group({
      firstname: ['', [Validators.required, Validators.pattern('^[a-zA-Z]+$'), Validators.maxLength(20)]],
      lastname: ['', [Validators.required, Validators.pattern('^[a-zA-Z]+$'), Validators.maxLength(20)]],
      username: ['', []],
      email: ['',
        [
          Validators.required,
          Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'),
          Validators.maxLength(200)
        ]
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.pattern('^(?=.*?[0-9])(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[^0-9A-Za-z]).{8,32}$'),
          Validators.maxLength(15),
          Validators.minLength(8)
        ]
      ],
      roles: ['', [Validators.required]]
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
  getErrorUserName() {
    return this.usersForms.get('username').hasError('required')
      ? 'Field is required (at least eight characters, one uppercase letter and one number)'
      : this.usersForms.get('password').hasError('username')
        ? 'User name needs to be at least eight characters, one uppercase letter and one number'
        : '';
  }
  // checkPassword(control) {
  //   let enteredPassword = control.value;
  //   let passwordCheck = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/;
  //   return !passwordCheck.test(enteredPassword) && enteredPassword ? { requirements: true } : null;
  // }

  getErrorPassword() {
    return this.usersForms.get('password').hasError('required')
      ? 'Field is required (at least eight characters, one uppercase letter and one number and one spacial character)'
      : this.usersForms.get('password').hasError('required')
        ? 'Password needs to be at least eight characters, one uppercase letter and one number and one spacial character'
        : '';
  }
  submit() {
    if (this.usersForms.valid) {
      this.registrationForm = {
        username: this.usersForms.value.email,
        email: this.usersForms.value.email,
        password: this.usersForms.value.password,
        firstName: this.usersForms.value.firstname,
        lastName: this.usersForms.value.lastname,
        roles: this.usersForms.value.roles
      };
      this.userSvc.postUser(this.registrationForm).subscribe((res: any) => {
        if (res.StatusCode == 1) {
          console.log(res);
          this.router.navigateByUrl('users/list');
        } else {
        }
      });
    }
  }
}

//Ratnesh
