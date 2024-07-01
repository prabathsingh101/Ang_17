import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { Department } from '../department.model';
import { DepartmentService } from '../department.service';

import { Router } from '@angular/router';
import { ToastrModule, provideToastr } from 'ngx-toastr';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-create-department',
  standalone: true,
  imports: [SharedModule,],
  providers: [DepartmentService,ToastrService],
  templateUrl: './create-department.component.html',
  styleUrl: './create-department.component.scss'
})
export default class CreateDepartmentComponent implements OnInit {
  departmentForm: any = FormGroup;

  departments!: Department;

  constructor(
    private fb: FormBuilder,
    private deptSvc: DepartmentService,
    private toast: ToastrService,
    private router: Router
  ) {}

  createForm() {
    this.departmentForm = this.fb.group({
      departmentname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]],

      description: ['', [Validators.required, Validators.minLength(15), Validators.maxLength(100)]]
    });
  }

  onSubmit() {
    if (this.departmentForm.valid) {
      this.departments = { DepartmentName: this.departmentForm.value.departmentname, Description: this.departmentForm.value.description };
      console.log('departments', this.departments);
      this.deptSvc.Post(this.departments).subscribe((res: any) => {
        //console.log(res.StatusCode);
        //console.log(res.Message);
        if (res.StatusCode === 201) {this.toast.success(res.Message, 'Saved.', {timeOut: 3000});
          this.router.navigateByUrl('departments/list');
        } else if(res.StatusCode === 204) {
          this.toast.error(res.Message, 'Error.', {timeOut: 3000});
        }
      });
    } else {
      this.toast.warning('Something wrong', 'Wrong.', {
        timeOut: 3000
      });
    }
  }

  get description() {
    return this.departmentForm.controls['description'];
  }

  get departmentName() {
    return this.departmentForm.controls['departmentname'];
  }

  get descriptionName() {
    return this.departmentForm.controls['description'];
  }

  ngOnInit(): void {
    this.createForm();
  }
}
