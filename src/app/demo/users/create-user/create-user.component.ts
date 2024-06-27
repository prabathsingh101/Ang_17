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

@Component({
  selector: 'app-create-user',
  standalone: true,
  imports: [SharedModule, MatInputModule, MatSelectModule, MatFormFieldModule, MatIconModule, MatListModule, MatButtonModule],
  providers: [UserService],
  templateUrl: './create-user.component.html',
  styleUrl: './create-user.component.scss'
})
export default class CreateUserComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private userSvc: UserService
  ) {}

  usersForms: any = FormGroup;

  titleAlert: string = 'This field is required';

  registrationForm!: any;

  ngOnInit(): void {
    // this.usersForms = this.fb.group({
    //   firstname: ['', Validators.required, Validators.minLength(6), Validators.maxLength(20)],
    //   lastname: ['', Validators.required, Validators.minLength(6), Validators.maxLength(20)],
    //   username: ['', Validators.required, Validators.minLength(6), Validators.maxLength(20), Validators.pattern('^[0-9A-Za-z]{6,16}$')],
    //   email: ['', Validators.required, Validators.email],
    //   password: ['', Validators.required, Validators.pattern('^(?=.*?[0-9])(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[^0-9A-Za-z]).{8,32}$')],
    //   role: ['', Validators.required]
    // });
    this.createForm();
    //this.setChangeValidate();
  }

  createForm() {
    let emailregex: RegExp =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    this.usersForms = this.fb.group({
      firstname: ['', [Validators.required, Validators.pattern('^[a-zA-Z]+$'), Validators.maxLength(10)]],
      lastname: ['', [Validators.required, Validators.pattern('^[a-zA-Z]+$'), Validators.maxLength(10)]],
      username: ['',
        [
        Validators.required,
        Validators.pattern('^[0-9A-Za-z]{6,16}$'),
        Validators.maxLength(15),
        Validators.minLength(8),
      ]],
      //email: ['', [Validators.required, Validators.pattern(emailregex)]],
      email: [
        '',
        [
          Validators.required,
          Validators.pattern(
            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          ),
          Validators.minLength(10),
          Validators.maxLength(50)
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
  getErrorEmail() {
    return this.usersForms.get('email').hasError('required')
      ? 'Field is required'
      : this.usersForms.get('email').hasError('pattern')
        ? 'Not a valid emailaddress'
        : this.usersForms.get('email').hasError('alreadyInUse')
          ? 'This emailaddress is already in use'
          : '';
  }

  getErrorPassword() {
    return this.usersForms.get('password').hasError('required')
      ? 'Field is required (at least eight characters, one uppercase letter and one number and one spacial character)'
      : this.usersForms.get('password').hasError('requirements')
        ? 'Password needs to be at least eight characters, one uppercase letter and one number and one spacial character'
        : '';
  }
  submit() {
    if (this.usersForms.valid) {
      debugger;
      this.registrationForm = {
        username: this.usersForms.value.username,
        email: this.usersForms.value.email,
        password: this.usersForms.value.password,
        firstName: this.usersForms.value.firstname,
        lastName: this.usersForms.value.lastname,
        roles: this.usersForms.value.roles
      };
      this.userSvc.postUser(this.registrationForm).subscribe({
        next: (res) => {
          console.log(res);
        }
      });
    }
  }
}

//Ratnesh
