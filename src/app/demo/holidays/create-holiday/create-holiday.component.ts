import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { provideNativeDateAdapter } from '@angular/material/core';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Holidays } from '../holiday.model';
import { HolidaysService } from '../holidays.service';
@Component({
  selector: 'app-create-holiday',
  standalone: true,
  imports: [SharedModule],
  providers: [provideNativeDateAdapter(), ToastrService],
  templateUrl: './create-holiday.component.html',
  styleUrl: './create-holiday.component.scss'
})
export default class CreateHolidayComponent implements OnInit {
  constructor(
    private toast: ToastrService,
    private router: Router,
    private fb: FormBuilder,
    private svc: HolidaysService
  ) {}

  forms: any = FormGroup;

  holidays!: Holidays;

  ngOnInit(): void {
    this.createForm();
  }
  createForm() {
    this.forms = this.fb.group({

      title: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],

      description: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],

      holidaydate: ['', [Validators.required]],

    });
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

  onSubmit(){
    if (this.forms.valid) {
      this.holidays = {
        Title: this.forms.value.title,
        Description: this.forms.value.description,
        HolidayDate: this.forms.value.holidaydate.toLocaleDateString()
      };
      console.log('holidays', this.holidays);
      this.svc.Post(this.holidays).subscribe((res: any) => {
        if (res.StatusCode === 201) {this.toast.success(res.Message, 'Saved.', {timeOut: 3000});
          this.router.navigateByUrl('holidays/holiday-list');
        } else {
          this.toast.error(res.Message, 'Error.', {timeOut: 3000});
        }
      });
    } else {
      this.toast.warning('Something wrong', 'Wrong.', {
        timeOut: 3000
      });
    }
  }
}
