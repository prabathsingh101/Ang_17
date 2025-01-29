import { Component, inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CourseService } from '../services/course.service';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CourseModel } from '../model/course.model';
import { ToastrService } from 'ngx-toastr';
import { DatePipe } from '@angular/common';

@Component({
    selector: 'app-course-modal-popup',
    imports: [SharedModule, NgxMaterialTimepickerModule],
    providers: [ToastrService, DatePipe],
    templateUrl: './course-modal-popup.component.html',
    styleUrl: './course-modal-popup.component.scss'
})
export class CourseModalPopupComponent implements OnInit {
  constructor(
    private ref: MatDialogRef<CourseModalPopupComponent>,
    public courseSvc: CourseService,
    public fb: FormBuilder,
    public toast: ToastrService,
    public datepipe: DatePipe
  ) {}

  putCourse!: CourseModel;
  loading = false;
  data: any = inject(MAT_DIALOG_DATA);

  inputdata: any;

  editdata: any;
  forms: any = FormGroup;

  closemessage: any = 'close message using directive';



  ngOnInit(): void {
    this.createForm();
    this.inputdata = this.data;
    this.setPopupData(this.inputdata.id);
  }

  get getdescription() {
    return this.forms.controls['longdescription'];
  }

  get gettitle() {
    return this.forms.controls['title'];
  }
  createForm() {

    this.forms = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]],

      longdescription: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],

      duration: ['', [Validators.pattern('^([01][0-9]|2[0-3]):([0-5][0-9])$')]]

    });
  }
  setPopupData(id: number) {
    this.courseSvc.getCourseById(id).subscribe((res: any) => {
      this.editdata = res;
      console.log('editdata', this.editdata);
      this.forms.setValue({
        title: this.editdata.title,
        longdescription: this.editdata.longdescription,
        duration: this.datepipe.transform(this.editdata.duration,"h:mm a"),
      });
    });
  }

  closepopup() {
    this.ref.close('closed using function');
  }

  onSubmit() {
    this.loading = true;
    if (this.forms.valid) {
      this.putCourse = {
        title: this.forms.value.title,
        longdescription: this.forms.value.longdescription,
        duration: this.forms.value.duration
      };
      this.courseSvc.PUT(this.inputdata.id, this.putCourse).subscribe(
        (res: any) => {
          this.closepopup();
        },
        (error) => {
          this.loading = false;
          this.toast.success('Eternal server error', 'Error.', { timeOut: 3000 });
        }
      );
    }
  }
}
