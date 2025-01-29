import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { DepartmentService } from '../department.service';
import { Department } from '../department.model';

@Component({
    selector: 'app-department-modal',
    imports: [SharedModule],
    providers: [DepartmentService],
    templateUrl: './department-modal.component.html',
    styleUrl: './department-modal.component.scss'
})
export default class DepartmentModalComponent implements OnInit {
  data: any = inject(MAT_DIALOG_DATA);

  modalPopupForm: any = FormGroup;

  departments!: Department;

  constructor(
    private ref: MatDialogRef<DepartmentModalComponent>,
    private fb: FormBuilder,
    private deptSvc: DepartmentService
  ) {}

  inputdata: any;

  editdata: any;

  closemessage: any = 'close message using directive';

  closepopup() {
    this.ref.close('closed using function');
  }
  ngOnInit(): void {
    this.createForm();
    this.inputdata = this.data;
    this.setPopupData(this.inputdata.id);
  }

  createForm() {
    this.modalPopupForm = this.fb.group({
      
      departmentname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]],

      description: ['', [Validators.required, Validators.minLength(15), Validators.maxLength(100)]]
    });
  }

  get departmentName() {
    return this.modalPopupForm.controls['departmentname'];
  }

  get descriptionName() {
    return this.modalPopupForm.controls['description'];
  }

  setPopupData(id: number) {
    this.deptSvc.GetDeptById(id).subscribe((res: any) => {
      this.editdata = res;
      console.log('editdata', this.editdata);
      this.modalPopupForm.setValue({
        departmentname: this.editdata.DepartmentName,
        description: this.editdata.Description
      });
    });
  }

  onSubmit() {
    if (this.modalPopupForm.valid) {
      this.departments = { DepartmentName: this.modalPopupForm.value.departmentname, Description: this.modalPopupForm.value.description };
      this.deptSvc.PUT(this.inputdata.id, this.departments).subscribe((res: any) => {
        this.closepopup();
      });
    }
  }
}
