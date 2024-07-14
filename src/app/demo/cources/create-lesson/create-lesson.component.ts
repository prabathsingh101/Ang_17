import { Component, OnInit, ViewChild } from '@angular/core';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { Lesson } from '../../course-details/models/lesson';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-create-lesson',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './create-lesson.component.html',
  styleUrl: './create-lesson.component.scss'
})
export default class CreateLessonComponent implements OnInit {

  displayedColumns: string[] = ['id', 'title','course', 'description','duration', 'action'];

  deptList: Lesson[] = [];

  dataSource: any;

  loading = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  filterchange(data: Event) {
    const value = (data.target as HTMLInputElement).value;
    this.dataSource.filter = value;
  }

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

  deletePromptPopup(id:number){}

  editCourse(id:number){}

}
