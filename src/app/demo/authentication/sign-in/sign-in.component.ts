// angular import
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
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

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [SharedModule, RouterModule, MatFormFieldModule, MatInputModule, HttpClientModule],
  providers: [LoginService, UserStoreService, ToastrService],
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export default class SignInComponent implements OnInit {
  form: FormGroup = new FormGroup({
    Username: new FormControl(''),
    Password: new FormControl('')
  });
  submitted = false;

  loginForm!: FormGroup;

  user: any;

  constructor(
    private fb: FormBuilder,
    private loginSvc: LoginService,
    private userStore: UserStoreService,
    private toast: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      Username: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(20),
          Validators.pattern('^[0-9A-Za-z]{6,16}$')]],
      Password: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(20),
          Validators.pattern('^(?=.*?[0-9])(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[^0-9A-Za-z]).{8,32}$')
        ]
      ]
    });
  }
  get f() {
    return this.loginForm.controls;
  }

  submit() {
    if (this.loginForm.valid) {
      this.user = {
        Username: this.loginForm.value.Username,
        Password: this.loginForm.value.Password
      };
      this.loginSvc.login(this.user).subscribe({
        next: (res) => {
          let data = JSON.stringify(res);
          let loggeduser = JSON.parse(data);
          if (loggeduser.statusCode === 0) {
            this.toast.error(loggeduser.message, 'Login failed.', {
              timeOut: 3000
            });
          } else {
            this.loginSvc.storeToken(loggeduser.token);
            this.loginSvc.storeRefreshToken(loggeduser.refreshToken);
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
