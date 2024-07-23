import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { EmployeesService } from '../services/employees.service';
import { Employee } from '../models/employee';

@Component({
  selector: 'app-create-employee',
  standalone: true,
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
  progress!: number;
  message!: string;
  @Output() public onUploadFinished = new EventEmitter();

  employeForms: any = FormGroup;

  employees!: Employee;

  public file: any;

  url: any = '';

  uploadFile(event: any) {
    if (event.target.files && event.target.files[0]) {

      this.file = event.target.files[0];

      console.log(this.file);

      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]);

      reader.onload = (event: any) => {
        this.url = event.target.result;
      };
    }
  }
  onSubmit() {}
  createForm() {
    this.employeForms = this.fb.group({
      fname: [''],
      lname: ['']
    });
  }
  ngOnInit(): void {
    this.createForm();
  }
}
