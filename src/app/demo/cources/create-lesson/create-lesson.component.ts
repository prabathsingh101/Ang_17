import { Component, OnInit, ViewChild } from '@angular/core';
import { SharedModule } from 'src/app/theme/shared/shared.module';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-create-lesson',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './create-lesson.component.html',
  styleUrl: './create-lesson.component.scss'
})
export default class CreateLessonComponent implements OnInit {

  constructor(private fb: FormBuilder) {}

  forms: any = FormGroup;

  get getdescription() {
    return this.forms.controls['description'];
  }

  get gettitle() {
    return this.forms.controls['title'];
  }

  ngOnInit(): void {
    this.createForm();
  }
  createForm() {
    this.forms = this.fb.group({

      title: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]],

      description: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]]
    });
  }

  onSubmit(){}
}
