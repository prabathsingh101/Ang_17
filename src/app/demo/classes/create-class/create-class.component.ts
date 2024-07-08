import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { TeachersService } from '../../teachers/teachers.service';
import { Classes, TeacherName } from '../model/classes';
import { ClassService } from '../services/class.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-class',
  standalone: true,
  imports: [SharedModule],
  providers: [TeachersService, ToastrService],
  templateUrl: './create-class.component.html',
  styleUrl: './create-class.component.scss'
})
export default class CreateClassComponent implements OnInit {
  classes!: Classes;

  constructor(
    private fb: FormBuilder,
    public teacherSvc: TeachersService,
    public classSvc: ClassService,
    public toast: ToastrService
  ) {}

  ngOnInit(): void {
    this.createform();
    this.getTeacherName();
  }

  forms: any = FormGroup;

  teacherName: TeacherName[] = [];

  createform() {
    this.forms = this.fb.group({
      classname: ['', [Validators.required, Validators.maxLength(20)]],
      teacherid: ['', [Validators.required]],
      studentlimit: ['', [Validators.required, Validators.pattern(/^[0-9]*$/), Validators.maxLength(2)]]
    });
  }

  get getclassname() {
    return this.forms.controls['classname'];
  }
  get getteacher() {
    return this.forms.controls['teacherid'];
  }
  get getlimit() {
    return this.forms.controls['studentlimit'];
  }

  getTeacherName() {
    this.teacherSvc.GetTeacherName().subscribe((res: any) => {
      this.teacherName = res;
    });
  }

  onSubmit() {
    if (this.forms.valid) {
      this.classes = {
        classname: this.forms.value.classname,
        teacherid: this.forms.value.teacherid,
        studentlimit: this.forms.value.studentlimit
      };
      this.classSvc.Post(this.classes).subscribe((res: any) => {
        if (res.StatusCode === 201) {
          {
            this.toast.success(res.Message, 'Saved.', { timeOut: 3000 });
          }
        } else {
          this.toast.error(res.Message, 'Error.', { timeOut: 3000 });
        }
      });
    }
  }
}
