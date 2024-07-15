// angular import
import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  FormGroupDirective,
  NgForm,
  PatternValidator,
  Validators
} from '@angular/forms';
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
  providers: [LoginService, UserStoreService, ToastrService, SharedModule],
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

  loading = false;

  islogin = false;

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
      Username: ['', [Validators.required, Validators.email]],
      Password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(15),
          Validators.pattern('^(?=.*?[0-9])(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[^0-9A-Za-z]).{8,32}$')
        ]
      ]
    });
  }
  get f() {
    return this.loginForm.controls;
  }

  submit() {
    this.loading = true;
    if (this.loginForm.valid) {
      this.user = {
        Username: this.loginForm.value.Username,
        Password: this.loginForm.value.Password
      };
      this.loginSvc.login(this.user).subscribe(
        (res: any) => {
          let data = JSON.stringify(res);
          let loggeduser = JSON.parse(data);

          if (loggeduser.StatusCode === 0) {
            this.toast.error('Invalid userid/password', 'Login failed.', {
              timeOut: 3000
            });
          } else {
            this.loginSvc.storeToken(loggeduser.Token);
            this.loginSvc.storeRefreshToken(loggeduser.RefreshToken);
            const tokenPayload = this.loginSvc.decodedToken();
            this.userStore.setFullNameForStore(tokenPayload.name);
            this.userStore.setRoleForStore(tokenPayload.role);
            this.toast.success('Logged in successfully.', 'Success', {timeOut: 3000});
            this.loading = false;
            this.router.navigateByUrl('analytics');
          }
        },
        (error) => {
          this.toast.warning('Internal server error.', 'Error', {timeOut: 3000});
          this.loading = false;
        }
      );
    }
  }
}
