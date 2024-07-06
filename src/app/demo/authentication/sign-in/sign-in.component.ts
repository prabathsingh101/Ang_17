// angular import
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, PatternValidator, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

// project import
import { SharedModule } from 'src/app/theme/shared/shared.module';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ErrorStateMatcher } from '@angular/material/core';
import ChangePasswordComponent from '../../users/change-password/change-password.component';
import { LoginService } from '../services/login.service';
import { HttpClientModule } from '@angular/common/http';
import { UserStoreService } from '../services/user-store.service';
import { ToastrService } from 'ngx-toastr';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [
    SharedModule,
    RouterModule,
    MatFormFieldModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatDividerModule,
    MatInputModule,
    HttpClientModule
  ],
  providers: [LoginService, UserStoreService, ToastrService],
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export default class SignInComponent implements OnInit {
  form: FormGroup = new FormGroup({
    Username: new FormControl(''),
    Password: new FormControl('')
  });

   StrongPasswordRegx: RegExp = /^(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=\D*\d).{8,}$/;
  submitted = false;

  loginForm: any = FormGroup;

  user: any;

  constructor(
    private fb: FormBuilder,
    private loginSvc: LoginService,
    private userStore: UserStoreService,
    private toast: ToastrService,
    private router: Router
  ) {}

  get username() {
    return this.loginForm.controls['Username'];
  }
  get password() {
    return this.loginForm.controls['Password'];
  }



  ngOnInit(): void {
    this.loginForm = this.fb.group({
      Username: ['',
        [Validators.required, Validators.email]
        ],
      Password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(15),
          Validators.pattern(this.StrongPasswordRegx)

        ]
      ]
    });
  }
  get f() {
    return this.loginForm.controls;
  }
  getErrorUserName() {
    return this.loginForm.get('Username').hasError('required')
      ? 'User name is required (at least eight characters, one uppercase letter and one number)'
      : this.loginForm.get('Username').hasError('Username')
        ? 'User name needs to be at least eight characters, one uppercase letter and one number'
        : '';
  }
  getErrorPassword() {
    return this.loginForm.get('Password').hasError('required')
      ? 'Password is required (at least eight characters, one uppercase letter and one number and one spacial character)'
      : this.loginForm.get('Password').hasError('Password')
        ? 'Password needs to be at least eight characters, one uppercase letter and one number and one spacial character'
        : '';
  }

  submit() {
    if (this.loginForm.valid) {
      this.user = {
        Username: this.loginForm.value.Username,
        Password: this.loginForm.value.Password
      };
      console.log(this.user);
      this.loginSvc.login(this.user).subscribe({
        next: (res) => {
          let data = JSON.stringify(res);
          let loggeduser = JSON.parse(data);
          console.log('loggeduser', loggeduser);
          if (loggeduser.StatusCode === 0) {
            this.toast.error(loggeduser.message, 'Login failed.', {
              timeOut: 3000
            });
          } else {
            console.log('token', loggeduser.Token);
            this.loginSvc.storeToken(loggeduser.Token);
            this.loginSvc.storeRefreshToken(loggeduser.RefreshToken);
            const tokenPayload = this.loginSvc.decodedToken();
            this.userStore.setFullNameForStore(tokenPayload.name);
            this.userStore.setRoleForStore(tokenPayload.role);
            this.toast.success('Logged in successfully.', 'Success', {
              timeOut: 3000
            });
            this.router.navigateByUrl('analytics');
          }
        }
      });
    }
  }
}
