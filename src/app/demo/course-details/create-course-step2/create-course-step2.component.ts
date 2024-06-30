import { TextFieldModule } from '@angular/cdk/text-field';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { SharedModule } from 'src/app/theme/shared/shared.module';

@Component({
  selector: 'app-create-course-step2',
  standalone: true,
  imports: [
    SharedModule,
    MatInputModule,
    MatFormFieldModule,
    TextFieldModule,
    MatRadioModule,
    MatSelectModule,
  ],
  templateUrl: './create-course-step2.component.html',
  styleUrl: './create-course-step2.component.scss'
})
export default class CreateCourseStep2Component {
  form: any = FormGroup;
  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      courseid: ['', [Validators.required]],
      description: ['', [Validators.required, Validators.maxLength(200)]],
      duration: ['', [Validators.required, Validators.minLength(4)]]
    });
  }

  get courseDescription() {
    return this.form.controls['description'];
  }

}
