import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { provideNativeDateAdapter } from '@angular/material/core';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { ClassService } from '../services/class.service';

@Component({
  selector: 'app-attendance-type',
  standalone: true,
  imports: [SharedModule],
  providers: [provideNativeDateAdapter()],
  templateUrl: './attendance-type.component.html',
  styleUrl: './attendance-type.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class AttendanceTypeComponent implements OnInit {
  constructor(private fb: FormBuilder, public classSvc: ClassService) {}

  AttendanceForms: any = FormGroup;

  className:any=[];

  myFilter = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();
    // Prevent Saturday and Sunday from being selected.
    return day !== 0 && day !== 6;
  };

  ngOnInit(): void {
    this.createForms();
    this.getClassName();
  }

  getClassName() {
    this.classSvc.getclassName().subscribe((res: any) => {
      this.className = res;
    });
  }

  createForms() {
    this.AttendanceForms = this.fb.group({
      classid: ['', [Validators.required]],
      attendancetype: ['', [Validators.required]],
      attendancedate: ['', [Validators.required]]
    });
  }
  get getclass() {
    return this.AttendanceForms.controls['classid'];
  }
  get getattendancetype() {
    return this.AttendanceForms.controls['attendancetype'];
  }
  get getattendancedate() {
    return this.AttendanceForms.controls['attendancedate'];
  }
  onSubmit() {}
}
