import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { HolidaysService } from '../holidays.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import DepartmentModalComponent from '../../departments/department-modal/department-modal.component';
import { Holidays } from '../holiday.model';
import { provideNativeDateAdapter } from '@angular/material/core';

@Component({
  selector: 'app-holiday-modal-popup',
  standalone: true,
  imports: [SharedModule],
  providers: [HolidaysService, ToastrService, provideNativeDateAdapter()],
  templateUrl: './holiday-modal-popup.component.html',
  styleUrl: './holiday-modal-popup.component.scss'
})
export default class HolidayModalPopupComponent implements OnInit {
  constructor(
    private toast: ToastrService,
    private router: Router,
    private fb: FormBuilder,
    private svc: HolidaysService,
    private ref: MatDialogRef<DepartmentModalComponent>,
  ) {}

  forms: any = FormGroup;

  inputdata: any;

  editdata: any;

  holidays!: Holidays;

  data: any = inject(MAT_DIALOG_DATA);

  closemessage: any = 'close message using directive';

  closepopup() {
    this.ref.close('closed using function');
  }

  createForm() {
    this.forms = this.fb.group({

      title: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],

      description: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],

      holidaydate: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.createForm();
    this.inputdata = this.data;
    this.setPopupData(this.inputdata.id);
  }

  get description() {
    return this.forms.controls['description'];
  }

  get title() {
    return this.forms.controls['title'];
  }

  get date() {
    return this.forms.controls['holidaydate'];
  }

  setPopupData(id: number) {
    this.svc.GetHolidayById(id).subscribe((res: any) => {
      this.editdata = res;
      console.log('editdata', this.editdata);
      this.forms.setValue({
        title: this.editdata.Title,
        description: this.editdata.Description,
        holidaydate: this.editdata.HolidayDate,
      });
    });
  }

  onSubmit() {
    if (this.forms.valid) {
      this.holidays = { Title: this.forms.value.title, Description: this.forms.value.description, HolidayDate: this.forms.value.holidaydate };
      this.svc.PUT(this.inputdata.id, this.holidays).subscribe((res: any) => {
        this.closepopup();
      });
    }
  }
}
