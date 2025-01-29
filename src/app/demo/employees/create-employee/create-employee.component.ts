import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { EmployeesService } from '../services/employees.service';
import { Employee } from '../models/employee';
import { Status } from '../models/status';

@Component({
    selector: 'app-create-employee',
    imports: [SharedModule],
    templateUrl: './create-employee.component.html',
    styleUrl: './create-employee.component.scss'
})
export default class CreateEmployeeComponent implements OnInit {
  @ViewChild('form', { static: false }) imageUploadForm?: NgForm;

  constructor(
    public fb: FormBuilder,
    public employeeSvc: EmployeesService
  ) {}

  imagefile?: File;

  progress!: number;
  message!: string;
  @Output() public onUploadFinished = new EventEmitter();

  employeForms: any = FormGroup;

  employees!: Employee;

  status!: Status;

  public file: any;

  url: any = '';

  uploadFile(event: any) {
    if (event.target.files && event.target.files[0]) {
      this.imagefile = event.target.files[0];

      console.log('imagefile', this.imagefile);

      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]);

      reader.onload = (event: any) => {
        this.url = event.target.result;
      };
    }
  }
  onSubmit() {
    if (this.employeForms.valid) {
      this.employees = { fname: this.employeForms.value.fname, lname: this.employeForms.value.lname };

      const employeedata = this.employees;

      employeedata.imagefile = this.imagefile;

      this.employeeSvc.add(employeedata).subscribe({
        next: (res) => {
          this.status = res;
        },
        error: (err) => {
          this.status = { statusCode: 0, message: 'Error on server side' };
          console.log(err);
        }
      });
    }
  }
  createForm() {
    this.employeForms = this.fb.group({
      fname: ['', [Validators.required]],
      lname: ['', [Validators.required]],
      imagefile: []
    });
  }
  ngOnInit(): void {
    this.createForm();
  }
}
